/* eslint no-param-reassign: ["error", { props: false }] */
import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'react-toolbox/lib/card';
import OsdInterface from '../OsdInterface';
import actions from './actions';
import { bindActionCreators } from 'redux';
import Button from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import Column from '../components/Column';
import pako from 'pako';
import Dropdown from 'react-toolbox/lib/dropdown';
import eeprom from '../utils/eeprom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Label from '../components/Label';
import ProgressBar from 'react-toolbox/lib/progress_bar';


class Sidebar extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.map.isRequired,
    setAsBaseState: PropTypes.func.isRequired,
    setParamsFromEEPROM: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this._osdInterface = new OsdInterface();
    this._updateSerialPorts();
    this._loadDefaultConfig();

    this.state = {
      serialPorts: [],
      serialPort: null,
      connected: false,
      connecting: false,
      readingOSD: false,
      writingOSD: false,
      uploading: false,
      progress: 0,
    };
  }

  _loadDefaultConfig() {
  }

  _updateSerialPorts = () => {
    chrome.serial.getDevices(this._onSerialPortsReceived);
    setTimeout(this._updateSerialPorts, 1000);
  }

  _onError = (error) => {
    this.props.showError(error);
    this.setState({
      ...this.state,
      readingOSD: false,
      writingOSD: false,
      uploading: false,
      progress: 0
    });
  }

  _onProgress = (progress) => {
    this.setState({ ...this.state, progress });
  }

  _onSerialPortsReceived = (serialPorts) => {
    let serialPort = this.state.serialPort;
    if (serialPorts.length === 0) {
      serialPort = null;
    } else if (serialPorts.map((s) => s.path).indexOf(serialPort) < 0) {
      serialPort = serialPorts[0].path;
    }
    this.setState({ ...this.state, serialPorts, serialPort });
  }

  _onOSDConfigReceived = (eepromData) => {
    this.setState({ ...this.state, readingOSD: false, progress: 0 });
    this.props.setParamsFromEEPROM(eepromData);
    this.props.showInfo('finished reading osd configuration');
  }

  _onOSDConfigWritten = () => {
    this.setState({ ...this.state, writingOSD: false, progress: 0 });
    this.props.setAsBaseState(this.props.parameters);
    this.props.showInfo('finished writing osd configuration');
  }

  _onConfigFileWritten = () => {
    this.props.showInfo('wrote configuration to file');
  }

  _onConfigFileRead = (eepromData, wasDefaultFile = false) => {
    this.props.setParamsFromEEPROM(eepromData);
    if (wasDefaultFile) {
      this.props.showInfo('read default configuration from default.conf');
    } else {
      this.props.showInfo('read configuration from file');
    }
  }

  _onFirmwareUploaded = () => {
    this.setState({ ...this.state, uploading: false, progress: 0 });
    this.props.showInfo('finished uploading firmware');
  }

  _onSerialPortChange = (serialPort) => {
    this.setState({ ...this.state, serialPort });
  }

  _readFromOSD = () => {
    this.props.showInfo('reading osd configuration');
    this.setState({ ...this.state, readingOSD: true });
    this._osdInterface
      .readParameters(this.state.serialPort, this._onProgress)
      .then(this._onOSDConfigReceived, this._onError);
  }

  _writeToOSD = () => {
    this.props.showInfo('writing osd configuration');
    this.setState({ ...this.state, writingOSD: true });
    const data = eeprom.fromParameters(this.props.parameters);
    this._osdInterface
      .writeParameters(this.state.serialPort, data, this._onProgress)
      .then(this._onOSDConfigWritten, this._onError);
  }

  _writeToFile = () => {
    chrome.fileSystem.chooseEntry({
      type: 'saveFile',
      suggestedName: 'playuav.conf',
      accepts: [{
        description: 'configuration files',
        mimeTypes: ['application/json'],
        extensions: ['conf']
      }],
      acceptsAllTypes: false,
      acceptsMultiple: false,
    }, (entry) => {
      if (chrome.runtime.lastError) {
        this._onError(chrome.runtime.lastError.message);
        chrome.runtime.lastError = undefined;
        return;
      }

      if (!entry) {
        return;
      }

      entry.createWriter((writer) => {
        writer.onerror = this._onError;
        writer.onwriteend = () => {
          this._onConfigFileWritten();
        };

        const data = JSON.stringify(eeprom.fromParameters(this.props.parameters));
        const blob = new Blob([data], { type: 'application/json' });

        writer.write(blob);
      }, this._onError);
    });
  }

  _readFile = () => {
    chrome.fileSystem.chooseEntry({
      type: 'openFile',
      suggestedName: 'playuav.conf',
      accepts: [{
        description: 'configuration files',
        mimeTypes: ['application/json'],
        extensions: ['conf']
      }],
      acceptsAllTypes: false,
      acceptsMultiple: false,
    }, (entry) => {
      if (chrome.runtime.lastError) {
        this._onError(chrome.runtime.lastError.message);
        chrome.runtime.lastError = undefined;
        return;
      }

      if (!entry) {
        return;
      }

      entry.file((file) => {
        const reader = new FileReader();
        reader.onerror = this._onError;
        reader.onloadend = () => {
          const data = JSON.parse(reader.result);
          this._onConfigFileRead(data, false);
        };
        reader.readAsText(file);
      });
    });
  }

  _uploadFirmware = () => {
    this.setState({ ...this.state, uploading: true, progress: 0 });
    this.props.showInfo('uploading firmware');

    chrome.fileSystem.chooseEntry({
      type: 'openFile',
      suggestedName: 'playuav.hex',
      accepts: [{
        description: 'hex files',
        mimeTypes: ['application/json'],
        extensions: ['hex']
      }],
      acceptsAllTypes: false,
      acceptsMultiple: false,
    }, (entry) => {
      if (chrome.runtime.lastError) {
        this._onError(chrome.runtime.lastError.message);
        chrome.runtime.lastError = undefined;
        return;
      }

      if (!entry) {
        return;
      }

      entry.file((file) => {
        const reader = new FileReader();
        reader.onerror = this._onError;
        reader.onloadend = () => {
          const firmware = JSON.parse(reader.result);
          const binary = atob(firmware.image);
          const buffer = new Buffer(firmware.image.length);
          for (let i = 0; i < buffer.length; i++) {
            buffer[i] = binary.charCodeAt(i);
          }
          firmware.imagebytes = pako.inflate(buffer);
          this.setState({ ...this.state, uploading: true, progress: 0 });
          this.props.showInfo('uploading firmware');

          this._osdInterface.uploadFirmware(
            this.state.serialPort,
            firmware,
            this._onProgress
          )
          .then(this._onFirmwareUploaded)
          .catch(this._onError);
        };
        reader.readAsText(file);
      });
    });
  }

  _loadDefaults = () => {
    this.props.setParamsFromEEPROM(eeprom.defaultEEPROM);
    this.props.showInfo('loaded default osd configuration');
  }

  _renderReadOSDButton() {
    const { readingOSD, writingOSD, uploading } = this.state;
    const disabled = readingOSD || writingOSD || uploading;
    const label = readingOSD ? 'reading from osd' : 'read from osd';
    return (
      <Button onClick={this._readFromOSD} label={label}
        icon="file_download" disabled={disabled} raised
      />
    );
  }

  _renderWriteOSDButton() {
    const { readingOSD, writingOSD, uploading } = this.state;
    const disabled = readingOSD || writingOSD || uploading;
    const label = writingOSD ? 'writing to osd' : 'write to osd';
    return (
      <Button onClick={this._writeToOSD} label={label}
        icon="file_upload" disabled={disabled} raised
      />
    );
  }

  _renderLoadDefaultButton() {
    return (
      <Button label="load defaults" icon="settings_backup_restore"
        onClick={this._loadDefaults} raised
      />
    );
  }

  _renderUploadFirmwareButton() {
    const { readingOSD, writingOSD, uploading } = this.state;
    const disabled = readingOSD || writingOSD || uploading;
    const label = uploading ? 'flashing firmware' : 'flash firmware';
    return (
      <Button onClick={this._uploadFirmware} label={label}
        icon="present_to_all" raised disabled={disabled}
      />
    );
  }

  _renderRefreshButton() {
    if (process.platform === 'linux') {
      return;
    }

    return (
      <Button style={{ margin: '2rem 0.5rem' }} label="refresh"
        onClick={this._refreshSerialPorts} raised
      />
    );
  }

  _renderSerialPortDropdown() {
    const serialPorts = this.state.serialPorts.map((port) => ({
      value: port.path, label: port.path
    }));

    return (
      <Dropdown
        auto
        value={this.state.serialPort}
        source={serialPorts}
        onChange={this._onSerialPortChange}
        label="serial port"
      />
    );
  }

  _renderNoSerialPorts() {
    return (
      <div>
        <Label text="serial port" />
        <div>No serial ports found</div>
      </div>
    );
  }

  _renderProgressBar() {
    if (!this.state.uploading && !this.state.writingOSD && !this.state.readingOSD) {
      return;
    }

    return (<ProgressBar value={this.state.progress} mode="determinate" />);
  }

  render() {
    let serialPortSelector;

    if (this.state.serialPorts.length) {
      serialPortSelector = this._renderSerialPortDropdown();
    } else {
      serialPortSelector = this._renderNoSerialPorts();
    }

    return (
      <Card className="connection">
        <CardText>
          <Column width={75}>
            {serialPortSelector}
          </Column>
          <Column width={25}>
            {this._renderRefreshButton()}
          </Column>
          <br />
          {this._renderProgressBar()}
          <br />
          {this._renderWriteOSDButton()}
          {this._renderReadOSDButton()}
          <br />
          <br />
          {this._renderUploadFirmwareButton()}
          {this._renderLoadDefaultButton()}
          <br />
          <br />
          <Button onClick={this._writeToFile} label="save to file" icon="save" raised />
          <Button onClick={this._readFile} label="read from file" icon="folder_open" raised />
        </CardText>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return { parameters: state.parameters };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
