import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class AbsoluteAltitude extends SimpleSettings {
  name = 'absolute altitude';
}

export default bindStateForComponent('absoluteAltitude', AbsoluteAltitude);
