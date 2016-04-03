import React, { Component } from 'react';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import Settings from '../containers/settings';

export default class ParametersModule extends Component {
  state = { index: 0 };

  _onChange = (index) => {
    this.setState({ index });
  };

  render() {
    return (
      <Tabs index={this.state.index} onChange={this._onChange}>
        <Tab label="General">
          <Settings.Alarms />
          <Settings.Video />
          <Settings.Switching />
          <Settings.Serial />
        </Tab>
        <Tab label="Power system">
          <Settings.BatteryVoltage />
          <Settings.BatteryCurrent />
          <Settings.BatteryConsumed />
          <Settings.BatteryRemaining />
        </Tab>
        <Tab label="position">
          <Settings.AbsoluteAltitude />
          <Settings.RelativeAltitude />
          <Settings.AltitudeScale />
          <Settings.HomeDistance />
          <Settings.Radar />
          <Settings.Map />
          <Settings.Compass />
        </Tab>
        <Tab label="avionics">
          <Settings.SpeedAir />
          <Settings.SpeedGround />
          <Settings.SpeedScale />
          <Settings.TotalTrip />
          <Settings.ArtificialHorizont />
          <Settings.Attitude3d />
          <Settings.ClimbRate />
          <Settings.Wind />
          <Settings.Efficiency />
        </Tab>
        <Tab label="Flight controller">
          <Settings.Time />
          <Settings.ArmState />
          <Settings.FlightMode />
          <Settings.Throttle />
          <Settings.Rssi />
          <Settings.WPDistance />
        </Tab>
        <Tab label="Gps">
          <Settings.GpsStatus />
          <Settings.GpsHdop />
          <Settings.GpsLatitude />
          <Settings.GpsLongitude />
          <Settings.Gps2Status />
          <Settings.Gps2Hdop />
          <Settings.Gps2Latitude />
          <Settings.Gps2Longitude />
        </Tab>
      </Tabs>
    );
  }
}
