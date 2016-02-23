import React, { Component, PropTypes } from 'react';

export default class Column extends Component {
  static propTypes = {
    children: PropTypes.node,
    width: PropTypes.number.isRequired,
  }

  render() {
    const { children, width } = this.props;

    return (
      <div className="column" style={{ width: width + '%' }} {...this.props}>
        {children}
      </div>
    );
  }
}
