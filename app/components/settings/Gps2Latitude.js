import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPS2Latitude extends SimpleSettings {
  name = 'gps 2 latitude';
}

export default bindStateForComponent('gps2Latitude', GPS2Latitude);
