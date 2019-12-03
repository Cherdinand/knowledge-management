import {
  _201805Md,
  _201805Meta,
  _201806Md,
  _201806Meta,
  _201808Md,
  _201808Meta,
  gitMd,
  gitMeta,
  xiaochengxuMd,
  xiaochengxuMeta,
  taroMd,
  taroMeta,
  httpMd,
  httpMeta,
} from '@/markdown/others/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  others: [{
    path: '2018-05',
    menuName: "2018-05",
    component: _201805Md,
    anchors: _201805Meta.anchors,
    redirectTo: true,
  },{
    path: '2018-06',
    menuName: "2018-06",
    component: _201806Md,
    anchors: _201806Meta.anchors,
  },{
    path: '2018-08',
    menuName: "2018-08",
    component: _201808Md,
    anchors: _201808Meta.anchors,
  },{
    path: 'git',
    menuName: "Git",
    component: gitMd,
    anchors: gitMeta.anchors,
  },{
    path: 'xiaochengxu',
    menuName: "小程序",
    component: xiaochengxuMd,
    anchors: xiaochengxuMeta.anchors,
  },{
    path: 'taro',
    menuName: "Taro",
    component: taroMd,
    anchors: taroMeta.anchors,
  },{
    path: 'http',
    menuName: "Http",
    component: httpMd,
    anchors: httpMeta.anchors,
  }],
};

