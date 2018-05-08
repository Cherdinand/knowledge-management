import React, {Component} from 'react';
import SideMenu from 'common/components/SideMenu';
import NavTab from 'common/components/NavTab';
// import Class, { meta } from 'markdown/class';

import styles from './index.scss';
import {Code, H3, InlineCode} from "../../../src/ui";

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
          <NavTab
            className={styles.navTab}
          />
          
          <div className={styles.mdView}>
            {
              children
            }
          </div>
        </div>
      </div>
    )
  }
}
