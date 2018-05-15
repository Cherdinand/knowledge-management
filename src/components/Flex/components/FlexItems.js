import React, {Component} from 'react';
import styles from './flex.scss';

export default class FlexItems extends Component {
  render() {
    const { innerStyles } = this.props;
    return (
      <div className={styles.itemsOuter}>
        <div className={styles.itemsInner} style={innerStyles}></div>
        <div className={styles.itemsInner} style={innerStyles}></div>
        <div className={styles.itemsInner} style={innerStyles}></div>
      </div>
    )
  }
}
