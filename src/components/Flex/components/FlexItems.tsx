import React, {Component} from 'react';
import styles from './flex.scss';

type Props = {
  innerStyles: React.CSSProperties
}

export default class FlexItems extends Component<Props> {
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
