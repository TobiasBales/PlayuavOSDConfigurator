import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class Startup extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      versionSplashMilliseconds: CustomPropTypes.value(PropTypes.number.isRequired).isRequired
    }).isRequired,
    setVersionSplashMilliseconds: PropTypes.func.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }
  
  _setValue(key, value) {
    this.props.setValue('switching', key, parseInt(value, 10));
  }  
  
  render() {
    const { versionSplashMilliseconds } = this.props.parameters;
    const { setVersionSplashMilliseconds } = this.props;

    return (
      <Parameters.ParameterList name="startup">
      
        <Column width={50}>
          <Input type="number" label="Version splash milliseconds"
            onChange={this._setValue('versionSplashMilliseconds')} value={versionSplashMilliseconds}
          />      
      
        </Column>
      </Parameters.ParameterList>
    );
  }
}
