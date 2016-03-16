import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class BatteryCurrent extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryCurrent: PropTypes.number.isRequired,
  }

  content() {
    const { batteryCurrent } = this.props;

    return `${batteryCurrent.toFixed(1)}A`;
  }
}
