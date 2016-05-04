import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import * as icons from '../../data/icons/lookup';

const NO_GPS = 0;
const NO_FIX = 1;
const FIX_2D = 2;
const FIX_3D = 3;
const FIX_3D_DGPS = 4;

export default class GpsStatus extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    gpsSattelites: PropTypes.number.isRequired,
    gpsStatus: PropTypes.number.isRequired,
  }

  icon() {
    return icons.GPS;
  }

  content() {
    const { gpsSattelites, gpsStatus } = this.props;
    let content = '';

    switch (gpsStatus) {
      case NO_GPS:
        content = 'NOFIX';
        break;
      case NO_FIX:
        content = 'NOFIX';
        break;
      case FIX_2D:
        content = `${gpsSattelites}`;
        break;
      case FIX_3D:
        content = `${gpsSattelites}`;
        break;
      case FIX_3D_DGPS:
        content = `${gpsSattelites}`;
        break;
      default:
        content = 'unknown';
    }
    return content;
  }
}
