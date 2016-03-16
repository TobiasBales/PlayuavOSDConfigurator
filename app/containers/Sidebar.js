import Button from 'react-toolbox/lib/button';
import Dropdown from 'react-toolbox/lib/dropdown';
import Navigation from 'react-toolbox/lib/navigation';
import React, { Component, PropTypes } from 'react';
import { ipcRenderer as ipc } from 'electron';
import { bindStateForComponent } from '../utils/parameters';
import Label from '../components/Label';
import ImmutablePropTypes from 'react-immutable-proptypes';
import eeprom from '../utils/eeprom';
import Column from '../components/Column';

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
    ipc.on('connected', this._onConnected);
    ipc.on('disconnected', this._onDisconnted);
    ipc.on('osd-config', this._onOSDConfigReceived);
    ipc.on('osd-config-written', this._onOSDConfigWritten);
    ipc.on('error', this._onError);
    ipc.send('get-serial-ports');
  }

  state = {
    serialPorts: [],
    serialPort: null,
    connected: false,
    connecting: false,
    readingOSD: false,
    writingOSD: false,
  }

  _onError = (error) => {
    this.props.showError(error);
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

  _onConnected = () => {
    this.setState({ ...this.state, connected: true, connecting: false });
    this.props.showInfo('connected');
  }

  _onDisconnted = () => {
    this.setState({
      ...this.state,
      connected: false,
      connecting: false,
      readingOSD: false,
      writingOSD: false
    });
    this.props.showInfo('disconnected');
  }

  _onOSDConfigReceived = (_, eepromData) => {
    this.setState({ ...this.state, readingOSD: false, writingOSD: false });
    this.props.setParamsFromEEPROM(eepromData);
    this.props.showInfo('finished reading osd config');
  }

  _onOSDConfigWritten = () => {
    this.setState({ ...this.state, readingOSD: false, writingOSD: false });
    this.props.showInfo('finished writing osd config');
  }

  _onSerialPortChanged = (serialPort) => {
    this.setState({ ...this.state, serialPort });
  }

  _connect = () => {
    this.setState({ ...this.state, connecting: true });
    ipc.send('connect', this.state.serialPort);
  }

  _disconnect = () => {
    this.setState({ ...this.state, connected: false, connecting: false });
    ipc.send('disconnect');
  }

  _readFromOSD = () => {
    this.props.showInfo('reading osd config ...');
    this.setState({ ...this.state, readingOSD: true });
    ipc.send('read-osd');
  }

  _writeToOSD = () => {
    this.props.showInfo('writing osd config ...');
    this.setState({ ...this.state, writingOSD: true });
    ipc.send('write-osd', eeprom.fromParameters(this.props.state));
  }

  _loadDefaults = () => {
    this.props.setParamsFromEEPROM(eeprom.defaultEEPROM);
    this.props.showInfo('loaded default osd config');
  }

  _renderConnectButton() {
    const buttonLabel = this.state.connecting ? 'connecting ...' : 'connect';
    const buttonClickHandler = this.state.connecting ? this._disconnect : this._connect;
    const primary = !this.state.connecting;
    return (
      <Button
        label={buttonLabel}
        onClick={buttonClickHandler}
        primary={primary}
        raised
        style={{ margin: '2rem 0.5rem' }}
      />
    );
  }

  _renderReadOSDButton() {
    const { connected, readingOSD, writingOSD } = this.state;
    const disabled = !connected || readingOSD || writingOSD;
    const label = readingOSD ? 'reading from osd ...' : 'read from osd';
    return (
      <Button label={label} onClick={this._readFromOSD} disabled={disabled} raised />
    );
  }

  _renderWriteOSDButton() {
    const { connected, readingOSD, writingOSD } = this.state;
    const disabled = !connected || readingOSD || writingOSD;
    const label = writingOSD ? 'writing to osd ...' : 'write to osd';
    return (
      <Button label={label} onClick={this._writeToOSD} disabled={disabled} raised />
    );
  }

  _renderLoadDefaultButton() {
    const { readingOSD, writingOSD } = this.state;
    const disabled = readingOSD || writingOSD;
    return (
      <Button label="load defaults" onClick={this._loadDefaults} disabled={disabled} raised />
    );
  }

  _renderDisconnectButton() {
    return (
      <Button
        label="disconnect"
        onClick={this._disconnect}
        primary
        raised
        style={{ margin: '2rem 0.5rem' }}
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

  render() {
    let serialPortSelector;
    let connectButton;

    if (this.state.serialPorts.length) {
      serialPortSelector = this._renderSerialPortDropdown();
      connectButton = this.state.connected ?
        this._renderDisconnectButton() : this._renderConnectButton();
    } else {
      serialPortSelector = this._renderNoSerialPorts();
    }

    return (
      <div>
        <Navigation type="horizontal">
          <Column width={35}>
            {connectButton}
          </Column>
          <Column width={65}>
            {serialPortSelector}
          </Column>
          {this._renderWriteOSDButton()}
          {this._renderReadOSDButton()}
          <br />
          <br />
          {this._renderLoadDefaultButton()}
        </Navigation>
      </div>
    );
  }
}

export default(bindStateForComponent('sidebar', Sidebar));
