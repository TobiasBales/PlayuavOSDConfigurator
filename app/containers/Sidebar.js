import Button from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import React, { Component, PropTypes } from 'react';
import { Card, CardText } from 'react-toolbox/lib/card';
import { ipcRenderer as ipc } from 'electron';
import { bindStateForComponent } from '../utils/parameters';
import Label from '../components/Label';
import Column from '../components/Column';
import ImmutablePropTypes from 'react-immutable-proptypes';
import eeprom from '../utils/eeprom';


class Sidebar extends Component {
  static propTypes = {
    setParamsFromEEPROM: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    state: ImmutablePropTypes.map,
  }

  constructor(props) {
    super(props);
    ipc.on('serial-ports', this._onSerialPortsReceived);
    ipc.on('osd-config', this._onOSDConfigReceived);
    ipc.on('osd-config-written', this._onOSDConfigWritten);
    ipc.on('osd-file-written', this._onConfigFileWritten);
    ipc.on('osd-file-read', this._onConfigFileRead);
    ipc.on('firmware-uploaded', this._onFirmwareUploaded);
    ipc.on('error', this._onError);
    ipc.on('progress', this._onProgress);
    ipc.send('get-serial-ports');
  }

  state = {
    serialPorts: [],
    serialPort: null,
    connected: false,
    connecting: false,
    readingOSD: false,
    writingOSD: false,
    uploading: false,
    progress: 0,
  }

  _onError = (e, error) => {
    this.props.showError(error);
    this.setState({ ...this.state,
      readingOSD: false, writingOSD: false, uploading: false, progress: 0
    });
  }

  _onProgress = (_, progress) => {
    this.setState({ ...this.state, progress });
  }

  _onSerialPortsReceived = (_, serialPorts) => {
    let serialPort = this.state.serialPort;
    if (serialPorts.length === 0) {
      serialPort = null;
    } else if (serialPorts.indexOf(serialPort) < 0) {
      serialPort = serialPorts[0].comName;
    }
    this.setState({ ...this.state, serialPorts, serialPort });
  }

  _onOSDConfigReceived = (_, eepromData) => {
    this.setState({ ...this.state, readingOSD: false, progress: 0 });
    this.props.setParamsFromEEPROM(eepromData);
    this.props.showInfo('finished reading osd configuration');
  }

  _onOSDConfigWritten = () => {
    this.setState({ ...this.state, writingOSD: false, progress: 0 });
    this.props.showInfo('finished writing osd configuration');
  }

  _onConfigFileWritten = () => {
    this.props.showInfo('wrote configuration to file');
  }

  _onConfigFileRead = (_, eepromData) => {
    this.props.setParamsFromEEPROM(eepromData);
    this.props.showInfo('read configuration from file');
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
    ipc.send('read-osd', this.state.serialPort);
  }

  _writeToOSD = () => {
    this.props.showInfo('writing osd configuration');
    this.setState({ ...this.state, writingOSD: true });
    ipc.send('write-osd', this.state.serialPort, eeprom.fromParameters(this.props.state));
  }

  _writeToFile = () => {
    ipc.send('write-file', eeprom.fromParameters(this.props.state));
  }

  _readFile = () => {
    ipc.send('read-file');
  }

  _uploadFirmware = () => {
    this.setState({ ...this.state, uploading: true });
    ipc.send('upload-firmware', this.state.serialPort);
  }

  _loadDefaults = () => {
    this.props.setParamsFromEEPROM(eeprom.defaultEEPROM);
    this.props.showInfo('loaded default osd configuration');
  }

  _refreshSerialPorts() {
    ipc.send('get-serial-ports');
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
    const label = uploading ? 'uploading firmware' : 'upload firmware';
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
    const serialPorts = this.state.serialPorts.map((port) => {
      return { value: port.comName, label: port.comName };
    });

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

export default(bindStateForComponent('sidebar', Sidebar));
