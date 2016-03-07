'use strict';

const SerialPort = require('serialport-electron');

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

  sync() {
    this._flush();
    this._write([code.GET_SYNC, code.EOC]);
  }

  close() {
    this.serialPort.close();
  }

  getVersion() {
    this._flush();
    this._write([code.GET_DEVICE, code.INFO_OSD_REV, code.EOC]);
  }

  getParams(callback) {
    this._flush();
    this._write([code.GET_PARAMS, code.EOC]);
    this._read(1026, function getParamsCallback(buffer) {
      if (!this._syncOk(buffer, 1024)) {
        callback('Sync lost while reading parameters, please try again');
      }
      callback(null, buffer);
    }.bind(this));
  }

  _write(data) {
    this.serialPort.write(data);
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
        callback(result);
        return;
      }

      if (count >= 100) {
        throw new Error('waited to long (100us) to read ' + bytes + 'bytes');
      }

      count += 1;
      setTimeout(retry.bind(this), 100);
    }.bind(this);

    retry();
  }

  _syncOk(buffer, offset) {
    return buffer[offset] === code.INSYNC && buffer[offset + 1] === code.OK;
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
