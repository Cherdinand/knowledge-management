import React, {Component} from 'react';
import NavTab from 'common/components/NavTab';

import styles from './index.scss';

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
    
        <div className={styles.sideHeader}>
          Cherdinand
        </div>
    
        <NavTab
          className={styles.navWrap}
        />
      </div>
    )
  }
}
