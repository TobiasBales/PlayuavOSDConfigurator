const code = {
  NOP: 0x00,
  OK: 0x10,
  FAILED: 0x11,
  INSYNC: 0x12,
  INVALID: 0x13,
  EOC: 0x20,
  GET_SYNC: 0x21,
  GET_DEVICE: 0x22,
  CHIP_ERASE: 0x23,
  START_TRANSFER: 0x24,
  SET_PARAMS: 0x25,
  GET_PARAMS: 0x26,
  INFO_OSD_REV: 0x27,
  END_TRANSFER: 0x28,
  PROG_MULTI: 0x27,
  READ_MULTI: 0x28,
  GET_CRC: 0x29,
  SAVE_TO_EEPROM: 0x29,
  REBOOT: 0x30,
  BL_UPLOAD: 0x55,
  PROG_MULTI_MAX: 60,
  READ_MULTI_MAX: 60,
  BL_REV_MAX: 4, // maximum supported bootloader protocol
  BL_REV_MIN: 2, // minimum supported bootloader protocol
  INFO_BL_REV: 1, // bootloader protocol revision
  INFO_BOARD_ID: 2, // board type
  INFO_BOARD_REV: 3, // board revision
  INFO_FLASH_SIZE: 4, // max firmware size in bytes
};

const VERSION = 1;
// const FIRMWARE_VERSION = 10;

class OSDInterface {
  constructor() {
    this.buffer = [];
    chrome.serial.onReceive.addListener(this._onData);
    chrome.serial.onReceiveError.addListener(this._onError);
  }

  readParameters(serialPort, progressCallback) {
    return this._connect(serialPort)
      .then(this._reportProgress.bind(this, progressCallback, 1))
      .then(this._write.bind(this, code.GET_PARAMS, code.EOC))
      .then(this._reportProgress.bind(this, progressCallback, 10))
      .then(this._readWithSyncOk.bind(this, 1024))
      .then(this._reportProgress.bind(this, progressCallback, 80))
      .then(this._toUInt16.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 100))
      .then(this._disconnect.bind(this));
  }

  writeParameters(serialPort, data, progressCallback) {
    return this._connect(serialPort)
      .then(this._reportProgress.bind(this, progressCallback, 1))
      .then(this._sync.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 2))
      .then(this._getVersion.bind(this))
      .then(this._checkVersion.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 3))
      .then(this._startTransfer.bind(this))
      .then(this._writeParameterData.bind(this, data, progressCallback, 4, 95))
      .then(this._reportProgress.bind(this, progressCallback, 96))
      .then(this._wait.bind(this, 250))
      .then(this._endTransfer.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 98))
      .then(this._saveToEeprom.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 100))
      .then(this._disconnect.bind(this));
  }

  uploadFirmware(serialPort, firmware, progressCallback) {
    return this._connect(serialPort)
      .then(this._reportProgress.bind(this, progressCallback, 1))
      .then(this._sync.bind(this))
      .then(this._blUpload.bind(this))
      .then(this._disconnect.bind(this))
      .then(this._wait.bind(this, 5000))
      .then(this._connect.bind(this, serialPort))
      .then(this._sync.bind(this))
      .then(this._getInfo.bind(this, code.INFO_BL_REV))
      .then(this._getInfo.bind(this, code.INFO_BOARD_ID))
      .then(this._getInfo.bind(this, code.INFO_BOARD_REV))
      .then(this._getInfo.bind(this, code.INFO_FLASH_SIZE))
      .then(this._reportProgress.bind(this, progressCallback, 3))
      .then(this._sync.bind(this))
      .then(this._chipErase.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 5))
      .then(this._writeFirmware.bind(this, firmware.imagebytes, progressCallback, 6, 96))
      .then(this._wait.bind(this, 500))
      .then(this._reportProgress.bind(this, progressCallback, 95))
      .then(this._reboot.bind(this))
      .then(this._reportProgress.bind(this, progressCallback, 100))
      .then(this._disconnect.bind(this));
  }

  _wait(time) {
    return this._promise((resolve) => {
      setTimeout(() => resolve(), time);
    });
  }

  _reportProgress(callback, progress, ...params) {
    return this._promise((resolve) => {
      callback(progress);
      resolve(...params);
    });
  }

  _connect(serialPort) {
    this._serialPort = serialPort;
    this._info = {};
    return this._promise((resolve) => {
      chrome.serial.connect(this._serialPort, { bitrate: 115200 }, (connectionInfo) => {
        this._connectionId = connectionInfo.connectionId;
        resolve();
      });
    });
  }

  _disconnect(...parameters) {
    return this._promise((resolve) => {
      chrome.serial.disconnect(this._connectionId, () => {
        return resolve(...parameters);
      });
    });
  }

  _blUpload() {
    return this._write(code.BL_UPLOAD, code.EOC)
      .then(this._readWithSyncOk.bind(this, 0));
  }

  _chipErase() {
    return this._write(code.CHIP_ERASE, code.EOC)
      .then(this._readWithSyncOk.bind(this, 0));
  }

  _writeFirmware(firmware, progressCallback, min, max) {
    return this._promise((resolve) => {
      const writeChunk = (offset) => {
        if (offset > firmware.length) {
          return resolve();
        }

        const firmwareChunk = firmware.slice(offset, offset + code.PROG_MULTI_MAX);
        const buffer = this._firmwareChunkToBuffer(firmwareChunk);
        const progress = (offset / firmware.length * (max - min) + min);
        this._write(...buffer)
          .then(this._readWithSyncOk.bind(this, 0))
          .then(this._reportProgress.bind(this, progressCallback, progress))
          .then(writeChunk.bind(this, offset + code.PROG_MULTI_MAX));
      };

      writeChunk(0);
    });
  }

  _firmwareChunkToBuffer(data) {
    const buffer = new Buffer(data.length + 3);
    buffer.writeUInt8(code.PROG_MULTI, 0);
    buffer.writeUInt8(data.length, 1);
    data.forEach((byte, index) => {
      buffer[index + 2] = byte;
    });
    buffer.writeUInt8(code.EOC, buffer.length - 1);

    return buffer;
  }

  _checkVersion(version) {
    return this._promise((resolve, reject) => {
      if (version !== VERSION) {
        return reject(`Unsupported version board - board: ${version} supported: ${VERSION}`);
      }
      resolve();
    });
  }

  _reboot() {
    return this._write(code.REBOOT, code.EOC);
  }

  _startTransfer() {
    return this._write(code.START_TRANSFER, code.EOC)
      .then(this._readWithSyncOk.bind(this, 0));
  }

  _parameterChunkToBuffer(data) {
    const buffer = new Buffer((data.length * 2) + 3);
    buffer.writeUInt8(code.SET_PARAMS, 0);
    buffer.writeUInt8(data.length * 2, 1);
    data.forEach((byte, index) => {
      buffer.writeUInt16LE(byte, (index * 2) + 2);
    });
    buffer.writeUInt8(code.EOC, buffer.length - 1);

    return buffer;
  }

  _writeParameterData(data, progressCallback, min, max) {
    return this._promise((resolve) => {
      const writeChunk = (offset) => {
        if (offset > data.length) {
          return resolve();
        }

        const parameterChunk = data.slice(offset, offset + code.PROG_MULTI_MAX / 2);
        const buffer = this._parameterChunkToBuffer(parameterChunk);
        const progress = (offset / data.length * (max - min) + min);
        this._write(...buffer)
          .then(this._readWithSyncOk.bind(this, 0))
          .then(this._reportProgress.bind(this, progressCallback, progress))
          .then(writeChunk.bind(this, offset + code.PROG_MULTI_MAX / 2));
      };

      writeChunk(0);
    });
  }

  _endTransfer() {
    return this._write(code.END_TRANSFER, code.EOC)
      .then(this._readWithSyncOk.bind(this, 0));
  }

  _saveToEeprom() {
    return this._write(code.SAVE_TO_EEPROM, code.EOC)
      .then(this._readWithSyncOk.bind(this, 0));
  }

  _first(data) {
    return this._promise((resolve, reject) => {
      if (!data) {
        return reject('Trying to get first element of null');
      }
      if (data.length < 1) {
        return reject('Trying to get first element of empty array');
      }
      resolve(data[0]);
    });
  }

  _toUInt16(data) {
    return this._promise((resolve) => {
      const uint8 = Uint8Array.from(data);
      const uint16 = new Uint16Array(uint8.buffer);
      const result = Array.from(uint16);

      resolve(result);
    });
  }

  _flush() {
    this.buffer = [];
    return this._promise((resolve) => {
      chrome.serial.flush(this._connectionId, () => {
        resolve();
      });
    });
  }

  _read(bytes) {
    return this._promise((resolve, reject) => {
      let count = 0;

      const retry = () => {
        if (this.buffer.length >= bytes) {
          const result = this.buffer.slice(0, bytes);
          this.buffer = this.buffer.slice(bytes, this.buffer.length);
          return resolve(result);
        }

        // if (!this.serialPort.isOpen()) {
        //   return reject('serial port was closed while waiting to read data', null);
        // }

        if (count >= 100) {
          return reject(`waited to long (1s) to read ${bytes} bytes`, null);
        }

        count += 1;
        setTimeout(retry, 100);
      };

      retry();
    });
  }

  _write(...data) {
    return this._promise((resolve) => {
      this._flush().then(() => {
        const arrayBuffer = new ArrayBuffer((data.length));
        const bytes = new Uint8Array(arrayBuffer);
        for (let i = 0; i < data.length; i++) {
          bytes[i] = data[i];
        }
        chrome.serial.send(this._connectionId, arrayBuffer, () => {
          resolve();
        });
      });
    });
  }

  _promise(resolver) {
    return new Promise(resolver);
  }

  _readWithSyncOk(bytes) {
    return this._promise((resolve, reject) => (
      this._read(bytes + 2).then((data) => {
        if (data[bytes] !== code.INSYNC || data[bytes + 1] !== code.OK) {
          return reject('Sync lost while reading parameters, please try again');
        }

        resolve(data.slice(0, data.length - 2));
      }).then(resolve, reject)
    ));
  }

  _sync() {
    return this._write(code.GET_SYNC, code.EOC)
      .then(this._readWithSyncOk.bind(this, 0));
  }

  _storeInfo(info, bytes) {
    return this._promise((resolve) => {
      this._info[info] = bytes;
      resolve();
    });
  }

  _getInfo(info) {
    return this._write(code.GET_DEVICE, info, code.EOC)
      .then(this._readWithSyncOk.bind(this, 4))
      .then(this._storeInfo.bind(this, info));
  }

  _getVersion() {
    return this._write(code.GET_DEVICE, code.INFO_OSD_REV, code.EOC)
      .then(this._readWithSyncOk.bind(this, 1))
      .then(this._first.bind(this));
  }

  _onData = (info) => {
    const data = new Uint8Array(info.data);
    this.buffer = this.buffer.concat(Array.from(data));
  }

  _onError = (err) => {
    if (err) {
      throw new Error(err);
    }
  }
}

module.exports = OSDInterface;
