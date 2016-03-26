import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLongitude extends SimpleSettings {
  name = 'simple settings';
}

export default bindStateForComponent('gpsLongitude', GPSLongitude);
