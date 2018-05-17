import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Tabs } from 'antd';

import styles from './index.scss';

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
      <div className={classnames(styles.tabsWrap,className)}>
        <Tabs
          defaultActiveKey={moduleName}
          size="large"
          onTabClick={this.handleClick}
        >
          <TabPane tab="ES6" key="es6" />
          <TabPane tab="Css" key="css" />
          <TabPane tab="React" key="react" />
          <TabPane tab="Webpack" key="webpack" />
          <TabPane tab="Others" key="others" />
          <TabPane tab="CherComponents" key="cherComponents" />
          <TabPane tab="Framework" key="framework" />
        </Tabs>
      </div>
    )
  }
}
