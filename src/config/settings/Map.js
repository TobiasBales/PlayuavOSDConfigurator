import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class Map extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      fontSize: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      hAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      numberOfPanels: PropTypes.number.isRequired,
      radius: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      vAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setRadius: PropTypes.func.isRequired,
    setVAlignment: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const {
      fontSize, radius, vAlignment, hAlignment, visibleOn, numberOfPanels
    } = this.props.parameters;
    const {
      setFontSize, setRadius, setVAlignment, setHAlignment, setVisibleOn
    } = this.props;

    return (
      <Parameters.ParameterList name="map">
        <Column width={50} >
          <Parameters.VerticalAlignment name="map"
            vAlignment={vAlignment} setVAlignment={setVAlignment}
          />
        </Column>
        <Column width={50} >
          <Parameters.HorizontalAlignment hAlignment={hAlignment}
            setHAlignment={setHAlignment} name="map"
          />
        </Column>
        <Column width={50} >
          <Parameters.FontSize name="map" fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50} >
          <Parameters.Radius label="radius" radius={radius}
            radiusKey="radius" setRadius={setRadius} name="map"
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn} name="map"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
