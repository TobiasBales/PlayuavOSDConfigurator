import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class Rssi extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    raw: PropTypes.number.isRequired,
    rssi: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }

  content() {
    const { raw, type } = this.props;
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
      content = `RSSI ${rssi.toFixed(0)}%`;
    } else {
      content = `RSSI ${rssi.toFixed(0)}`;
    }
    return content;
  }
}
