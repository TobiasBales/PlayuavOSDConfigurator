import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class Position extends Component {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    setFontSize: PropTypes.func.isRequired,
  }

  _onChange = (fontSize) => {
    this.props.setFontSize(fontSize);
  }

  render() {
    const { fontSize } = this.props;
    const options = [
      { value: 0, label: 'small' },
      { value: 1, label: 'medium' },
      { value: 2, label: 'large' },
    ];

    return (
      <Dropdown
        auto
        value={fontSize}
        source={options}
        onChange={this._onChange}
        label="font size"
      />
    );
  }
}
