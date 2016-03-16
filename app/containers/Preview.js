import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { bindStateForComponent } from '../utils/parameters';
import Previews from '../components/preview';
import background from '../../static/background.png';

class Preview extends Component {
  static propTypes = {
    state: ImmutablePropTypes.map.isRequired,
  }

  render() {
    const {
      absoluteAltitude, armState, batteryConsumed, batteryCurrent, batteryRemaining,
      batteryVoltage, flightMode, gpsHdop, gpsLatitude, gpsLongitude, gpsStatus,
      gps2Hdop, gps2Latitude, gps2Longitude, gps2Status, relativeAltitude, rssi,
      speedAir, speedGround, time, totalTrip,
    } = this.props.state;
    const units = this.props.state.get('video').get('units');
    const videoMode = this.props.state.get('video').get('videoMode');
    const rssiType = this.props.state.get('rssi').get('type');
    const screenWidth = videoMode === 0 ? 351 : 359;
    const screenHeight = videoMode === 0 ? 239 : 265;
    const style = { height: screenHeight, width: screenWidth };
    const fcStatus = {
      absoluteAltitude: 2814,
      armState: 1,
      batteryConsumed: 1344,
      batteryCurrent: 8.64,
      batteryRemaining: 83.2,
      batteryVoltage: 12.4,
      flightMode: 0,
      gpsHdop: 57,
      gpsLatitude: 484330500,
      gpsLongitude: -46790000,
      gpsSattelites: 14,
      gpsStatus: 3,
      panel: 1,
      relativeAltitude: 138,
      timeSinceHeartbeat: 0,
      timeSinceStartup: 3823541,
      rssi: rssiType === 0 ? 233 : 1830,
      speedAir: 16.9,
      speedGround: 18.3,
      timeSinceArming: 903618,
      vehicleType: 1,
      totalTrip: 23947,
    };

    return (
      <div className="preview" style={style}>
        <img src={background} />
        <Previews.AbsoluteAltitude {...absoluteAltitude.toJS()} {...fcStatus} units={units} />
        <Previews.ArmState {...armState.toJS()} {...fcStatus} />
        <Previews.BatteryConsumed {...batteryConsumed.toJS()} {...fcStatus} />
        <Previews.BatteryCurrent {...batteryCurrent.toJS()} {...fcStatus} />
        <Previews.BatteryRemaining {...batteryRemaining.toJS()} {...fcStatus} />
        <Previews.BatteryVoltage {...batteryVoltage.toJS()} {...fcStatus} />
        <Previews.FlightMode {...flightMode.toJS()} {...fcStatus} />
        <Previews.GpsHdop {...gps2Hdop.toJS()} {...fcStatus} />
        <Previews.GpsHdop {...gpsHdop.toJS()} {...fcStatus} />
        <Previews.GpsLatitude {...gps2Latitude.toJS()} {...fcStatus} />
        <Previews.GpsLatitude {...gpsLatitude.toJS()} {...fcStatus} />
        <Previews.GpsLongitude {...gps2Longitude.toJS()} {...fcStatus} />
        <Previews.GpsLongitude {...gpsLongitude.toJS()} {...fcStatus} />
        <Previews.GpsStatus {...gps2Status.toJS()} {...fcStatus} />
        <Previews.GpsStatus {...gpsStatus.toJS()} {...fcStatus} />
        <Previews.RelativeAltitude {...relativeAltitude.toJS()} {...fcStatus} units={units} />
        <Previews.Rssi {...rssi.toJS()} {...fcStatus} />
        <Previews.SpeedAir {...speedAir.toJS()} {...fcStatus} units={units} />
        <Previews.SpeedGround {...speedGround.toJS()} {...fcStatus} units={units} />
        <Previews.Time {...time.toJS()} {...fcStatus} />
        <Previews.TotalTrip {...totalTrip.toJS()} {...fcStatus} units={units} />
      </div>
    );
  }
}
// AltitudeScale
// SpeedScale
// AttitudeMP
// Attitude3D
// Throttle
// total trip
// compass (CWH)
// radar (CWH)
// climb rate
// wind
// map
// warning

export default bindStateForComponent(null, Preview);
