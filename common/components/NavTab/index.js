import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import { Tabs } from 'antd';

import styles from './index.scss';

const { TabPane } = Tabs;

@withRouter
export default class NavTab extends Component {
  handleClick = (key) => {
    // this.props.history.push(`/${key}`);
  };
  
  render() {
    const { className } = this.props;
    
    return (
      <div className={className}>
        <Tabs
          defaultActiveKey="frame"
          size="large"
          onTabClick={this.handleClick}
        >
          <TabPane tab="架构之路" key="frame" />
          <TabPane tab="ES6" key="es6" />
          <TabPane tab="Css" key="css" />
          <TabPane tab="React" key="react" />
          <TabPane tab="CherComponents" key="cher-components" />
        </Tabs>
      </div>
    )
  }
}
