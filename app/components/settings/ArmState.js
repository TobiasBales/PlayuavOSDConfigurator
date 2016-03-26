import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class ArmState extends SimpleSettings {
  name = 'arm state';
}

export default bindStateForComponent('armState', ArmState);
