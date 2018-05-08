import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import styles from './index.scss';

const { SubMenu, Item } = Menu;



export default class SideMenu extends Component {
  render() {
    return (
      <Menu
        // openKeys
        // selectedKeys
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        // inlineCollapsed 菜单是否收起呈缩略图，可以后面加此功能
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <Item key="5">Option 5</Item>
          <Item key="6">Option 6</Item>
          <Item key="7">Option 7</Item>
          <Item key="8">Option 8</Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <Item key="9">Option 9</Item>
          <Item key="10">Option 10</Item>
          <SubMenu key="sub3" title="Submenu">
            <Item key="11">Option 11</Item>
            <Item key="12">Option 12</Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    )
  }
}
