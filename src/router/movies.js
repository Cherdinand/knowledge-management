import {
  _201805Md,
  _201805Meta,
  _201806Md,
  _201806Meta,
} from 'markdown/movies';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  movies: [{
    path: '2018-05',
    menuName: "2018-05",
    component: _201805Md,
    anchors: _201805Meta.anchors,
    redirectTo: true,
  }, {
    path: '2018-06',
    menuName: "2018-06",
    component: _201806Md,
    anchors: _201806Meta.anchors,
  }],
};
