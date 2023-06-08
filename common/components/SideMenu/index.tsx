import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './index.scss';
import { RouteType } from '@/types/router';

const { SubMenu, Item } = Menu;

type Props = { moduleRouterConfig: RouteType[] } & RouteComponentProps<{ moduleName: string }>;

type State = {
  openKeys: string[];
  selectedKeys: string[];
};

class SideMenu extends Component<Props, State> {
  state = {
    openKeys: [],
    selectedKeys: [],
  };

  UNSAFE_componentWillReceiveProps(np: Props) {
    const {
      location: { pathname, hash },
    } = np;

    if (this.props.location.pathname !== pathname) {
      this.setState({
        openKeys: [pathname.split('/')[2]],
      });
    }

    if (this.props.location.hash !== hash) {
      this.setState({
        selectedKeys: [decodeURI(hash.substr(1))],
      });
    }
  }

  changeRoute = ({ key }: { key: string }) => {
    const {
      location: { pathname },
      match: {
        params: { moduleName },
      },
    } = this.props;

    // attention 如果pathname中有key字段，说明就在当前路由，不需要跳转，所以return
    if (pathname.indexOf(key) !== -1) {
      return;
    }

    this.props.history.push(`/${moduleName}/${key}`);
  };

  render() {
    const { moduleRouterConfig } = this.props;
    const { openKeys, selectedKeys } = this.state;

    return (
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="dark"
        // inlineCollapsed // 菜单是否收起呈缩略图，可以后面加此功能
      >
        {moduleRouterConfig.map((route) => {
          return (
            <SubMenu
              key={route.path}
              title={
                <span>
                  <Icon type="slack" />
                  <span>{route.menuName}</span>
                </span>
              }
              onTitleClick={this.changeRoute}
            >
              {route.anchors &&
                route.anchors.map((anchor) => {
                  return (
                    <Item key={anchor}>
                      <a className={styles.textOverflow} href={`#${anchor}`}>
                        {anchor}
                      </a>
                    </Item>
                  );
                })}
            </SubMenu>
          );
        })}
      </Menu>
    );
  }
}

export default withRouter(SideMenu);
