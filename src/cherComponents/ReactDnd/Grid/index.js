import React, {Component} from 'react';
import ItemType from '../ItemType';
import { DropTarget } from 'react-dnd';

import styles from './index.scss';


const gridTarget = {
  canDrop(props, monitor) {
    return true;
  },
  
  // 如果canDrop返回false那么drop方法将不会触发
  drop(props) {
    // 父组件通过props传给子组件的属性可以被props属性接收到，因此可以在这里调用父组件的方法，修改父组件的state值
    props.handleState(props.position)
  },
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}

@DropTarget(ItemType.KNIGHT, gridTarget, collect)

export default class Grid extends Component {
  render() {
    const { connectDropTarget, bgColor, isOver, canDrop } = this.props;
    // 通过connectDropTarget将 target DOM 和 React DnD backend 连接起来
    return connectDropTarget(
      <div
        className={styles.grid}
        style={{
          backgroundColor: bgColor
        }}
      >
        { this.props.children }
        
        {
          isOver && canDrop && <div className={styles.shelter} />
        }
      </div>
    )
  }
}
