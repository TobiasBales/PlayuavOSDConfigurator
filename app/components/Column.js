import React, { Component, PropTypes } from 'react';

export default class Column extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    width: PropTypes.number.isRequired,
  }

  render() {
    const { children, width } = this.props;
    const style = this.props.style || {};
    style.width = width + '%';

    return (
      <div className="column" style={style} {...this.props}>
        {children}
      </div>
    );
  }
}
