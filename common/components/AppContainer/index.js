import React, {Component} from 'react';
import SideMenu from 'common/components/SideMenu';

import styles from './index.scss';

export default class AppContainer extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sideHeader}>
            Cherdinand
          </div>
          <SideMenu

          />
        </div>
        <div className={styles.content}>
          {
            children
          }
        </div>
      </div>
    )
  }
}
