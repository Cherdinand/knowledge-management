import React, {Component} from 'react';
import styles from './flex.scss';

export default class FlexContainer extends Component {
  render() {
    const { outerStyles } = this.props;
    return (
      <div className={styles.containerOuter} style={outerStyles}>
        <div className={styles.containerInner}></div>
        <div className={styles.containerInner}></div>
        <div className={styles.containerInner}></div>
        <div className={styles.containerInner}></div>
        <div className={styles.containerInner}></div>
      </div>
    )
  }
}
