import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class WPDistance extends SimpleSettings {
  name = 'way-point distance';
}

export default bindStateForComponent('wpDistance', WPDistance);
