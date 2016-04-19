import React, { Component, PropTypes } from 'react';
import fonts from '../../utils/fonts';
import canvas from '../../utils/canvas';

export default class StringPreview extends Component {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    hAlignment: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    vAlignment: PropTypes.number,
    visibleOn: PropTypes.number.isRequired,
  }

  static defaultProps = {
    vAlignment: 0,
  }

  constructor(props) {
    super(props);

    this.state = {
      left: this.props.positionX,
      top: this.props.positionY,
    };
  }

  componentDidMount() {
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

  content() {
    return '';
  }

  clear(context) {
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  draw() {
    const font = fonts.getFont(this.props.fontSize);
    const context = this.refs.canvas.getContext('2d');
    const content = this.content();
    this.clear(context);

    if (content && (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      canvas.drawString(context, content, 0, 0, font);
    }
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
    const { hAlignment, positionX, positionY, vAlignment } = this.props;
    const content = this.content();
    const font = fonts.getFont(this.props.fontSize);
    const position = canvas.calculateStringPosition(
      content, positionX, positionY, hAlignment, vAlignment, font);

    const visible = this.content() &&
      (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: position.left, top: position.top }}
          width={position.width}
          height={position.height}
          className="preview-widget"
        />
    );
  }
}
