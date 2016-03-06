import { connect } from 'react-redux';
import * as ParameterActions from '../actions/parameters';

function mapStateToProps(parameterName, state) {
  return {
    parameters: state.parameters.get(parameterName),
    numberOfPanels: state.parameters.get('numberOfPanels')
  };
}

function mapDispatchToProps(parameterName, dispatch) {
  return {
    setEnabled: (enabled) => {
      dispatch(ParameterActions.setEnabled(parameterName, enabled));
    },
    setFontSize: (fontSize) => {
      dispatch(ParameterActions.setFontSize(parameterName, fontSize));
    },
    setHAlignment: (hAlignment) => {
      dispatch(ParameterActions.setHAlignment(parameterName, hAlignment));
    },
    setPosition: (x, y) => {
      dispatch(ParameterActions.setPosition(parameterName, x, y));
    },
    setPanels: (panels) => {
      dispatch(ParameterActions.setPanels(parameterName, panels));
    },
    setVideoMode: (videoMode) => {
      dispatch(ParameterActions.setVideoMode(parameterName, videoMode));
    }
  };
}

export function bindStateForComponent(namespace, component) {
  return connect(mapStateToProps.bind(null, namespace), mapDispatchToProps.bind(null, namespace))(component);
}
