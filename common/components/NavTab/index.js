import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import { Tabs } from 'antd';

import styles from './index.scss';
import AppContainer from "common/components/AppContainer";

const { TabPane } = Tabs;

@withRouter
export default class NavTab extends Component {
  
  handleClick = (key) => {
    this.props.history.push(`/${key}`);
  };
  
  render() {
    // xinxin 这里通过withRouter传进来的match对象是由src/index.js 里<Route path="/:moduleName" component={AppContainer} />传进来的
    const { className, match: { params: { moduleName } } } = this.props;

    return (
      <div className={className}>
        <Tabs
          defaultActiveKey={moduleName}
          size="large"
          onTabClick={this.handleClick}
        >
          {/*<TabPane tab="架构之路" key="frame" />*/}
          <TabPane tab="ES6" key="es6" />
          <TabPane tab="Css" key="css" />
          <TabPane tab="React" key="react" />
          <TabPane tab="Others" key="others" />
          {/*<TabPane tab="CherComponents" key="cher-components" />*/}
        </Tabs>
      </div>
    )
  }
}
