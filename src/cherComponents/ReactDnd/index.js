import React, {Component} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Grid from './Grid';
import Knight from "./Knight";
import random from 'lodash/random';
import Alert from 'common/components/Alert';

import { calcRowGroup } from 'utils';

import styles from './index.scss';

const arr = Array.from({length: 64}, (x,i) => i + 1);
const grids = calcRowGroup(arr,8);

@DragDropContext(HTML5Backend)
export default class ReactDnd extends Component {
  state = {
    knightPosition: [random(1,8),random(1,8)]
  }
  
  handleState = (position) => {
    this.setState({
      knightPosition: position
    })
  }
  
  renderMessage = () => {
    return (
      <div>
        <p>1、 Backend 实现 DnD 的方式，默认是用 HTML5 DnD API，它不能在触屏环境下工作，而且在 IE 下可定制性比其他浏览器弱。你也可以用自己实现，具体请看官方文档。</p>
        <p>2、 Items 拖拽数据的表现形式，用 Object 来表示。譬如，要拖拽一张卡片，那这张卡片的数据的表现形式可能是 {"{ id: xxx, content: yyy }"}。</p>
        <p>3、 Types 表示拖/放组件的兼容性，DragSource 和 DropTarget 必须指定 type。只有在 type 相同的情况下，DragSource 才能放到 DropTarget 中。</p>
        <p>4、 Monitors 用来响应拖拽事件，可以用来更新组件的的状态。</p>
        <p>5、 Connectors 底层接触 DOM 的东西，用来封装你的组件，让你的组件有拖拽的特性。一般在 collect 方法中指定，然后注入到组件的 props 中，最后 render 方法中包装你自己的组件。</p>
        <p>6、 DragSource && DropTarget 把上面的概念都绑在一起的东西，也是真正跟你的组件打交道的东西。</p>
      </div>
    )
  };
  
  render() {
    const { knightPosition } = this.state;

    return (
      <div className={styles.wrapper}>
        <Alert
          message={this.renderMessage()}
          type="info"
        />
        <div className={styles.gridWrapper}>
          {
            grids.map((grid,i) => {
              const containKnight = (grid[0] === knightPosition[0]) && (grid[1] === knightPosition[1]);
              const color = (knightPosition[0] % 2 === 1 && knightPosition[1] % 2 === 1) || (knightPosition[0] % 2 === 0 && knightPosition[1] % 2 === 0) ? "#000" : "#fff";
              const bgColor = (grid[0] % 2 === 1 && grid[1] % 2 === 1) || (grid[0] % 2 === 0 && grid[1] % 2 === 0) ? "#fff" : "#000";
              return (
                <Grid
                  key={`${grid}${i}`}
                  bgColor={bgColor}
                  position={grid}
                  handleState={this.handleState}
                >
                  {
                    containKnight && <Knight color={color}/>
                  }
                </Grid>
              )
            })
          }
        </div>
      </div>
    )
  }
}
