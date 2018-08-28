import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import styles from './index.scss';

const { SubMenu, Item } = Menu;

@withRouter
export default class SideMenu extends Component {
  changeRoute = ({key}) => {
    const { location: { pathname }, match: { params: { moduleName }} } = this.props;
    
    console.log(pathname, moduleName, key)

    // attention 如果pathname中有key字段，说明就在当前路由，不需要跳转，所以return
    if(pathname.indexOf(key) !== -1){
      return;
    }
    
    this.props.history.push(`/${moduleName}/${key}`);
  };

  render() {
    const { moduleRouterConfig, location: { pathname, hash } } = this.props;

    const openKeys = [].concat(pathname.split('/')[2]);
    const selectedKeys = [].concat(decodeURI(hash.substr(1)));

    return (
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        // inlineCollapsed // 菜单是否收起呈缩略图，可以后面加此功能
      >
        {
          moduleRouterConfig.map((route) => {
            return (
              <SubMenu
                key={route.path}
                title={<span><Icon type="slack" /><span>{route.menuName}</span></span>}
                onTitleClick={this.changeRoute}
              >
                {
                  route.anchors && route.anchors.map((anchor) => {
                    return (
                      <Item key={anchor}>
                        <a className={styles.textOverflow} href={`#${anchor}`}>{anchor}</a>
                      </Item>
                    )
                  })
                }
              </SubMenu>
            )
          })
        }
      </Menu>
    )
  }
}
