import React, { PropTypes } from 'react';
import Label from '../Label';

export default function Text(props) {
  const { label, text } = props;
  return (
    <div>
      <Label text={label} />
      <div>{text}</div>
    </div>
  );
}

Text.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number,
  ]).isRequired,
};
