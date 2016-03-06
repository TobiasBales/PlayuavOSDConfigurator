import React, { Component } from 'react';
import ParametersModule from './ParametersModule';
// import App from 'react-toolbox/lib/app';
import AppBar from 'react-toolbox/lib/app_bar';

export default class Index extends Component {
  render() {
    return (
      <div>
        <AppBar>PlayUAV OSD Configurator</AppBar>
        <ParametersModule/>
      </div>
    );
  }
}
