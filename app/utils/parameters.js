import { connect } from 'react-redux';
import Immutable from 'immutable';
import * as ParameterActions from '../actions/parameters';

function mapStateToProps(parameterName, state) {
  let parameters = Immutable.fromJS({});
  if (parameterName) {
    parameters = state.parameters.get(parameterName).reduce((newParams, _, key) => {
      const path = [parameterName, key];
      const value = {
        value: state.parameters.getIn(path),
        originalValue: state.parameters.getIn(['originalState', ...path]),
      };
      return newParams.update(key, () => Immutable.fromJS(value));
    }, Immutable.fromJS({}));
  }
  return {
    state: Immutable.fromJS(state.parameters),
    parameters,
    numberOfPanels: state.parameters.get('video').get('maxPanels'),
  };
}

function mapDispatchToProps(parameterName, dispatch) {
  return {
    setAlarm: (alarm) => {
      dispatch(ParameterActions.setAlarm(parameterName, alarm));
    },
    setAlarmEnabled: (alarm, enabled) => {
      dispatch(ParameterActions.setAlarmEnabled(parameterName, alarm, enabled));
    },
    setAlarmValue: (alarm, value) => {
      dispatch(ParameterActions.setAlarmValue(parameterName, alarm, value));
    },
    setAsBaseState: (state) => {
      dispatch(ParameterActions.setAsBaseState(state));
    },
    setBaudRate: (baudRate) => {
      dispatch(ParameterActions.setBaudRate(parameterName, baudRate));
    },
    setChannel: (key, channel) => {
      dispatch(ParameterActions.setChannel(parameterName, key, channel));
    },
    setFcType: (fcType) => {
      dispatch(ParameterActions.setFcType(parameterName, fcType));
    },
    setFontSize: (fontSize) => {
      dispatch(ParameterActions.setFontSize(parameterName, fontSize));
    },
    setHAlignment: (hAlignment) => {
      dispatch(ParameterActions.setHAlignment(parameterName, hAlignment));
    },
    setMax: (max) => {
      dispatch(ParameterActions.setMax(parameterName, max));
    },
    setMaxPanels: (maxPanels) => {
      dispatch(ParameterActions.setMaxPanels(parameterName, parseInt(maxPanels, 10)));
    },
    setMin: (min) => {
      dispatch(ParameterActions.setMin(parameterName, min));
    },
    setOffset: (x, y) => {
      dispatch(ParameterActions.setOffset(parameterName, x, y));
    },
    setPanel: (panel) => {
      dispatch(ParameterActions.setPanel(parameterName, panel));
    },
    setParamsFromEEPROM: (eepromData) => {
      dispatch(ParameterActions.setParamsFromEEPROM(eepromData));
    },
    setPosition: (x, y) => {
      dispatch(ParameterActions.setPosition(parameterName, x, y));
    },
    setParameterPosition: (parameter, x, y) => {
      dispatch(ParameterActions.setPosition(parameter, x, y));
    },
    setRadius: (key, radius) => {
      dispatch(ParameterActions.setRadius(parameterName, key, radius));
    },
    setRaw: (raw) => {
      dispatch(ParameterActions.setRaw(parameterName, raw));
    },
    setScale: (scale) => {
      dispatch(ParameterActions.setScale(parameterName, scale));
    },
    setScaleAlignment: (scaleAlignment) => {
      dispatch(ParameterActions.setScaleAlignment(parameterName, scaleAlignment));
    },
    setScaleEnabled: (scaleEnabled) => {
      dispatch(ParameterActions.setScaleEnabled(parameterName, scaleEnabled));
    },
    setScaleType: (scaleType) => {
      dispatch(ParameterActions.setScaleType(parameterName, scaleType));
    },
    setType: (typeValue) => {
      dispatch(ParameterActions.setType(parameterName, typeValue));
    },
    setUnits: (units) => {
      dispatch(ParameterActions.setUnits(parameterName, units));
    },
    setVAlignment: (vAlignment) => {
      dispatch(ParameterActions.setVAlignment(parameterName, vAlignment));
    },
    setValue: (key, value) => {
      dispatch(ParameterActions.setValue(parameterName, key, value));
    },
    setMode: (prefix, mode) => {
      dispatch(ParameterActions.setMode(parameterName, prefix, mode));
    },
    setVisibleOn: (visibleOn) => {
      dispatch(ParameterActions.setVisibleOn(parameterName, visibleOn));
    },
  };
}

export function bindStateForComponent(namespace, component) {
  return connect(mapStateToProps.bind(null, namespace),
    mapDispatchToProps.bind(null, namespace))(component);
}
