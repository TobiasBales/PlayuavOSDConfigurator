import React, { Component, PropTypes } from 'react';
import AppContainer from 'react-toolbox/lib/app';
import AppBar from 'react-toolbox/lib/app_bar';
import { IconButton } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import { List, ListItem } from 'react-toolbox/lib/list';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showDrawer: false,
    };
  }

  _toggleDrawer = () => {
    this.setState({ ...this.state, showDrawer: !this.state.showDrawer });
  }

  render() {
    return (
      <AppContainer>
        <AppBar>
          <IconButton inverse icon="reorder" onClick={this._toggleDrawer} />
          PlayUAV OSD Configurator
        </AppBar>
        <Drawer active={this.state.showDrawer} onOverlayClick={this._toggleDrawer}>
          <List selectable ripple>
            <ListItem
              leftIcon="settings_overscan"
              caption="configurator"
              to="#/"
              onClick={this._toggleDrawer}
            />
            <ListItem
              leftIcon="format_paint"
              caption="pixler"
              to="#/pixler"
              onClick={this._toggleDrawer}
            />
          </List>
        </Drawer>
        {this.props.children}
        {
          (() => {
            if (process.env.NODE_ENV !== 'production') {
              const DevTools = require('./DevTools');
              return <DevTools />;
            }
          })()
        }
      </AppContainer>
    );
  }
}
