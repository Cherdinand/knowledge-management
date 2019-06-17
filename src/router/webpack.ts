import {
  Path,
  PathMeta,
  LoaderMd,
  LoaderMeta,
  HmrMd,
  HmrMeta,
  NpmMd,
  NpmMeta,
  YuanLiMd,
  YuanLiMeta,
  PluginMd,
  PluginMeta,
  StorybookMd,
  StorybookMeta,
} from '@/markdown/webpack/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  webpack: [{
    path: 'yuanli',
    menuName: "原理",
    anchors: YuanLiMeta.anchors,
    component: YuanLiMd,
  },{
    path: 'loader',
    menuName: "Loader",
    anchors: LoaderMeta.anchors,
    component: LoaderMd,
  },{
    path: 'plugin',
    menuName: "Plugin",
    anchors: PluginMeta.anchors,
    component: PluginMd,
  },{
    path: 'path',
    menuName: "Path",
    component: Path,
    anchors: PathMeta.anchors,
    redirectTo: true,
  },{
    path: 'hmr',
    menuName: "Hmr",
    anchors: HmrMeta.anchors,
    component: HmrMd,
  },{
    path: 'npm',
    menuName: "Npm",
    anchors: NpmMeta.anchors,
    component: NpmMd,
  },{
    path: 'storybook',
    menuName: "Storybook",
    anchors: StorybookMeta.anchors,
    component: StorybookMd,
  }],
};
