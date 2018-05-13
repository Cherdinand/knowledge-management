import 7React, {Component} from 'react';
import SideMenu from 'common/components/SideMenu';
import NavTab from 'common/components/NavTab';
import { Switch, Route, Redirect } from 'react-router-dom';

import { RouterConfig } from '../../../src/router';

import styles from './index.scss';
import {Code, H3, InlineCode} from "../../../src/ui";

export default class AppContainer extends Component {
  render() {
    const { match } = this.props;
    const { moduleName } = match.params;

    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sideHeader}>Cherdinand</div>

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
                    const Component = route.component;
                    return (
                      <Component
                        components={{
                          h3: H3,
                          code: Code,
                          inlineCode: InlineCode
                        }}
                      />
                    )
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
          </div>
        </div>
      </div>
    )
  }
}