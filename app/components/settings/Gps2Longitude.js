import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Gps2Longitude extends SimpleSettings {
  name = 'gps 2 longitude';
}

export default bindStateForComponent('gps2Longitude', Gps2Longitude);
