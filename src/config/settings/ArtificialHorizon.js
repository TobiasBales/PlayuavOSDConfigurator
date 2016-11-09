import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class ArtificialHorizon extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scale: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      type: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  _setType = (type) => {
    this.props.setType('artificialHorizon', type);
  }

  render() {
    const {
      setPosition,
      setScale,
      setVisibleOn,
    } = this.props;
    const {
      numberOfPanels,
      positionX,
      positionY,
      scale,
      type,
      visibleOn,
    } = this.props.parameters;

    const typeOptions = [{ value: 0, label: 'mission planner' }, { value: 1, label: 'simple ' }];

    return (
      <Parameters.ParameterList name="artifical horizon">
        <Parameters.Position labelX="position x" labelY="position y" name="artificialHorizon"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50}>
          <Parameters.Scale name="artificialHorizon" setScale={setScale} scale={scale} />
        </Column>
        <Column width={50}>
          <Parameters.Select label="type" setValue={this._setType}
            options={typeOptions} value={type}
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn} name="artificialHorizon"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
