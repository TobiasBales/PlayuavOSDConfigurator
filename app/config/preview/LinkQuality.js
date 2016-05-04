import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import * as icons from '../../data/icons/lookup';

export default class LinkQuality extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    raw: PropTypes.number.isRequired,
    linkQuality: PropTypes.number.isRequired,
  }

  icon() {
    return icons.LINK_QUALITY;
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
      content = `${linkQuality.toFixed(0)}%`;
    } else {
      content = `${linkQuality.toFixed(0)}`;
    }
    return content;
  }
}
