import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryVoltage extends SimpleSettings {
  name = 'battery voltage';
}

export default bindStateForComponent('batteryVoltage', BatteryVoltage);
