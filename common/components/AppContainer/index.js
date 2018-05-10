import React, {Component} from 'react';
import SideMenu from 'common/components/SideMenu';
import NavTab from 'common/components/NavTab';
import { withRouter, Switch, Route } from 'react-router-dom';

// import Class, { meta } from 'markdown/class';
// import Class, { meta } from 'markdown/class';

import styles from './index.scss';
import {Code, H3, InlineCode} from "../../../src/ui";

@withRouter

export default class AppContainer extends Component {
  
  componentWillMount(){
    // console.log('props', this.props.location.pathname);
    console.log('props', this.props.match.params.category);
  }
  
  componentWillReceiveProps(nextProps){
    // console.log('nextProps', nextProps.location.pathname);
    console.log('nextProps', nextProps.match.params.category);
  }
  
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
            haizi
          </div>
        </div>
      </div>
    )
  }
}
