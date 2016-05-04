import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class SpeedAir extends SimpleSettings {
  name = 'speed air';
}

export default bindStateForComponent('speedAir', SpeedAir);
