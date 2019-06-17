import React from 'react';
import SideMenu from '@/common/components/SideMenu';
import NavTab from '@/common/components/NavTab';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { BackTop } from 'antd';

import Logo from './images/logo.png';

import { RouteType } from '@/types/router';
import { RouterConfig } from '@/src/router';

import styles from './index.scss';
import { H3, InlineCode, Blockquote, Em, Img, A } from "../../../src/ui/index";

const BasicLayout: React.SFC<RouteComponentProps<{ moduleName: string }>> = props => {
  const { match } = props;
  const { moduleName } = match.params;

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sideHeader}>
          <img className={styles.img} src={Logo} alt=""/>
          <span className={styles.title}>Cherdinand</span>
        </div>

        <SideMenu moduleRouterConfig={RouterConfig[moduleName]}/>
      </div>

      <div className={styles.content}>
        <NavTab className={styles.navTab}/>

        <div className={styles.mdView}>
          <Switch>
            {
              RouterConfig[moduleName].map((route: RouteType) => {
                return <Route path={match.url + '/' + route.path} key={route.path} render={() => {
                  const Container = route.container;
                  const Component = route.component;
                  const componentJsx = Component && (
                    <Component
                      components={{
                        h3: H3,
                        blockquote: Blockquote,
                        em: Em,
                        img: Img,
                        a: A,
                        inlineCode: InlineCode,
                      }}
                    />
                  );

                  return Container ? <Container>{componentJsx}</Container> : componentJsx;
                }}/>
              })
            }

            {
              RouterConfig[moduleName].map((route: RouteType) => {
                if(route.redirectTo){
                  return <Redirect key={route.path} to={match.url + '/' + route.path}/>
                }
                return;
              })
            }
          </Switch>
          <BackTop />
        </div>
      </div>
    </div>
  )
}
export default BasicLayout;