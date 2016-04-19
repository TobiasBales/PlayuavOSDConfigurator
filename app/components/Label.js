import React, { PropTypes } from 'react';

export default function Label(props) {
  const { text } = props;
  return (
    <label className="label">{text}</label>
  );
}

Label.propTypes = {
  text: PropTypes.string.isRequired,
};
