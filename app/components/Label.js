import React, { Component, PropTypes } from 'react';

export default class Label extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  }

  render() {
    const { text } = this.props;
    return (
      <label className="label">{text}</label>
    );
  }
}
