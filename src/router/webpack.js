import {
  Path,
  PathMeta,
  LoaderMd,
  LoaderMeta,
  HmrMd,
  HmrMeta,
  PackageJsonMd,
  PackageJsonMeta,
} from 'markdown/webpack';

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
    path: 'path',
    menuName: "Path",
    component: Path,
    anchors: PathMeta.anchors,
    redirectTo: true,
  },{
    path: 'loader',
    menuName: "Loader",
    anchors: LoaderMeta.anchors,
    component: LoaderMd,
  },{
    path: 'hmr',
    menuName: "Hmr",
    anchors: HmrMeta.anchors,
    component: HmrMd,
  },{
    path: 'package-json',
    menuName: "PackageJson",
    anchors: PackageJsonMeta.anchors,
    component: PackageJsonMd,
  }],
};
