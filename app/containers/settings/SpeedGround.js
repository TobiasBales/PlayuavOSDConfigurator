import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class SpeedGround extends SimpleSettings {
  name = 'speed ground';
}

export default bindStateForComponent('speedGround', SpeedGround);
