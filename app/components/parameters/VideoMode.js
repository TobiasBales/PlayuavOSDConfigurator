import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class VideoMode extends Component {
  static propTypes = {
    videoMode: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
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
    const classes = classNames({
      modified: videoMode.get('value') !== videoMode.get('originalValue')
    });

    return (
      <Dropdown
        auto
        className={classes}
        value={videoMode.get('value')}
        source={options}
        onChange={this._onChange}
        label="video mode"
      />
    );
  }
}
