import React, { Component, PropTypes } from 'react';
import Canvas from '../../utils/Canvas';

export default class PreviewBase extends Component {
  static propTypes = {
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      left: this.props.positionX,
      top: this.props.positionY,
    };
  }

  componentDidMount() {
    this.canvas = new Canvas(this.refs.canvas);
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    return Object.keys(this.props).reduce((shouldUpdate, key) => {
      if (key.startsWith('set')) {
        return shouldUpdate;
      }
      return shouldUpdate || this.props[key] !== nextProps[key];
    }, false);
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
  }

  _onDragStop = () => {
    const { left, top } = this.state;
    this.props.setPosition(left, top);
    // this.setState({ ...this.state, left: 0, top: 0 });
  }

  _onDrag = (e, ui) => {
    const { left, top } = this.state;
    this.setState({
      ...this.state,
      left: left + ui.deltaX,
      top: top + ui.deltaY
    });
  }

  render() {
    return <canvas ref="canvas" />;
  }
}
