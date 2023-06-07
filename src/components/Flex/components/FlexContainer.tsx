import React, { Component } from 'react';
import styles from './flex.scss';

type Props = {
  outerStyles: React.CSSProperties;
};

export default class FlexContainer extends Component<Props> {
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
    );
  }
}
