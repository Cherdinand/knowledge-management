import Flex from '@/src/components/Flex';

import {
  FlexMd,
  FlexMeta,
  RemMd,
  RemMeta,
  AbbrMd,
  AbbrMeta,
  CssMd,
  CssMeta,
  FloatMd,
  FloatMeta,
} from '@/markdown/css/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  css: [{
    path: 'css',
    menuName: "Css",
    anchors: CssMeta.anchors,
    component: CssMd,
    redirectTo: true,
  },{
    path: 'flex',
    menuName: "Flex",
    anchors: FlexMeta.anchors,
    container: Flex,
    component: FlexMd,
  },{
    path: 'float',
    menuName: "Float",
    anchors: FloatMeta.anchors,
    component: FloatMd,
  },{
    path: 'rem',
    menuName: "Rem",
    anchors: RemMeta.anchors,
    component: RemMd,
  },{
    path: 'abbr',
    menuName: "Abbr",
    anchors: AbbrMeta.anchors,
    component: AbbrMd,
  }],
};