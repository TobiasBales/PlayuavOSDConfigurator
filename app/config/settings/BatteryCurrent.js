import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryCurrent extends SimpleSettings {
  name = 'battery current';
}

export default bindStateForComponent('batteryCurrent', BatteryCurrent);
