import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class LinkQuality extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    raw: PropTypes.number.isRequired,
    linkQuality: PropTypes.number.isRequired,
  }

  content() {
    const { min, max, raw } = this.props;
    let { linkQuality } = this.props;
    let content = '';

    if (raw === 0) {
      if ((max - min) > 0) {
        linkQuality = (linkQuality - min) / (max - min) * 100;
      }

      linkQuality = Math.max(0, linkQuality);
      content = `LIQU ${linkQuality.toFixed(0)}%`;
    } else {
      content = `LIQU ${linkQuality.toFixed(0)}`;
    }
    return content;
  }
}
