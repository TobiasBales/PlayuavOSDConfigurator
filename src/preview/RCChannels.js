import React, { PropTypes } from 'react';
import * as Canvas_types from '../utils/Canvas';
import Canvas from '../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../utils/fonts';


// This is just the throttle preview at the moment! Needs to be
// customized for the RC Channels control
export default class RCChannelsPreview extends PreviewBase {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    const font = fonts.getFont(0);
    this.canvas.clear();
      
    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
        var default_channel_count = 8;
        
        // Just some sample channel values, possibly not realistic
        var channelValues = [ 1524, 1520, 1750, 1250, 1400, 1800, 1950, 1515];               
        
        var bar_x_offset = 85;
        var currentLineYOffset = 0;
        // TODO: Could make bar width configurable in firmware, but we'll see if anyone cares first
        var bar_width = 40;
        for (let chanNumber = 1; chanNumber <= default_channel_count; chanNumber++) {
            var currentChannelPwmValue = channelValues[chanNumber-1];
            // Draw the channel label and numeric value ('CH 2  1250')
            var curChanString = 'CH ' + chanNumber + ' ' + currentChannelPwmValue + ' ';            
            var chanStringPosition = Canvas.calculateStringPosition(curChanString, 0, currentLineYOffset, Canvas_types.H_ALIGNMENT_LEFT, Canvas_types.V_ALIGNMENT_TOP, font);
            this.canvas.drawString(curChanString, 0, currentLineYOffset, font);            
            
            // Draw the bar to the side of the text that represents the current numeric value
            var barXPos = bar_x_offset;
            var barYPos = currentLineYOffset;
            var barHeight = chanStringPosition.height;
            var isBlack = false;
            var isOutline = true;            
            this.canvas.drawRectangle(barXPos, barYPos, bar_width, chanStringPosition.height, isBlack, isOutline);
            
            // Normalize 1000-2000 PPM value to 0-1000
            var normalized_channel_value = currentChannelPwmValue - 1000;
            if (normalized_channel_value < 0) {
                normalized_channel_value = 0;
            } else if (normalized_channel_value > 1000) {
                normalized_channel_value = 1000;
            }
            
            // X offset position for the stripe relative to the bar
            var stripe_offset_x = (normalized_channel_value * bar_width) / 1000;    

            // Draw vertical stripe marking channel value on bar rectangle
            var stripeXPos = barXPos + stripe_offset_x;            
            this.canvas.drawLine(stripeXPos - 1, barYPos, stripeXPos - 1, barYPos + chanStringPosition.height, false, true);
            this.canvas.drawLine(stripeXPos, barYPos, stripeXPos, barYPos + chanStringPosition.height, false, true);
            this.canvas.drawLine(stripeXPos + 1, barYPos, stripeXPos + 1, barYPos + chanStringPosition.height, false, true);
            
            // Move Y position down one line
            currentLineYOffset += chanStringPosition.height;           
        }
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX, top: positionY }}
          width={300}
          height={300}
          className="preview-widget"
        />
    );
  }
}
