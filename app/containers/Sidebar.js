import Button from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import Dropdown from 'react-toolbox/lib/dropdown';
import Navigation from 'react-toolbox/lib/navigation';
import React, { Component, PropTypes } from 'react';
import ipc from 'ipc';
import { bindStateForComponent } from '../utils/parameters';
import Label from '../components/Label';

class Sidebar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    showInfo: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    setParamsFromEEPROM: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    ipc.on('serial-ports', this._onSerialPortsReceived);
    ipc.on('connected', this._onConnected);
    ipc.on('disconnected', this._onDisconnted);
    ipc.on('osd-config', this._onOSDConfigReceived);
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

  _onSerialPortsReceived = (serialPorts) => {
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
    this.setState({ ...this.state, connected: false, connecting: false, readingOSD: false, writingOSD: false });
    this.props.showInfo('disconnected');
  }

  _onOSDConfigReceived = (eepromData) => {
    this.setState({ ...this.state, readingOSD: false, writingOSD: false });
    this.props.setParamsFromEEPROM(eepromData);
    this.props.showInfo('finished reading osd config');
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
    this.setState({ ...this.state, readingOSD: true });
    ipc.send('read-osd');
  }

  _renderConnectButton() {
    const buttonLabel = this.state.connecting ? 'connecting ...' : 'connect';
    const buttonClickHandler = this.state.connecting ? this._disconnect : this._connect;
    const primary = !this.state.connecting;
    return (
      <Button label={buttonLabel} onClick={buttonClickHandler} primary={primary} raised/>
    );
  }

  _renderReadOSDButton() {
    const { connected, readingOSD, writingOSD } = this.state;
    const disabled = !connected || readingOSD || writingOSD;
    const label = readingOSD ? 'reading from osd ...' : 'read from osd';
    return (
      <Button label={label} onClick={this._readFromOSD} disabled={disabled} raised/>
    );
  }

  _renderDisconnectButton() {
    return (
      <Button label="disconnect" onClick={this._disconnect} primary raised/>
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
        <Label text="serial port"/>
        <div>No serial ports found</div>
      </div>
    );
  }

  render() {
    let serialPortSelector;
    let connectButton;

    if (this.state.serialPorts.length) {
      serialPortSelector = this._renderSerialPortDropdown();
      connectButton = this.state.connected ? this._renderDisconnectButton() : this._renderConnectButton();
    } else {
      serialPortSelector = this._renderNoSerialPorts();
    }

    return (
      <Drawer active={this.props.visible} {...this.props}>
        <Navigation type="vertical">
          {serialPortSelector}
          {connectButton}
          {this._renderReadOSDButton()}
          <Button label="write to osd" onClick={this._writeToOSD} disabled raised/>
        </Navigation>
      </Drawer>
    );
  }
}

export default(bindStateForComponent('sidebar', Sidebar));
