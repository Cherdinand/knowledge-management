import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';

import styles from './index.scss';

const { SubMenu, Item } = Menu;

@withRouter
export default class SideMenu extends Component {
  changeRoute = ({key}) => {
    const { location: { pathname }, match: { params: { moduleName }} } = this.props;
    
    // attention 如果pathname中有key字段，说明就在当前路由，不需要跳转，所以return
    if(pathname.indexOf(key) !== -1){
      return;
    }
    
    this.props.history.push(`/${moduleName}/${key}`);
  };
  
  render() {
    const { moduleRouterConfig } = this.props;
    
    const { pathname } = this.props.location;
    
    const firstRoute = pathname.split('/')[1];
    
    const secondRoute = pathname.split('/')[2];
    
    const openKeys = [].concat(secondRoute);
    console.log('openKeys',openKeys);
    
    return (
      <Menu
        openKeys={openKeys}
        // selectedKeys
        // defaultSelectedKeys={['1']}
        mode="inline"
        theme="dark"
        // inlineCollapsed 菜单是否收起呈缩略图，可以后面加此功能
      >
        {
          moduleRouterConfig.map((route) => {
            return (
              <SubMenu
                key={route.path}
                title={<span><Icon type="mail" /><span>{route.menuName}</span></span>}
                onTitleClick={this.changeRoute}
              >
                {
                  route.anchors && route.anchors.map((anchor) => {
                    return (
                      <Item key={anchor}>
                        <a href={`#/${firstRoute}/${secondRoute}/${anchor}`}>{anchor}</a>
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
