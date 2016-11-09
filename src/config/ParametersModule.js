import React, { Component } from 'react';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import actions from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Settings from './settings';

class ParametersModule extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.map.isRequired,
  }
  state = { index: 0 };

  _onChange = (index) => {
    this.setState({ index });
  };

  _props(name) {
    const params = this.props.parameters;
    const numberOfPanels = params.getIn(['video', 'maxPanels']);

    return params.get(name).reduce((newParams, _, key) => {
      const value = Immutable.fromJS({
        value: params.getIn([name, key]),
        originalValue: params.getIn(['originalState', name, key]),
      });
      return newParams.set(key, value);
    }, Immutable.fromJS({ numberOfPanels }));
  }

  _actions() {
    const componentActions = {};
    Object.keys(this.props).forEach((key) => {
      if (key.startsWith('set')) {
        componentActions[key] = this.props[key];
      }
    });
    return componentActions;
  }

  render() {
    return (
      <Tabs index={this.state.index} onChange={this._onChange}>
        <Tab label="General">
          <Settings.Alarms
            parameters={this._props('alarms')}
            {...this._actions()}
          />
          <Settings.Video
            parameters={this._props('video')}
            {...this._actions()}
          />
          <Settings.Switching
            parameters={this._props('switching')}
            {...this._actions()}
          />
          <Settings.Serial
            parameters={this._props('serial')}
            {...this._actions()}
          />
        </Tab>
        <Tab label="Power system">
          <Settings.BatteryVoltage
            parameters={this._props('batteryVoltage')}
            {...this._actions()}
          />
          <Settings.BatteryCurrent
            parameters={this._props('batteryCurrent')}
            {...this._actions()}
          />
          <Settings.BatteryConsumed
            parameters={this._props('batteryConsumed')}
            {...this._actions()}
          />
          <Settings.BatteryRemaining
            parameters={this._props('batteryRemaining')}
            {...this._actions()}
          />
          <Settings.Watt
            parameters={this._props('watt')}
            {...this._actions()}
          />
        </Tab>
        <Tab label="position">
          <Settings.AbsoluteAltitude
            parameters={this._props('absoluteAltitude')}
            {...this._actions()}
          />
          <Settings.RelativeAltitude
            parameters={this._props('relativeAltitude')}
            {...this._actions()}
          />
          <Settings.AltitudeScale
            parameters={this._props('altitudeScale')}
            {...this._actions()}
          />
          <Settings.HomeDistance
            parameters={this._props('homeDistance')}
            {...this._actions()}
          />
          <Settings.HomeDirection
            parameters={this._props('homeDirection')}
            {...this._actions()}
          />
          <Settings.Radar
            parameters={this._props('radar')}
            {...this._actions()}
          />
          <Settings.Map
            parameters={this._props('map')}
            {...this._actions()}
          />
          <Settings.Compass
            parameters={this._props('compass')}
            {...this._actions()}
          />
        </Tab>
        <Tab label="avionics">
          <Settings.SpeedAir
            parameters={this._props('speedAir')}
            {...this._actions()}
          />
          <Settings.SpeedGround
            parameters={this._props('speedGround')}
            {...this._actions()}
          />
          <Settings.SpeedScale
            parameters={this._props('speedScale')}
            {...this._actions()}
          />
          <Settings.TotalTrip
            parameters={this._props('totalTrip')}
            {...this._actions()}
          />
          <Settings.ArtificialHorizon
            parameters={this._props('artificialHorizon')}
            {...this._actions()}
          />
          <Settings.Attitude3d
            parameters={this._props('attitude3d')}
            {...this._actions()}
          />
          <Settings.ClimbRate
            parameters={this._props('climbRate')}
            {...this._actions()}
          />
          <Settings.VarioGraph
            parameters={this._props('varioGraph')}
            {...this._actions()}
          />
          <Settings.Wind
            parameters={this._props('wind')}
            {...this._actions()}
          />
          <Settings.Efficiency
            parameters={this._props('efficiency')}
            {...this._actions()}
          />
        </Tab>
        <Tab label="Flight controller">
          <Settings.Time
            parameters={this._props('time')}
            {...this._actions()}
          />
          <Settings.ArmState
            parameters={this._props('armState')}
            {...this._actions()}
          />
          <Settings.FlightMode
            parameters={this._props('flightMode')}
            {...this._actions()}
          />
          <Settings.Throttle
            parameters={this._props('throttle')}
            {...this._actions()}
          />
          <Settings.Rssi
            parameters={this._props('rssi')}
            {...this._actions()}
          />
          <Settings.LinkQuality
            parameters={this._props('linkQuality')}
            {...this._actions()}
          />
          <Settings.RCChannels
            parameters={this._props('rcChannels')}
            {...this._actions()}
          />
          <Settings.WPDistance
            parameters={this._props('wpDistance')}
            {...this._actions()}
          />
        </Tab>
        <Tab label="Gps">
          <Settings.GpsStatus
            parameters={this._props('gpsStatus')}
            {...this._actions()}
          />
          <Settings.GpsHdop
            parameters={this._props('gpsHdop')}
            {...this._actions()}
          />
          <Settings.GpsLatitude
            parameters={this._props('gpsLatitude')}
            {...this._actions()}
          />
          <Settings.GpsLongitude
            parameters={this._props('gpsLongitude')}
            {...this._actions()}
          />
          <Settings.Gps2Status
            parameters={this._props('gps2Status')}
            {...this._actions()}
          />
          <Settings.Gps2Hdop
            parameters={this._props('gps2Hdop')}
            {...this._actions()}
          />
          <Settings.Gps2Latitude
            parameters={this._props('gps2Latitude')}
            {...this._actions()}
          />
          <Settings.Gps2Longitude
            parameters={this._props('gps2Longitude')}
            {...this._actions()}
          />
          <Settings.HomeLatitude
            parameters={this._props('homeLatitude')}
            {...this._actions()}
          />
          <Settings.HomeLongitude
            parameters={this._props('homeLongitude')}
            {...this._actions()}
          />
        </Tab>
      </Tabs>
    );
  }
}

function mapStateToProps(state) {
  return {
    parameters: state.parameters,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ParametersModule);
