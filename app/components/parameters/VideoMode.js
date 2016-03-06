import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class VideoMode extends Component {
  static propTypes = {
    videoMode: PropTypes.number.isRequired,
    setVideoMode: PropTypes.func.isRequired,
  }

  _onChange = (videoMode) => {
    this.props.setVideoMode(videoMode);
  }

  render() {
    const { videoMode } = this.props;
    const options = [
      { value: 0, label: 'ntsc' },
      { value: 1, label: 'pal' },
    ];

    return (
      <Dropdown
        auto
        value={videoMode}
        source={options}
        onChange={this._onChange}
        label="video mode"
      />
    );
  }
}
