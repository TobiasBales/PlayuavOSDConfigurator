import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import * as icons from '../data/icons/lookup';

export default class GpsHdop extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    gpsHdop: PropTypes.number.isRequired,
  }

  icon() {
    return icons.HDOP;
  }

  content() {
    const { gpsHdop } = this.props;
    return `${(gpsHdop / 100).toFixed(1)}`;
  }
}
