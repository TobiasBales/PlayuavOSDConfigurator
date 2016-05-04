import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class RelativeAltitude extends SimpleSettings {
  name = 'relative altitude';
}

export default bindStateForComponent('relativeAltitude', RelativeAltitude);
