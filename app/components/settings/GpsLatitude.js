import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLatitude extends SimpleSettings {
  name = 'gps latitude';
}

export default bindStateForComponent('gpsLatitude', GPSLatitude);
