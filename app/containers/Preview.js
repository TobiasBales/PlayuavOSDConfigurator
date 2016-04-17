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
import CustomPropTypes from '../utils/PropTypes';

class Preview extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      panel: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setAlarm: PropTypes.func.isRequired,
    setPanel: PropTypes.func.isRequired,
    setParameterPosition: PropTypes.func.isRequired,
    state: ImmutablePropTypes.map.isRequired,
  }

  _onPanelChange = (panel) => {
    this.props.setPanel(panel);
  }

  _onAlarmChange = (alarm) => {
    this.props.setAlarm(alarm);
  }

  render() {
    const panel = this.props.parameters.get('panel').get('value');
    const alarm = this.props.parameters.get('alarm').get('value');
    const {
      absoluteAltitude, alarms, altitudeScale, armState, artificialHorizont, batteryConsumed,
      batteryCurrent, batteryRemaining, batteryVoltage, climbRate, compass, efficiency,
      flightMode, linkQuality, gpsHdop, gpsLatitude, gpsLongitude, gpsStatus, gps2Hdop,
      gps2Latitude, gps2Longitude, gps2Status, homeDistance, radar, relativeAltitude,
      rssi, speedAir, speedScale, speedGround, throttle, time, totalTrip, wpDistance, wind,
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
      linkQuality: 1970,
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

    const setPosition = (parameter) =>
      (x, y) => this.props.setParameterPosition(parameter, x, y);

    return (
      <Card className="preview-card">
        <CardText>
          <div className="preview" style={style}>
            <img src={background} />
            <Previews.AbsoluteAltitude {...absoluteAltitude.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('absoluteAltitude')}
            />
            <Previews.AltitudeScale {...altitudeScale.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('altitudeScale')}
            />
            <Previews.Alarms {...alarms.toJS()} {...fcStatus} visibleOn={255}
              setPosition={setPosition('alarms')}
            />
            <Previews.ArmState {...armState.toJS()} {...fcStatus}
              setPosition={setPosition('armState')}
            />
            <Previews.ArtificialHorizont {...artificialHorizont.toJS()} {...fcStatus}
              setPosition={setPosition('artificialHorizont')}
            />
            <Previews.BatteryConsumed {...batteryConsumed.toJS()} {...fcStatus}
              setPosition={setPosition('batteryConsumed')}
            />
            <Previews.BatteryCurrent {...batteryCurrent.toJS()} {...fcStatus}
              setPosition={setPosition('batteryCurrent')}
            />
            <Previews.BatteryRemaining {...batteryRemaining.toJS()} {...fcStatus}
              setPosition={setPosition('batteryRemaining')}
            />
            <Previews.BatteryVoltage {...batteryVoltage.toJS()} {...fcStatus}
              setPosition={setPosition('batteryVoltage')}
            />
            <Previews.ClimbRate {...climbRate.toJS()} {...fcStatus}
              setPosition={setPosition('climbRate')}
            />
            <Previews.Compass {...compass.toJS()} {...fcStatus}
              setPosition={setPosition('compass')}
            />
            <Previews.Efficiency {...efficiency.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('compass')}
            />
            <Previews.FlightMode {...flightMode.toJS()} {...fcStatus}
              setPosition={setPosition('flightMode')}
            />
            <Previews.GpsHdop {...gps2Hdop.toJS()} {...fcStatus}
              setPosition={setPosition('gps2Hdop')}
            />
            <Previews.GpsHdop {...gpsHdop.toJS()} {...fcStatus}
              setPosition={setPosition('gpsHdop')}
            />
            <Previews.GpsLatitude {...gps2Latitude.toJS()} {...fcStatus}
              setPosition={setPosition('gps2Latitude')}
            />
            <Previews.GpsLatitude {...gpsLatitude.toJS()} {...fcStatus}
              setPosition={setPosition('gpsLatitude')}
            />
            <Previews.GpsLongitude {...gps2Longitude.toJS()} {...fcStatus}
              setPosition={setPosition('gps2Longitude')}
            />
            <Previews.GpsLongitude {...gpsLongitude.toJS()} {...fcStatus}
              setPosition={setPosition('gpsLongitude')}
            />
            <Previews.GpsStatus {...gps2Status.toJS()} {...fcStatus}
              setPosition={setPosition('gps2Status')}
            />
            <Previews.GpsStatus {...gpsStatus.toJS()} {...fcStatus}
              setPosition={setPosition('gpsStatus')}
            />
            <Previews.HomeDistance {...homeDistance.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('homeDistance')}
            />
            <Previews.LinkQuality {...linkQuality.toJS()} {...fcStatus}
              setPosition={setPosition('linkQuality')}
            />
            <Previews.Radar {...radar.toJS()} {...fcStatus}
              setPosition={setPosition('radar')}
            />
            <Previews.RelativeAltitude {...relativeAltitude.toJS()}
              {...fcStatus} units={units} setPosition={setPosition('relativeAltitude')}
            />
            <Previews.Rssi {...rssi.toJS()} {...fcStatus}
              setPosition={setPosition('rssi')} setPosition={setPosition('fcStatus')}
            />
            <Previews.SpeedAir {...speedAir.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('speedAir')}
            />
            <Previews.SpeedGround {...speedGround.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('speedGround')}
            />
            <Previews.SpeedScale {...speedScale.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('speedScale')}
            />
            <Previews.Throttle {...throttle.toJS()} {...fcStatus}
              setPosition={setPosition('throttle')}
            />
            <Previews.Time {...time.toJS()} {...fcStatus}
              setPosition={setPosition('time')}
            />
            <Previews.TotalTrip {...totalTrip.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('totalTrip')}
            />
            <Previews.WpDistance {...wpDistance.toJS()} {...fcStatus}
              units={units} setPosition={setPosition('wpDistance')}
            />
            <Previews.Wind {...wind.toJS()} {...fcStatus} units={units}
              setPosition={setPosition('wind')}
            />
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
