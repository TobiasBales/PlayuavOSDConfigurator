import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class FlightMode extends SimpleSettings {
  name = 'flight mode';
}

export default bindStateForComponent('flightMode', FlightMode);
