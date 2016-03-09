import React, { Component, PropTypes } from 'react';
import Label from '../Label';

export default class Text extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number,
    ]).isRequired,
  }

  render() {
    const { label, text } = this.props;
    return (
      <div>
        <Label text={label}/>
        <div>{text}</div>
      </div>
    );
  }
}
