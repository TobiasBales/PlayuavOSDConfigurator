import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../../components/parameters';
import Column from '../../components/Column';
import { bindStateForComponent } from '../../utils/parameters';

class Radar extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    parameters: ImmutablePropTypes.contains({
      homeRadius: PropTypes.number.isRequired,
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
      wpRadius: PropTypes.number.isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setRadius: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const {
      numberOfPanels,
      setPosition,
      setRadius,
      setVisibleOn,
    } = this.props;
    const {
      homeRadius,
      positionX,
      positionY,
      radius,
      visibleOn,
      wpRadius,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="radar">
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={33} style={{ paddingRight: '5px' }}>
          <Parameters.Radius label="radius" radiusKey="radius"
            radius={radius} setRadius={setRadius}
          />
        </Column>
        <Column width={33} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Parameters.Radius label="home radius" radiusKey="homeRadius"
            radius={homeRadius} setRadius={setRadius}
          />
        </Column>
        <Column width={33} style={{ paddingLeft: '5px' }}>
          <Parameters.Radius label="wp radius" radiusKey="wpRadius"
            radius={wpRadius} setRadius={setRadius}
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn}
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('radar', Radar);
