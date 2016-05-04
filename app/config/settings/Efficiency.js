import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryCurrent extends SimpleSettings {
  name = 'efficiency';
}

export default bindStateForComponent('efficiency', BatteryCurrent);
