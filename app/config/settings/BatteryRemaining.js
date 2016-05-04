import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryRemaining extends SimpleSettings {
  name = 'battery remaining';
}

export default bindStateForComponent('batteryRemaining', BatteryRemaining);
