import Async from '@/src/components/Async';
import Decorator from '@/src/components/Decorator';

import {
  DecoratorMd,
  DecoratorMeta,
  AsyncMd,
  AsyncMeta,
  ClassMd,
  ClassMeta,
  ContextMd,
  ContextMeta,
  FunctionMd,
  FunctionMeta,
  PromiseMd,
  PromiseMeta,
  SymbolMd,
  SymbolMeta,
  IteratorMd,
  IteratorMeta,
  SetMapMd,
  SetMapMeta,
  GrammarMd,
  GrammarMeta,
  GeneratorMd,
  GeneratorMeta,
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
  es6: [
    {
      path: 'function',
      menuName: 'Function',
      anchors: FunctionMeta.anchors,
      component: FunctionMd,
      redirectTo: true,
    },
    {
      path: 'class',
      menuName: 'Class',
      anchors: ClassMeta.anchors,
      component: ClassMd,
    },
    {
      path: 'context',
      menuName: 'Context',
      anchors: ContextMeta.anchors,
      component: ContextMd,
    },
    {
      path: 'promise',
      menuName: 'Promise',
      anchors: PromiseMeta.anchors,
      component: PromiseMd,
    },
    {
      path: 'decorator',
      menuName: 'Decorator',
      anchors: DecoratorMeta.anchors,
      container: Decorator,
      component: DecoratorMd,
    },
    {
      path: 'async',
      menuName: 'Async',
      anchors: AsyncMeta.anchors,
      component: AsyncMd,
      container: Async,
    },
    {
      path: 'symbol',
      menuName: 'Symbol',
      anchors: SymbolMeta.anchors,
      component: SymbolMd,
    },
    {
      path: 'iterator',
      menuName: 'Iterator',
      anchors: IteratorMeta.anchors,
      component: IteratorMd,
    },
    {
      path: 'generator',
      menuName: 'Generator',
      anchors: GeneratorMeta.anchors,
      component: GeneratorMd,
    },
    {
      path: 'grammar',
      menuName: 'Grammar',
      anchors: GrammarMeta.anchors,
      component: GrammarMd,
    },
    {
      path: 'setmap',
      menuName: 'SetMap',
      anchors: SetMapMeta.anchors,
      component: SetMapMd,
    },
  ],
};
