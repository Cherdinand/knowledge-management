import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Tabs } from 'antd';

import styles from './index.scss';

const { TabPane } = Tabs;

const tabs = [{
  tab: "ES6", key: "es6",
},{
  tab: "Css", key: "css",
},{
  tab: "React", key: "react",
},{
  tab: "Webpack", key: "webpack",
},{
  tab: "Others", key: "others",
},{
  tab: "CherComponents", key: "cherComponents",
},{
  tab: "Framework", key: "framework",
},{
  tab: "Movies", key: "movies",
},{
  tab: "Read", key: "read",
},{
  tab: "Games", key: "games",
}];

@withRouter
export default class NavTab extends Component {
  state = {
    roleType: ""
  }
  
  componentDidMount(){
    // todo 获取localstorage中的roleType
    // this.setState({ roleType })
  }
  
  handleClick = (key) => {
    this.props.history.push(`/${key}`);
  };

  render() {
    // xinxin 这里通过withRouter传进来的match对象是由src/index.js 里<Route path="/:moduleName" component={BasicLayout} />传进来的
    const { className, match: { params: { moduleName } } } = this.props;

    return (
      <div className={classnames(styles.tabsWrap,className)}>
        <Tabs
          defaultActiveKey={moduleName}
          size="large"
          onTabClick={this.handleClick}
        >
          {
            tabs.map(item => {
              return <TabPane tab={item.tab} key={item.key}/>
            })
          }
        </Tabs>
      </div>
    )
  }
}
