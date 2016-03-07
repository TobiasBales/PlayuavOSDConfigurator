import React, { Component } from 'react';
import ParametersModule from './ParametersModule';
import App from 'react-toolbox/lib/app';
import AppBar from 'react-toolbox/lib/app_bar';
import Button from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import Dropdown from 'react-toolbox/lib/dropdown';
import FontIcon from 'react-toolbox/lib/font_icon';
import Navigation from 'react-toolbox/lib/navigation';
import Snackbar from 'react-toolbox/lib/snackbar';
import ipc from 'ipc';
import { bindStateForComponent } from '../utils/parameters';
import Label from '../components/Label';


class Index extends Component {
  constructor(props) {
    super(props);
    ipc.on('serial-ports', this._onSerialPorts);
    ipc.on('connected', this._onConnected);
    ipc.on('disconnected', this._onDisconnted);
    ipc.on('osd-config', this._onOSDConfig);
    ipc.on('error', this._onError);
    ipc.send('get-serial-ports');
  }

  state = {
    drawerOpen: false,
    serialPorts: [],
    serialPort: null,
    connected: false,
    connecting: false,
    readingOSD: false,
    writingOSD: false,
    errorMessage: '',
    infoMessage: '',
  }

  _onSerialPorts = (serialPorts) => {
    let serialPort = this.state.serialPort;
    if (serialPorts.length === 0) {
      serialPort = null;
    } else if (serialPorts.indexOf(serialPort) < 0) {
      serialPort = serialPorts[0].comName;
    }
    this.setState({ ...this.state, serialPorts, serialPort });
  }

  _onError = (error) => {
    this.setState({ ...this.state, errorMessage: error });
  }

  _showInfoMessage = (message) => {
    this.setState({ ...this.state, infoMessage: message });
  }

  _onConnected = () => {
    this.setState({ ...this.state, connected: true, connecting: false });
    this._showInfoMessage('connected');
  }

  _onDisconnted = () => {
    this.setState({ ...this.state, connected: false, connecting: false, readingOSD: false, writingOSD: false });
    this._showInfoMessage('disconnected');
  }

  _onOSDConfig = (config) => {
    this.setState({ ...this.state, readingOSD: false, writingOSD: false, infoMessage: 'read osd config' });
    console.log('read config', config);
  }

  _toggleDrawer = () => {
    this.setState({ ...this.state, drawerOpen: !this.state.drawerOpen });
  }

  _closeInfoSnackbar = () => {
    this.setState({ ...this.state, infoMessage: '' });
  }

  _closeErrorSnackbar = () => {
    this.setState({ ...this.state, errorMessage: '' });
  }

  _onSerialPortChange = (serialPort) => {
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
      <App>
        <AppBar>
          <a href="#" onClick={this._toggleDrawer}><FontIcon value="reorder"/></a>
          PlayUAV OSD Configurator
        </AppBar>
        <Drawer active={this.state.drawerOpen} onOverlayClick={this._toggleDrawer}>
          <Navigation type="vertical">
            {serialPortSelector}
            {connectButton}
            {this._renderReadOSDButton()}
            <Button label="write to osd" onClick={this._writeToOSD} disabled raised/>
          </Navigation>
        </Drawer>
        <ParametersModule/>
        <Snackbar
          type="cancel"
          label={this.state.infoMessage}
          active={this.state.infoMessage.length}
          timeout={2000}
          onTimeout={this._closeInfoSnackbar}
          onClick={this._closeInfoSnackbar}
          action="dismiss"
          icon="info"
        />
        <Snackbar
          type="warning"
          label={this.state.errorMessage}
          active={this.state.errorMessage.length}
          onClick={this._closeErrorSnackbar}
          action="dismiss"
          icon="warning"
        />
      </App>
    );
  }
}

export default(bindStateForComponent('index', Index));
