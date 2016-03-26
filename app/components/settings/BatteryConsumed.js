import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryConsumed extends SimpleSettings {
  name = 'battery consumed';
}

export default bindStateForComponent('batteryConsumed', BatteryConsumed);
