import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class HomeLatitude extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    homeLatitude: PropTypes.number.isRequired,
  }

  content() {
    const { gpsLatitude } = this.props;
    const lat = (gpsLatitude / 10000000).toFixed(5);
    return `H ${lat}`;
  }
}
