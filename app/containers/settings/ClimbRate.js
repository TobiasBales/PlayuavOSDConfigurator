import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../../components/parameters';
import Column from '../../components/Column';
import { bindStateForComponent } from '../../utils/parameters';

class ClimbRate extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      fontSize: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
    }).isRequired,
    numberOfPanels: PropTypes.number.isRequired,
    setFontSize: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const {
      numberOfPanels,
      setFontSize,
      setPosition,
      setVisibleOn,
    } = this.props;
    const {
      fontSize,
      positionX,
      positionY,
      visibleOn,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="climb rate">
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.FontSize fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn}
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('climbRate', ClimbRate);
