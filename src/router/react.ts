import {
  ReactRouter4Md,
  ReactRouter4Meta,
  ContextMd,
  ContextMeta,
  ReactReduxMd,
  ReactReduxMeta,
  ReactMd,
  ReactMeta,
} from '@/markdown/react/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  react: [{
    path: 'react-router4',
    menuName: "ReactRouter4",
    anchors: ReactRouter4Meta.anchors,
    component: ReactRouter4Md,
    redirectTo: true,
  },{
    path: 'context',
    menuName: "Context",
    anchors: ContextMeta.anchors,
    component: ContextMd,
  },{
    path: 'react-redux-book',
    menuName: "深入浅出React和Redux",
    anchors: ReactReduxMeta.anchors,
    component: ReactReduxMd,
  },{
    path: 'react1',
    menuName: "React",
    anchors: ReactMeta.anchors,
    component: ReactMd,
  }],
};
