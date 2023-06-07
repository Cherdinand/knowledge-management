import { _2018Md, _2018Meta, _2019Md, _2019Meta } from '@/markdown/movies/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  movies: [
    {
      path: '2018',
      menuName: '2018',
      component: _2018Md,
      anchors: _2018Meta.anchors,
      redirectTo: true,
    },
    {
      path: '2019',
      menuName: '2019',
      component: _2019Md,
      anchors: _2019Meta.anchors,
      redirectTo: true,
    },
  ],
};
