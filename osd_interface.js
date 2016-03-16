/* eslint strict: 0 */
'use strict';

const SerialPort = require('serialport');

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
  SAVE_TO_EEPROM: 0x29,
  PROG_MULTI_MAX: 60,
  READ_MULTI_MAX: 60,
};

const VERSION = 1;
const FIRMWARE_VERSION = 10;

class OSDInterface {
  constructor(serialPort, onOpen, onClose) {
    this.serialPort = new SerialPort.SerialPort(serialPort, { baudrate: 115200 });
    this.buffer = new Buffer(0);
    this._open = false;
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.serialPort.on('open', this._onOpen.bind(this));
    this.serialPort.on('data', this._onData.bind(this));
    this.serialPort.on('error', this._onError.bind(this));
    this.serialPort.on('close', this._onClose.bind(this));
  }

  sync(callback) {
    this._flush();
    this._write([code.GET_SYNC, code.EOC], (writeErr) => {
      if (callback && writeErr) {
        callback(writeErr);
      }
      this._readSyncOk(0, (err) => {
        if (callback) {
          if (err) {
            callback(err);
            return;
          }

          callback(null);
        }
      });
    });
  }

  close() {
    if (this._open) {
      this.serialPort.close();
    }
  }

  getVersion(callback) {
    this._flush();
    this._write([code.GET_DEVICE, code.INFO_OSD_REV, code.EOC], (writeErr) => {
      if (writeErr) {
        callback(writeErr);
        return;
      }

      this._readSyncOk(1, (err, data) => {
        let version = null;
        if (data) {
          version = data.readUInt8(0);
        }
        callback(err, version);
      });
    });
  }

  getParams(callback) {
    this._flush();
    this._write([code.GET_PARAMS, code.EOC]);
    this._read(1026, (err, buffer) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (!this._syncOk(buffer, 1024)) {
        callback('Sync lost while reading parameters, please try again', null);
      }
      const result = [];
      for (let offset = 0; offset < buffer.length - 2; offset += 2) {
        result.push(buffer.readUInt16LE(offset, false));
      }

      callback(null, result);
    });
  }

  setParams(data, callback) {
    this.sync((err) => {
      if (err) {
        callback(err);
        return;
      }
      this._flush();

      this.getVersion((infoErr, version) => {
        if (infoErr) {
          callback(infoErr, null);
          return;
        }

        if (version !== VERSION) {
          callback(`Unsupported version board - board: ${version} supported: ${VERSION}`);
          return;
        }
        this._flush();

        this._write([code.START_TRANSFER, code.EOC], (startTransferErr) => {
          if (startTransferErr) {
            callback(startTransferErr);
            return;
          }

          this._readSyncOk(0, (syncOkErr) => {
            if (syncOkErr) {
              callback(syncOkErr);
              return;
            }

            const sendEndTransfer = (endTransferErr) => {
              if (endTransferErr) {
                callback(endTransferErr);
                return;
              }

              this._read(2, (syncErr, syncData) => {
                if (syncErr) {
                  callback(syncErr);
                }
                if (!this._syncOk(syncData, 0)) {
                  callback('Sync lost while writing parameters, please try again');
                  return;
                }
                this._flush();

                this._write([code.SAVE_TO_EEPROM, code.EOC], (eepromErr) => {
                  if (eepromErr) {
                    callback(eepromErr);
                    return;
                  }
                  this._readSyncOk(0, callback);
                });
                callback();
              });
            };

            const sendParamsChunkCallback = (offset, chunkErr) => {
              if (chunkErr) {
                callback(chunkErr);
                return;
              }

              if (offset > data.length) {
                this._flush();
                this._write([code.END_TRANSFER, code.EOC], sendEndTransfer.bind(this));
                return;
              }

              const endOffset = offset + code.PROG_MULTI_MAX / 2;
              const dataChunk = data.slice(offset, endOffset);
              this._setParamsChunk(dataChunk, sendParamsChunkCallback.bind(this, endOffset));
            };

            const endOffset = code.PROG_MULTI_MAX / 2;
            const dataChunk = data.slice(0, endOffset);
            this._setParamsChunk(dataChunk, sendParamsChunkCallback.bind(this, endOffset));
          });
        });
      });
    });
  }

  _setParamsChunk(data, callback) {
    const buffer = new Buffer((data.length * 2) + 3);
    buffer.writeUInt8(code.SET_PARAMS, 0);
    buffer.writeUInt8(data.length * 2, 1);
    data.forEach((byte, index) => {
      buffer.writeUInt16LE(byte, (index * 2) + 2);
    });
    buffer.writeUInt8(code.EOC, buffer.length - 1);

    this._flush();
    this._write(buffer, function writeCallback(err) {
      if (err) {
        callback(err);
        return;
      }
      this._readSyncOk(0, callback);
    });
  }

  _flush() {
    this.buffer = new Buffer(0);
  }

  _onOpen() {
    this._open = true;
    if (this.onOpen) {
      this.onOpen();
    }
  }

  _read(bytes, callback) {
    const result = new Buffer(bytes);
    let count = 0;

    const retry = function retry() {
      if (this.buffer.length >= bytes) {
        this.buffer.copy(result, 0, 0, bytes);
        this.buffer = this.buffer.slice(bytes, this.buffer.length);
        callback(null, result);
        return;
      }

      if (!this._open) {
        callback('serial port was closed while waiting to read data', null);
        return;
      }

      if (count >= 100) {
        callback(`waited to long (100ms) to read ${bytes} bytes`, null);
      }

      count += 1;
      setTimeout(retry.bind(this), 100);
    }.bind(this);

    retry();
  }

  _write(data, callback) {
    this.serialPort.write(data, (writeErr) => {
      if (writeErr) {
        if (callback) {
          callback(writeErr);
        }
        return;
      }
      this.serialPort.drain((drainErr) => {
        if (drainErr) {
          if (callback) {
            callback(drainErr);
          }
          return;
        }
        if (callback) {
          callback(null);
        }
      });
    });
  }

  _syncOk(buffer, offset) {
    return buffer[offset] === code.INSYNC && buffer[offset + 1] === code.OK;
  }

  _readSyncOk(offset, callback) {
    this._read(offset + 2, (err, data) => {
      if (!this._syncOk(data, offset)) {
        callback('Sync lost while reading parameters, please try again');
        return;
      }
      if (err) {
        callback(err, null);
        return;
      }
      callback(err, data.slice(0, data.length - 2));
    });
  }

  _onData(data) {
    this.buffer = Buffer.concat([this.buffer, data], this.buffer.length + data.length);
  }

  _onError(err) {
    if (err) {
      throw new Error(err);
    }
  }

  isOpen() {
    return this._open;
  }

  _onClose() {
    this._open = false;
    if (this.onClose) {
      this.onClose();
    }
  }
}

module.exports = OSDInterface;
