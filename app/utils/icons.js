import small from '../data/icons/small';
import medium from '../data/icons/medium';

function getFont(size) {
  switch (size) {
    case 0:
      return small;
    case 1:
      return medium;
    case 2:
      // TODO: pixel icons for large font
      return medium;
    default:
      throw new Error('trying to get unsupported icon font for size', size);
  }
}

export default { getFont };
