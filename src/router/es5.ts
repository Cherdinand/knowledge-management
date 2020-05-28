import Prototype from '@/src/components/Prototype';

import {
  PrototypeMd,
  PrototypeMeta,
  ScopeAndThisMd,
  ScopeAndThisMeta,
  TypeTransferMd,
  TypeTransferMeta,
  EventLoopMd,
  EventLoopMeta,
} from '@/markdown/es5';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  es5: [{
    path: 'prototype',
    menuName: "Prototype",
    anchors: PrototypeMeta.anchors,
    container: Prototype,
    component: PrototypeMd,
    redirectTo: true
  },{
    path: 'scopethis',
    menuName: "ScopeThis",
    anchors: ScopeAndThisMeta.anchors,
    component: ScopeAndThisMd,
  },{
    path: 'typeTransfer',
    menuName: "TypeTransfer",
    anchors: TypeTransferMeta.anchors,
    component: TypeTransferMd,
  },{
    path: 'eventLoop',
    menuName: "EventLoop",
    anchors: EventLoopMeta.anchors,
    component: EventLoopMd,
  },]
};