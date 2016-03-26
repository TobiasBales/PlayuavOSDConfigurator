import React, { Component, PropTypes } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../../components/parameters';
import Column from '../../components/Column';
import { bindStateForComponent } from '../../utils/parameters';

class Map extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    parameters: ImmutablePropTypes.contains({
      fontSize: PropTypes.number.isRequired,
      hAlignment: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      vAlignment: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setRadius: PropTypes.func.isRequired,
    setVAlignment: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const { fontSize, radius, vAlignment, hAlignment, visibleOn } = this.props.parameters;
    const {
      setFontSize, setRadius, setVAlignment, setHAlignment, setVisibleOn, numberOfPanels
    } = this.props;

    return (
      <Parameters.ParameterList name="map">
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.VerticalAlignment vAlignment={vAlignment} setVAlignment={setVAlignment} />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.HorizontalAlignment hAlignment={hAlignment} setHAlignment={setHAlignment} />
        </Column>
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.FontSize fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.Radius label="radius" radius={radius}
            radiusKey="radius" setRadius={setRadius}
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn}
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('map', Map);
