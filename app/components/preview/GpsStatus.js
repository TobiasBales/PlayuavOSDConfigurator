import { PropTypes } from 'react';
import StringPreview from './StringPreview';

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
        content = `2D-${gpsSattelites}`;
        break;
      case FIX_3D:
        content = `3D-${gpsSattelites}`;
        break;
      case FIX_3D_DGPS:
        content = `D3D-${gpsSattelites}`;
        break;
      default:
        content = 'unknown';
    }
    return content;
  }
}
