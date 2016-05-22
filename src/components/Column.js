import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function Column(props) {
  const { children, width } = props;
  const style = props.style || {};
  style.width = `${width}%`;
  const classes = classNames('column', props.classes);

  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  );
}

Column.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  classes: PropTypes.string,
  width: PropTypes.number.isRequired,
};
