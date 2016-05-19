import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './Grid.css';

export default function Grid(props) {
  if (!props.visible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        {[...Array(26)].map((_, i) =>
          <div key={i} className={classnames(styles.row)} />)}
      </div>
      <div className={styles.container}>
        {[...Array(35)].map((_, i) =>
          <div key={i} className={classnames(styles.column)} />)}
      </div>
    </div>
  );
}

Grid.propTypes = {
  visible: PropTypes.bool.isRequired,
};
