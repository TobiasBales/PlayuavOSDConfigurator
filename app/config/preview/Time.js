import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import * as icons from '../../data/icons/lookup';

function padNumber(number, digits) {
  return (`0000000000000${number}`).slice(-digits);
}

export default class Time extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    timeSinceArming: PropTypes.number.isRequired,
    timeSinceHeartbeat: PropTypes.number.isRequired,
    timeSinceStartup: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }

  icon() {
    return icons.TIME;
  }

  content() {
    const { timeSinceArming, timeSinceHeartbeat, timeSinceStartup, type } = this.props;
    let time = 0;
    switch (type) {
      case 0:
        time = timeSinceStartup;
        break;
      case 1:
        time = timeSinceHeartbeat;
        break;
      case 2:
        time = timeSinceArming;
        break;
      default:
        break;
    }
    let content = '';

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor(time / 1000);

    if (hours > 0) {
      content = `${padNumber(hours, 2)}:${padNumber(minutes, 2)}:${padNumber(seconds, 2)}`;
    } else {
      content = `${padNumber(minutes, 2)}:${padNumber(seconds, 2)}`;
    }

    return content;
  }
}
