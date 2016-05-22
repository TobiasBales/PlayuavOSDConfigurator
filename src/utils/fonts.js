import small from '../data/fonts/small';
import medium from '../data/fonts/medium';
import large from '../data/fonts/large';

function getFont(size) {
  switch (size) {
    case 0:
      return small;
    case 1:
      return medium;
    case 2:
      return large;
    default:
      throw new Error(`trying to get unsupported font for size ${size}`);
  }
}

export default { getFont };
