import React, { Component, PropTypes } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import Label from '../Label';

export default class ParameterPanels extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  _onChange(index, value) {
    const visibleOn = value ?
      this.props.visibleOn | Math.pow(2, index) :
      this.props.visibleOn ^ Math.pow(2, index);

    this.props.setVisibleOn(visibleOn);
  }

  render() {
    const { numberOfPanels, visibleOn } = this.props;

    return (
      <span>
        <div>
          <Label text="visible on panels"/>
        </div>
        <div>
          {[...Array(numberOfPanels)].map((_, i) =>
            <span key={i} style={{ display: 'inline-block', 'marginRight': '10px' }}>
              <Checkbox
                checked={(visibleOn & Math.pow(2, i)) !== 0}
                label={i + 1}
                onChange={this._onChange.bind(this, i)}
              />
            </span>
          )}
        </div>
      </span>
    );
  }
}
