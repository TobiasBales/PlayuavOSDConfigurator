import React, { Component } from 'react';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import Settings from '../components/Settings';

export default class ParametersModule extends Component {
  state = { index: 0 };

  _onChange = (index) => {
    this.setState({ index });
  };

  render() {
    return (
      <Tabs index={this.state.index} onChange={this._onChange}>
        <Tab label="General">
          <Settings.Video/>
          <Settings.Alarms/>
          <Settings.Switching/>
          <Settings.Serial/>
        </Tab>
        <Tab label="Power system">
          <Settings.BatteryVoltage/>
          <Settings.BatteryCurrent/>
          <Settings.BatteryConsumed/>
          <Settings.BatteryRemaining/>
        </Tab>
        <Tab label="Orientation">
          <Settings.AbsoluteAltitude/>
          <Settings.RelativeAltitude/>
          <Settings.HomeDistance/>
          <Settings.SpeedAir/>
          <Settings.SpeedGround/>
          <Settings.SpeedScale/>
          <Settings.TotalTrip/>
          <Settings.AltitudeScale/>
          <Settings.AttitudeMp/>
          <Settings.Attitude3d/>
          <Settings.Wind/>
          <Settings.Throttle/>
          <Settings.ClimbRate/>
          <Settings.Radar/>
          <Settings.Compass/>
          <Settings.Map/>
        </Tab>
        <Tab label="Flight controller">
          <Settings.ArmState/>
          <Settings.FlightMode/>
          <Settings.Time/>
          <Settings.Rssi/>
          <Settings.WPDistance/>
        </Tab>
        <Tab label="Gps">
          <Settings.GpsStatus/>
          <Settings.GpsLatitude/>
          <Settings.GpsLongitude/>
          <Settings.GpsHdop/>
          <Settings.Gps2Status/>
          <Settings.Gps2Latitude/>
          <Settings.Gps2Longitude/>
          <Settings.Gps2Hdop/>
        </Tab>
      </Tabs>
    );
  }
}
