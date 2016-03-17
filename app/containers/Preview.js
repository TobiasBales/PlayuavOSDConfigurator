import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Card, CardText } from 'react-toolbox/lib/card';
import Dropdown from 'react-toolbox/lib/dropdown';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import { bindStateForComponent } from '../utils/parameters';
import Column from '../components/Column';
import Previews from '../components/preview';
import Label from '../components/Label';
import background from '../../static/background.png';

class Preview extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      panel: PropTypes.number.isRequired,
    }).isRequired,
    setAlarm: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
    state: ImmutablePropTypes.map.isRequired,
  }

  _onPanelChange = (panel) => {
    this.props.setPanel(panel);
  }

  _onAlarmChange = (alarm) => {
    this.props.setAlarm(alarm);
  }

  render() {
    const panel = this.props.parameters.get('panel');
    const alarm = this.props.parameters.get('alarm');
    const {
      absoluteAltitude, alarms, altitudeScale, armState, attitudeMp, batteryConsumed,
      batteryCurrent, batteryRemaining, batteryVoltage, climbRate, compass, flightMode,
      gpsHdop, gpsLatitude, gpsLongitude, gpsStatus, gps2Hdop, gps2Latitude, gps2Longitude,
      gps2Status, homeDistance, radar, relativeAltitude, rssi, speedAir, speedScale,
      speedGround, throttle, time, totalTrip, wpDistance, wind,
    } = this.props.state;
    const units = this.props.state.get('video').get('units');
    const videoMode = this.props.state.get('video').get('videoMode');
    const rssiType = this.props.state.get('rssi').get('type');
    const numberOfPanels = this.props.state.get('video').get('maxPanels');
    const screenWidth = videoMode === 0 ? 351 : 359;
    const screenHeight = videoMode === 0 ? 239 : 265;
    const style = { height: screenHeight, width: screenWidth };
    const fcStatus = {
      absoluteAltitude: 2814,
      alarm,
      armState: 1,
      batteryConsumed: 1344,
      batteryCurrent: 8.64,
      batteryRemaining: 83.2,
      batteryVoltage: 12.4,
      climbRate: 3.8,
      flightMode: 0,
      gpsHdop: 57,
      gpsLatitude: 484330500,
      gpsLongitude: -46790000,
      gpsSattelites: 14,
      gpsStatus: 3,
      heading: 30,
      homeBearing: 163,
      homeDistance: 18135,
      panel,
      pitch: 10,
      relativeAltitude: 138,
      roll: -4,
      rssi: rssiType === 0 ? 233 : 1830,
      speedAir: 16.9,
      speedGround: 18.3,
      throttle: 43,
      timeSinceArming: 903618,
      timeSinceHeartbeat: 0,
      timeSinceStartup: 3823541,
      totalTrip: 23947,
      vehicleType: 1,
      windDirection: 0,
      windSpeed: 18,
      wpBearing: 3,
      wpDistance: 315,
      wpNumber: 3,
      yaw: 12,
    };

    const alarmOptions = [
      { value: 0, label: 'none' }, { value: 1, label: 'gps' },
      { value: 2, label: 'low battery' }, { value: 3, label: 'speed low' },
      { value: 4, label: 'over speed' }, { value: 5, label: 'low alt' },
      { value: 6, label: 'high alt' }
    ];

    return (
      <Card className="preview-card">
        <CardText>
          <div className="preview" style={style}>
            <img src={background} />
            <Previews.AbsoluteAltitude {...absoluteAltitude.toJS()} {...fcStatus} units={units} />
            <Previews.AltitudeScale {...altitudeScale.toJS()} {...fcStatus} units={units} />
            <Previews.Alarms {...alarms.toJS()} {...fcStatus} visibleOn={255} />
            <Previews.ArmState {...armState.toJS()} {...fcStatus} />
            <Previews.AttitudeMp {...attitudeMp.toJS()} {...fcStatus} />
            <Previews.BatteryConsumed {...batteryConsumed.toJS()} {...fcStatus} />
            <Previews.BatteryCurrent {...batteryCurrent.toJS()} {...fcStatus} />
            <Previews.BatteryRemaining {...batteryRemaining.toJS()} {...fcStatus} />
            <Previews.BatteryVoltage {...batteryVoltage.toJS()} {...fcStatus} />
            <Previews.ClimbRate {...climbRate.toJS()} {...fcStatus} />
            <Previews.Compass {...compass.toJS()} {...fcStatus} />
            <Previews.FlightMode {...flightMode.toJS()} {...fcStatus} />
            <Previews.GpsHdop {...gps2Hdop.toJS()} {...fcStatus} />
            <Previews.GpsHdop {...gpsHdop.toJS()} {...fcStatus} />
            <Previews.GpsLatitude {...gps2Latitude.toJS()} {...fcStatus} />
            <Previews.GpsLatitude {...gpsLatitude.toJS()} {...fcStatus} />
            <Previews.GpsLongitude {...gps2Longitude.toJS()} {...fcStatus} />
            <Previews.GpsLongitude {...gpsLongitude.toJS()} {...fcStatus} />
            <Previews.GpsStatus {...gps2Status.toJS()} {...fcStatus} />
            <Previews.GpsStatus {...gpsStatus.toJS()} {...fcStatus} />
            <Previews.HomeDistance {...homeDistance.toJS()} {...fcStatus} units={units} />
            <Previews.Radar {...radar.toJS()} {...fcStatus} />
            <Previews.RelativeAltitude {...relativeAltitude.toJS()} {...fcStatus} units={units} />
            <Previews.Rssi {...rssi.toJS()} {...fcStatus} />
            <Previews.SpeedAir {...speedAir.toJS()} {...fcStatus} units={units} />
            <Previews.SpeedGround {...speedGround.toJS()} {...fcStatus} units={units} />
            <Previews.SpeedScale {...speedScale.toJS()} {...fcStatus} units={units} />
            <Previews.Throttle {...throttle.toJS()} {...fcStatus} />
            <Previews.Time {...time.toJS()} {...fcStatus} />
            <Previews.TotalTrip {...totalTrip.toJS()} {...fcStatus} units={units} />
            <Previews.WpDistance {...wpDistance.toJS()} {...fcStatus} units={units} />
            <Previews.Wind {...wind.toJS()} {...fcStatus} units={units} />
          </div>
          <Column width={50}>
            <Label text="panel" />
            <RadioGroup name="panel" className="panel" value={panel} onChange={this._onPanelChange}>
              {[...Array(numberOfPanels)].map((_, i) =>
                <RadioButton key={i} label={(i + 1).toFixed(0)} value={i} />
              )}
            </RadioGroup>
          </Column>
          <Column width={50}>
            <Dropdown label="alarm" source={alarmOptions}
              value={alarm} onChange={this._onAlarmChange}
            />
          </Column>
        </CardText>
      </Card>
    );
  }
}

export default bindStateForComponent('preview', Preview);
