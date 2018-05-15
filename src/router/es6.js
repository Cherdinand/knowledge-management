import AsyncMd, { AsyncMeta } from 'markdown/es6/async.md';
import Async from 'components/Async';

import ClassMd, { ClassMeta } from 'markdown/es6/class.md';

import DecoratorMd, { DecoratorMeta } from 'markdown/es6/decorator.md';
import Decorator from 'components/Decorator';

import LoaderMd, { LoaderMeta } from 'markdown/es6/loader.md';

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
    path: 'async',
    menuName: "Async",
    anchors: AsyncMeta.anchors,
    container: Async,
    component: AsyncMd,
    redirectTo: true,
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
    path: 'loader',
    menuName: "Loader",
    anchors: LoaderMeta.anchors,
    component: LoaderMd,
  }]
};