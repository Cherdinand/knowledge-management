import ProgressBar from 'cherComponents/ProgressBar';
import ReactDnd from 'cherComponents/ReactDnd';

/***
 * path          匹配的路由
 * menuName      菜单栏（二级路由）显示的菜单名字
 * anchors       二级路由下的锚点列表，由markdown文件export出来
 * container
 * component     mdx component
 * redirectTo    需要redirect的路由
 ***/

export default {
  cherComponents: [{
    path: 'progress-bar',
    menuName: "ProgressBar",
    container: ProgressBar,
    redirectTo: true,
  }, {
    path: 'react-dnd',
    menuName: "ReactDnd",
    container: ReactDnd,
  }],
};
