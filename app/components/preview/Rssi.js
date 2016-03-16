import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class Rssi extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    fontSize: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    raw: PropTypes.number.isRequired,
    rssi: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }

  content() {
    const { fontSize, raw, type } = this.props;
    let { max, min, rssi } = this.props;
    let content = '';

    if (raw === 0) {
      if (type === 0) {
        min = Math.max(0, min);
        max = Math.min(255, max);
      }

      if ((max - min) > 0) {
        rssi = (rssi - min) / (max - min) * 100;
      }

      rssi = Math.max(0, rssi);
    }

    if (fontSize === 0) {
      content = `${rssi.toFixed(0)}/`;
    } else {
      content = `${rssi.toFixed(0)}%%`;
    }

    return content;
  }
}
