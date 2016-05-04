import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class HomeDistance extends SimpleSettings {
  name = 'home distance';
}

export default bindStateForComponent('homeDistance', HomeDistance);
