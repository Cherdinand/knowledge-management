import Async from '@/src/components/Async';
import Decorator from '@/src/components/Decorator';
import Prototype from '@/src/components/Prototype';

import {
  DecoratorMd,
  DecoratorMeta,
  AsyncMd,
  AsyncMeta,
  ClassMd,
  ClassMeta,
  PrototypeMd,
  PrototypeMeta,
  ContextMd,
  ContextMeta,
  FunctionMd,
  FunctionMeta,
} from '@/markdown/es6';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  es6: [{
    path: 'function',
    menuName: "Function",
    anchors: FunctionMeta.anchors,
    component: FunctionMd,
    redirectTo: true,
  },{
    path: 'async',
    menuName: "Async",
    anchors: AsyncMeta.anchors,
    component: AsyncMd,
    container: Async,
  },{
    path: 'class',
    menuName: "Class",
    anchors: ClassMeta.anchors,
    component: ClassMd,
  },{
    path: 'decorator',
    menuName: "Decorator",
    anchors: DecoratorMeta.anchors,
    container: Decorator,
    component: DecoratorMd,
  },{
    path: 'prototype',
    menuName: "Prototype",
    anchors: PrototypeMeta.anchors,
    container: Prototype,
    component: PrototypeMd,
  },{
    path: 'context',
    menuName: "Context",
    anchors: ContextMeta.anchors,
    component: ContextMd,
  }]
};