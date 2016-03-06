import React, { Component, PropTypes } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import ImmutablePropTypes from 'react-immutable-proptypes';

export default class ParameterPanels extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    visibleOn: ImmutablePropTypes.listOf(PropTypes.bool).isRequired,
    setVisibleOn: PropTypes.func.isRequired
  }

  _onChange(index, value) {
    this.props.setVisibleOn(this.props.visibleOn.set(index, value));
  }

  render() {
    const { numberOfPanels, visibleOn } = this.props;

    return (
      <span>
        <div>
          <label className="label">visible on panels</label>
        </div>
        <div>
          {[...Array(numberOfPanels)].map((_, i) =>
            <span key={i} style={{ display: 'inline-block', 'marginRight': '10px' }}>
              <Checkbox
                checked={visibleOn.get(i)}
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
