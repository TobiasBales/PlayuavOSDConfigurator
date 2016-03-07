import { connect } from 'react-redux';
import * as ParameterActions from '../actions/parameters';


function mapStateToProps(parameterName, state) {
  return {
    parameters: state.parameters.get(parameterName),
    numberOfPanels: state.parameters.get('video').get('maxPanels'),
    connection: state.parameters.get('connection'),
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
    setOffset: (offset) => {
      dispatch(ParameterActions.setOffset(parameterName, offset));
    },
    setPosition: (position) => {
      dispatch(ParameterActions.setPosition(parameterName, position));
    },
    setVisibleOn: (visibleOn) => {
      dispatch(ParameterActions.setVisibleOn(parameterName, visibleOn));
    },
    setVideoMode: (videoMode) => {
      dispatch(ParameterActions.setVideoMode(parameterName, videoMode));
    },
    setUnits: (units) => {
      dispatch(ParameterActions.setUnits(parameterName, units));
    },
  };
}

export function bindStateForComponent(namespace, component) {
  return connect(mapStateToProps.bind(null, namespace), mapDispatchToProps.bind(null, namespace))(component);
}
