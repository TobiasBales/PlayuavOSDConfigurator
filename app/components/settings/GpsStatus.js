import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GpsStatus extends SimpleSettings {
  name = 'gps status';
}

export default bindStateForComponent('gpsStatus', GpsStatus);
