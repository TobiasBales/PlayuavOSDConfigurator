import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

export default class Column extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    classes: PropTypes.string,
    width: PropTypes.number.isRequired,
  }

  render() {
    const { children, width } = this.props;
    const style = this.props.style || {};
    style.width = `${width}%`;
    const classes = classNames('column', this.props.classes);

    return (
      <div className={classes} style={style} {...this.props}>
        {children}
      </div>
    );
  }
}
