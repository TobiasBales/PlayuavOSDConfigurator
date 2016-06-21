import React, { PropTypes } from 'react';
import { Card, CardText } from 'react-toolbox/lib/card';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import actions from './actions';
import background from '../../static/background.png';
import { bindActionCreators } from 'redux';
import configActions from '../config/actions';
import { connect } from 'react-redux';
import Column from '../components/Column';
import { Checkbox, Dropdown } from 'react-toolbox';
import Grid from './Grid';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Label from '../components/Label';
import Previews from '.';

function Preview(props) {
  const { alarm, panel } = props;
  const {
    absoluteAltitude, alarms, altitudeScale, armState, artificialHorizon, batteryConsumed,
    batteryCurrent, batteryRemaining, batteryVoltage, climbRate, compass, efficiency,
    flightMode, linkQuality, homeLatitude, homeLongitude, gpsHdop, gpsLatitude, gpsLongitude,
    gpsStatus, gps2Hdop, gps2Latitude, gps2Longitude, gps2Status, homeDirection, homeDistance,
    radar, relativeAltitude, rssi, speedAir, speedScale, speedGround, throttle, time,
    totalTrip, varioGraph, wpDistance, wind,
  } = props.parameters;
  const units = props.parameters.get('video').get('units');
  const videoMode = props.parameters.get('video').get('videoMode');
  const rssiType = props.parameters.get('rssi').get('type');
  const numberOfPanels = props.parameters.get('video').get('maxPanels');
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
    homeLatitude: 484330500,
    homeLongitude: -46790000,
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
    varioData: [0, 2, 2, 1, 0, -1, -2, -5, -2, -1, -1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3,
      3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 6, 6, 8, 8, 9, 9],
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

  const setPosition = (parameter) => (x, y) =>
    props.setPosition(parameter, x, y);

  return (
    <Card className="preview-card">
      <CardText>
        <div className="preview" style={style}>
          <img src={background} />
          <Grid visible={props.showGrid} />
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
          <Previews.ArtificialHorizon {...artificialHorizon.toJS()} {...fcStatus}
            setPosition={setPosition('artificialHorizon')}
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
          <Previews.HomeLatitude {...homeLatitude.toJS()} {...fcStatus}
            setPosition={setPosition('homeLatitude')}
          />
          <Previews.HomeLongitude {...homeLongitude.toJS()} {...fcStatus}
            setPosition={setPosition('homeLongitude')}
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
          <Previews.HomeDirection {...homeDirection.toJS()} {...fcStatus}
            setPosition={setPosition('homeDirection')}
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
          <Previews.VarioGraph {...varioGraph.toJS()} {...fcStatus}
            setPosition={setPosition('varioGraph')}
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
          <RadioGroup name="panel" className="panel" value={panel} onChange={props.setPanel}>
            {[...Array(numberOfPanels)].map((_, i) =>
              <RadioButton key={i} label={(i + 1).toFixed(0)} value={i} />
            )}
          </RadioGroup>
        </Column>
        <Column width={50}>
          <Dropdown label="alarm" source={alarmOptions}
            value={alarm} onChange={props.setAlarm}
          />
        </Column>
        <Checkbox
          checked={props.showGrid}
          label="show grid"
          onChange={props.toggleGrid}
        />
      </CardText>
    </Card>
  );
}

Preview.propTypes = {
  alarm: PropTypes.number.isRequired,
  panel: PropTypes.number.isRequired,
  parameters: ImmutablePropTypes.map.isRequired,
  setAlarm: PropTypes.func.isRequired,
  setPanel: PropTypes.func.isRequired,
  setPosition: PropTypes.func.isRequired,
  showGrid: PropTypes.bool.isRequired,
  toggleGrid: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  const numberOfPanels = state.parameters.getIn(['video', 'maxPanels']);
  const { alarm, panel, showGrid } = state.preview;

  return { alarm, numberOfPanels, panel, parameters: state.parameters, showGrid };
}

function mapDispatchToProps(dispatch) {
  const allActions = { ...actions, ...configActions };
  return bindActionCreators(allActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
