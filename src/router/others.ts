import {
  _2018Md,
  _2018Meta,
  gitMd,
  gitMeta,
  xiaochengxuMd,
  xiaochengxuMeta,
  taroMd,
  taroMeta,
  httpMd,
  httpMeta,
  browserCacheMd,
  browserCacheMeta,
  browserRenderMd,
  browserRenderMeta,
  englishMd,
  englishMeta,
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
  others: [
    {
      path: '2018',
      menuName: '2018',
      component: _2018Md,
      anchors: _2018Meta.anchors,
      redirectTo: true,
    },
    {
      path: 'git',
      menuName: 'Git',
      component: gitMd,
      anchors: gitMeta.anchors,
    },
    {
      path: 'xiaochengxu',
      menuName: '小程序',
      component: xiaochengxuMd,
      anchors: xiaochengxuMeta.anchors,
    },
    {
      path: 'taro',
      menuName: 'Taro',
      component: taroMd,
      anchors: taroMeta.anchors,
    },
    {
      path: 'http',
      menuName: 'Http',
      component: httpMd,
      anchors: httpMeta.anchors,
    },
    {
      path: 'browserCache',
      menuName: 'BrowserCache',
      component: browserCacheMd,
      anchors: browserCacheMeta.anchors,
    },
    {
      path: 'browserRender',
      menuName: 'BrowserRender',
      component: browserRenderMd,
      anchors: browserRenderMeta.anchors,
    },
    {
      path: 'english',
      menuName: 'English',
      component: englishMd,
      anchors: englishMeta.anchors,
    },
  ],
};
