import React, {Component} from 'react';
import SideMenu from 'common/components/SideMenu';
import NavTab from 'common/components/NavTab';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BackTop } from 'antd';

import Logo from './images/logo.png';

import { RouterConfig } from 'router';

import styles from './index.scss';
import { H3, InlineCode, Blockquote, Em } from "../../../src/ui/index";

export default class AppContainer extends Component {
  render() {
    const { match } = this.props;
    const { moduleName } = match.params;
  
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sideHeader}>
            <img className={styles.img} src={Logo} alt=""/>
            <span className={styles.title}>Cherdinand</span>
          </div>

          <SideMenu
            moduleRouterConfig={RouterConfig[moduleName]}
          />
        </div>

        <div className={styles.content}>
          <NavTab className={styles.navTab}/>

          <div className={styles.mdView}>
            <Switch>
              {
                RouterConfig[moduleName].map((route) => {
                  return <Route path={match.url + '/' + route.path} key={route.path} render={() => {
                    const Container = route.container;
                    const Component = route.component;
                    const componentJsx = Component && (
                      <Component
                        components={{
                          h3: H3,
                          blockquote: Blockquote,
                          em: Em,
                          inlineCode: InlineCode
                        }}
                      />
                    );
                    
                    return Container ? <Container>{componentJsx}</Container> : componentJsx;
                  }}/>
                })
              }
 
              {
                RouterConfig[moduleName].map((route) => {
                  if(route.redirectTo){
                    return <Redirect key={route.path} to={match.url + '/' + route.path}/>
                  }
                })
              }
            </Switch>
            <BackTop />
          </div>
        </div>
      </div>
    )
  }
}