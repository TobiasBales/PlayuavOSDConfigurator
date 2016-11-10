import React, { PropTypes } from 'react';
import * as Canvas_types from '../utils/Canvas';
import Canvas from '../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../utils/fonts';

export default class HomeDirectionDebugInfo extends PreviewBase {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    const font = fonts.getFont(0);      
    this.canvas.clear();
    const height = this.refs.canvas.height;

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
        var debugLines = [ 
                            'abs h.b. 68',
                            'rel h.b. -7',
                            'comp. b 75'
                         ];    
        var currentLineYOffset = 0;                         
        for (let debugLineIndex = 0; debugLineIndex < debugLines.length; debugLineIndex++) {
            // Get the current line
            var currentDebugLine = debugLines[debugLineIndex];                                        
            // Draw the current line
            var debugLineStringPosition = Canvas.calculateStringPosition(currentDebugLine, 0, currentLineYOffset, Canvas_types.H_ALIGNMENT_LEFT, Canvas_types.V_ALIGNMENT_TOP, font);
            this.canvas.drawString(currentDebugLine, 0, currentLineYOffset, font); 
            // Move Y position down one line
            currentLineYOffset += debugLineStringPosition.height;    
        }
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const height = 90;
    const width = 300;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX, top: positionY }}
          width={height}
          height={width}
          className="preview-widget"
        />
    );
  }
}
