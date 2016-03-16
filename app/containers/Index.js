import React, { Component } from 'react';
import ParametersModule from './ParametersModule';
import App from 'react-toolbox/lib/app';
import AppBar from 'react-toolbox/lib/app_bar';
import FontIcon from 'react-toolbox/lib/font_icon';
import Snackbar from 'react-toolbox/lib/snackbar';
import Sidebar from './Sidebar';
import Preview from './Preview';
import Column from '../components/Column';


export default class Index extends Component {
  state = {
    sidebarVisible: false,
    errorMessage: '',
    infoMessage: '',
  }

  _showErrorMessage = (error) => {
    this.setState({ ...this.state, errorMessage: error });
  }

  _showInfoMessage = (message) => {
    this.setState({ ...this.state, infoMessage: message });
  }

  _toggleSidebar = () => {
    this.setState({ ...this.state, sidebarVisible: !this.state.sidebarVisible });
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
          <a href="#" onClick={this._toggleSidebar}><FontIcon value="reorder"/></a>
          PlayUAV OSD Configurator
        </AppBar>
        <Sidebar
          visible={this.state.sidebarVisible}
          requestClose={this._toggleSidebar}
          showInfo={this._showInfoMessage}
          showError={this._showErrorMessage}
          onOverlayClick={this._toggleSidebar}
        />
        <Column width={30}>
          <Preview/>
        </Column>
        <Column width={70}>
          <ParametersModule/>
        </Column>
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
