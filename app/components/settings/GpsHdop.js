import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GpsHdop extends SimpleSettings {
  name = 'gps hdop';
}

export default bindStateForComponent('gpsHdop', GpsHdop);
