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
      <Tabs className='parameters' index={this.state.index} onChange={this._onChange}>
        <Tab label="General">
          <Settings.Alarms/>
          <Settings.Video/>
          <Settings.Switching/>
          <Settings.Serial/>
        </Tab>
        <Tab label="Power system">
          <Settings.BatteryVoltage/>
          <Settings.BatteryCurrent/>
          <Settings.BatteryConsumed/>
          <Settings.BatteryRemaining/>
        </Tab>
        <Tab label="position">
          <Settings.AbsoluteAltitude/>
          <Settings.RelativeAltitude/>
          <Settings.HomeDistance/>
          <Settings.AltitudeScale/>
          <Settings.Radar/>
          <Settings.Map/>
          <Settings.Compass/>
        </Tab>
        <Tab label="avionics">
          <Settings.SpeedAir/>
          <Settings.SpeedGround/>
          <Settings.SpeedScale/>
          <Settings.TotalTrip/>
          <Settings.AttitudeMp/>
          <Settings.Attitude3d/>
          <Settings.Throttle/>
          <Settings.ClimbRate/>
          <Settings.Wind/>
        </Tab>
        <Tab label="Flight controller">
          <Settings.Time/>
          <Settings.ArmState/>
          <Settings.FlightMode/>
          <Settings.WPDistance/>
          <Settings.Rssi/>
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
