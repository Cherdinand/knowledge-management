import {
  NiceArticleMd,
  NiceArticleMeta,
  DevelopmentMd,
  DevelopmentMeta,
  EngineeringMd,
  EngineeringMeta,
  BuildMd,
  BuildMeta,
} from '@/markdown/framework/index';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  framework: [
    {
      path: 'nice-article',
      menuName: 'NiceArticle',
      component: NiceArticleMd,
      anchors: NiceArticleMeta.anchors,
      redirectTo: true,
    },
    {
      path: 'engineering',
      menuName: 'Engineering',
      component: EngineeringMd,
      anchors: EngineeringMeta.anchors,
    },
    {
      path: 'development',
      menuName: 'Development',
      component: DevelopmentMd,
      anchors: DevelopmentMeta.anchors,
    },
    {
      path: 'build',
      menuName: 'Build',
      component: BuildMd,
      anchors: BuildMeta.anchors,
    },
  ],
};
