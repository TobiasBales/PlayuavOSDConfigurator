import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class TotalTrip extends SimpleSettings {
  name = 'total trip';
}

export default bindStateForComponent('totalTrip', TotalTrip);
