import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Gps2Hdop extends SimpleSettings {
  name = 'gps 2 hdop';
}

export default bindStateForComponent('gps2Hdop', Gps2Hdop);
