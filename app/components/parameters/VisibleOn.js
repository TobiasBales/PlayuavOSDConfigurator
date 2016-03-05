import React, { Component, PropTypes } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ParameterPanels extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    panels: ImmutablePropTypes.listOf(PropTypes.bool).isRequired,
    setPanels: PropTypes.func.isRequired
  }

  _onChange(index, value) {
    this.props.setPanels(this.props.panels.set(index, value));
  }

  render() {
    const { numberOfPanels, panels } = this.props;

    return (
      <span>
        <div>
          <label className="label">visible on panels</label>
        </div>
        <div>
          {[...Array(numberOfPanels)].map((_, i) =>
            <span style={{ display: 'inline-block', 'margin-right': '10px' }}>
              <Checkbox
                checked={panels.get(i)}
                label={i + 1}
                key={i}
                onChange={this._onChange.bind(this, i)}
              />
            </span>
          )}
        </div>
      </span>
    );
  }
}
