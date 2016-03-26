import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Gps2Status extends SimpleSettings {
  name = 'gps 2 status';
}

export default bindStateForComponent('gps2Status', Gps2Status);
