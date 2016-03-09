import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Parameters from '../Parameters';
import Column from '../Column';
import { bindStateForComponent } from '../../utils/parameters';

class Compass extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    parameters: ImmutablePropTypes.contains({
      positionX: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  _setPosition = (position) => {
    this.props.setPosition(parseInt(position, 10));
  }

  render() {
    const {
      numberOfPanels,
      setVisibleOn,
    } = this.props;
    const {
      positionX,
      visibleOn,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="compass">
        <Column width={50} style={{ 'paddingRight': '5px' }}>
          <Input type="number" label="position x" value={positionX} onChange={this._setPosition} />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn} setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels} />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('compass', Compass);
