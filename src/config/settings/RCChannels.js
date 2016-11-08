import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

// Cribbed from Throttle.js originally
export default class RCChannels extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      //scaleEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      //scaleType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    //setScaleEnabled: PropTypes.func.isRequired,
    //setScaleType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

 /*
  _setScaleEnabled = (enabled) => {
    this.props.setScaleEnabled('throttle', enabled);
  }

  _setScaleType = (type) => {
    this.props.setScaleType('throttle', type);
  }
*/  

  render() {
    //alert('hello');
    const { setPosition, setVisibleOn } = this.props;
    const {
      numberOfPanels, positionX, positionY, visibleOn
    } = this.props.parameters;
    /*
    const scaleEnabledOptions = [
      { value: 0, label: 'number' }, { value: 1, label: 'scale' },
    ];
    const scaleTypeOptions = [
      { value: 0, label: 'vertical' }, { value: 1, label: 'horizontal' }
    ];
    */
    return (
      <Parameters.ParameterList name="rc channels">
        <Parameters.Position labelX="position x" labelY="position y" name="rcChannels"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Parameters.VisibleOn visibleOn={visibleOn} name="rcChannels"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
