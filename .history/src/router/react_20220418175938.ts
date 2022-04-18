import {
  ReactRouter4Md,
  ReactRouter4Meta,
  ContextMd,
  ContextMeta,
  ReactReduxMd,
  ReactReduxMeta,
  ApiMd,
  ApiMeta,
  DiffMd,
  DiffMeta,
  RefMd,
  RefMeta,
  ProfilerMd,
  ProfilerMeta,
  PerformanceOptimizationMd,
  PerformanceOptimizationMeta,
  FiberMd,
  FiberMeta,
  FiberMd,
  ConcurrentMeta,
} from '@/markdown/react/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  react: [{
    path: 'react-router4',
    menuName: "ReactRouter4",
    anchors: ReactRouter4Meta.anchors,
    component: ReactRouter4Md,
    redirectTo: true,
  }, {
    path: 'context',
    menuName: "Context",
    anchors: ContextMeta.anchors,
    component: ContextMd,
  }, {
    path: 'react-redux-book',
    menuName: "深入浅出React和Redux",
    anchors: ReactReduxMeta.anchors,
    component: ReactReduxMd,
  }, {
    path: 'api',
    menuName: "Api",
    anchors: ApiMeta.anchors,
    component: ApiMd,
  }, {
    path: 'diff',
    menuName: "Diff",
    anchors: DiffMeta.anchors,
    component: DiffMd,
  }, {
    path: 'ref',
    menuName: "Ref",
    anchors: RefMeta.anchors,
    component: RefMd,
  }, {
    path: 'profiler',
    menuName: "Profiler",
    anchors: ProfilerMeta.anchors,
    component: ProfilerMd,
  }, {
    path: 'performance-optimization',
    menuName: "React性能优化",
    anchors: PerformanceOptimizationMeta.anchors,
    component: PerformanceOptimizationMd,
  }, {
    path: 'fiber',
    menuName: "Fiber",
    anchors: FiberMeta.anchors,
    component: FiberMd,
  }],
};
