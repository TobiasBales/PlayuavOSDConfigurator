import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLongitude extends SimpleSettings {
  name = 'gps longitude';
}

export default bindStateForComponent('gpsLongitude', GPSLongitude);
