import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class FlightMode extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    vehicleType: PropTypes.number.isRequired,
    flightMode: PropTypes.number.isRequired,
  }

  content() {
    const { flightMode, vehicleType } = this.props;

    switch (vehicleType) {
      case 0:
        switch (flightMode) {
          case 0: return 'STAB';
          case 1: return 'ACRO';
          case 2: return 'ALTH';
          case 3: return 'AUTO';
          case 4: return 'GUID';
          case 5: return 'LOIT';
          case 6: return 'RETL';
          case 7: return 'CIRC';
          case 8: return 'POSI';
          case 9: return 'LAND';
          case 10: return 'OFLO';
          case 11: return 'DRIF';
          case 13: return 'SPRT';
          case 14: return 'FLIP';
          case 15: return 'ATUN';
          case 16: return 'POSH';
          case 17: return 'BRAK';
          default: return 'unknown';
        }
        break;
      case 1:
        switch (flightMode) {
          case 0: return 'MANU';
          case 1: return 'CIRC';
          case 2: return 'STAB';
          case 3: return 'TRNG';
          case 4: return 'ACRO';
          case 5: return 'FBWA';
          case 6: return 'FBWB';
          case 7: return 'CRUI';
          case 8: return 'ATUN';
          case 10: return 'AUTO';
          case 11: return 'RETL';
          case 12: return 'LOIT';
          case 15: return 'GUID';
          case 16: return 'INIT';
          default: return 'unknown';
        }
        break;
      default: return 'unknown';
    }
  }
}
