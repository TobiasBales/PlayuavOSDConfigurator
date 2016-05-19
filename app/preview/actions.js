export const PANEL = 'preview/panels';
export const TOGGLE_GRID = 'parameters/toggle_grid';
export const ALARM = 'parameters/alarm';

function setAlarm(alarm) {
  return { type: ALARM, payload: alarm };
}

function setPanel(panel) {
  return { type: PANEL, payload: panel };
}

function toggleGrid() {
  return { type: TOGGLE_GRID };
}

export default {
  setAlarm,
  setPanel,
  toggleGrid,
};
