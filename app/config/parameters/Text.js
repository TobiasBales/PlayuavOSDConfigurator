import React, { PropTypes } from 'react';
import Label from '../../components/Label';
import styles from './Text.css';

export default function Text(props) {
  const { label, text } = props;
  return (
    <div className={styles.container}>
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
