import React, { Component, PropTypes } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import Label from '../Label';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class ParameterPanels extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
    visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
  }

  _onChange(index, value) {
    const visibleOn = value ?
      this.props.visibleOn.get('value') | Math.pow(2, index) :
      this.props.visibleOn.get('value') ^ Math.pow(2, index);

    this.props.setVisibleOn(visibleOn);
  }

  render() {
    const { numberOfPanels, visibleOn } = this.props;
    const classes = classNames({
      modified: visibleOn.get('value') !== visibleOn.get('originalValue')
    });

    return (
      <div className={classes}>
        <div>
          <Label text="visible on panels" />
        </div>
        <div>
          {[...Array(numberOfPanels)].map((_, i) =>
            <span key={i} style={{ display: 'inline-block', marginRight: '10px' }}>
              <Checkbox
                checked={(visibleOn.get('value') & Math.pow(2, i)) !== 0}
                label={i + 1}
                onChange={this._onChange.bind(this, i)}
              />
            </span>
          )}
        </div>
      </div>
    );
  }
}
