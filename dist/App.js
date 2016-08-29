"use strict";
const React = require("react");
const react_1 = require('react');
const app_bar_1 = require('react-toolbox/lib/app_bar');
const react_toolbox_1 = require('react-toolbox');
const styles = require('./App.css');
class App extends react_1.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showDrawer: false,
        };
        this._toggleDrawer = () => {
            this.setState(Object.assign({}, this.state, { showDrawer: !this.state.showDrawer }));
        };
    }
    render() {
        return (React.createElement(react_toolbox_1.Layout, null, 
            React.createElement(react_toolbox_1.NavDrawer, {active: this.state.showDrawer, onOverlayClick: this._toggleDrawer}, 
                React.createElement(react_toolbox_1.List, {selectable: true, ripple: true}, 
                    React.createElement(react_toolbox_1.ListItem, {leftIcon: "settings_overscan", caption: "configurator", to: "#/", onClick: this._toggleDrawer}), 
                    React.createElement(react_toolbox_1.ListItem, {leftIcon: "format_paint", caption: "pixler", to: "#/pixler", onClick: this._toggleDrawer}))
            ), 
            React.createElement(react_toolbox_1.Panel, null, 
                React.createElement(app_bar_1.default, null, 
                    React.createElement(react_toolbox_1.IconButton, {inverse: true, icon: "menu", onClick: this._toggleDrawer}), 
                    "PlayUAV OSD Configurator"), 
                React.createElement("div", {className: styles.mainContent}, this.props.children), 
                (() => {
                    if (process.env.NODE_ENV !== 'production') {
                        const DevTools = require('./DevTools');
                        return React.createElement(DevTools, null);
                    }
                })())));
    }
}
App.propTypes = {
    children: react_1.PropTypes.element.isRequired
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
//# sourceMappingURL=App.js.map