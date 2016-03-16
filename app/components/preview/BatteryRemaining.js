import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class BatteryRemaining extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryCurrent: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
  }

  content() {
    const { batteryRemaining, fontSize } = this.props;

    let content = '';
    if (fontSize === 0) {
      content = `${batteryRemaining.toFixed(0)}/`;
    } else {
      content = `${batteryRemaining.toFixed(0)}%%`;
    }

    return content;
  }
}
