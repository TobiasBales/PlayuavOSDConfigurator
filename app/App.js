import React, { Component, PropTypes } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import { Layout, NavDrawer, Panel, List, ListItem, IconButton } from 'react-toolbox';
import styles from './App.css';

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
      <Layout>
        <NavDrawer active={this.state.showDrawer} onOverlayClick={this._toggleDrawer}>
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
        </NavDrawer>
        <Panel>
          <AppBar>
            <IconButton inverse icon="menu" onClick={this._toggleDrawer} />
            PlayUAV OSD Configurator
          </AppBar>
          <div className={styles.mainContent}>
            {this.props.children}
          </div>
          {
            (() => {
              if (process.env.NODE_ENV !== 'production') {
                const DevTools = require('./DevTools');
                return <DevTools />;
              }
            })()
          }
        </Panel>
      </Layout>
    );
  }
}
