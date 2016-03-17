import React, { Component } from 'react';
import ParametersModule from './ParametersModule';
import App from 'react-toolbox/lib/app';
import AppBar from 'react-toolbox/lib/app_bar';
import Snackbar from 'react-toolbox/lib/snackbar';
import Sidebar from './Sidebar';
import Preview from './Preview';


export default class Index extends Component {
  state = {
    errorMessage: '',
    infoMessage: '',
  }

  _showErrorMessage = (error) => {
    this.setState({ ...this.state, errorMessage: error });
  }

  _showInfoMessage = (message) => {
    this.setState({ ...this.state, infoMessage: message });
  }

  _closeInfoSnackbar = () => {
    this.setState({ ...this.state, infoMessage: '' });
  }

  _closeErrorSnackbar = () => {
    this.setState({ ...this.state, errorMessage: '' });
  }

  render() {
    return (
      <App>
        <AppBar>
          PlayUAV OSD Configurator
        </AppBar>
        <div className="main">
          <div className="sidebar">
            <Preview />
            <hr />
            <Sidebar showInfo={this._showInfoMessage} showError={this._showErrorMessage} />
          </div>
          <div className="parameters">
            <ParametersModule />
          </div>
        </div>
        <Snackbar
          type="cancel"
          label={this.state.infoMessage}
          active={!!this.state.infoMessage.length}
          timeout={2000}
          onTimeout={this._closeInfoSnackbar}
          onClick={this._closeInfoSnackbar}
          action="dismiss"
          icon="info"
        />
        <Snackbar
          type="warning"
          label={this.state.errorMessage}
          active={!!this.state.errorMessage.length}
          onClick={this._closeErrorSnackbar}
          action="dismiss"
          icon="warning"
        />
      </App>
    );
  }
}
