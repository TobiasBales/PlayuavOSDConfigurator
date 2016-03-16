import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class ArmState extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    armState: PropTypes.number.isRequired,
  }
  content() {
    return this.props.armState ? 'ARMED' : 'DISARMED';
  }
}
