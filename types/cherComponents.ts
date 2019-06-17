import { ConnectDropTarget, ConnectDragSource, ConnectDragPreview } from 'react-dnd';

export type Options = {
  strokeWidth: number,
  belowStoke: string,
  aboveStoke: string,
  easing: string,
  duration: number,
}

export type GridProps = {
  key: string,
  bgColor: string,
  position: number[],
  handleState: (position: number[]) => void,
}

export type DropTargetCollectorProps = {
  connectDropTarget: ConnectDropTarget,
  isOver: boolean,
  canDrop: boolean,
}

export type KnightProps = {
  color: string,
}

export type DragSourceCollectorProps = {
  connectDragSource: ConnectDragSource,
  connectDragPreview: ConnectDragPreview,
  isDragging: boolean,
}

export type Size = {
  width: number,
  height: number
}

export type ImplicitSize = {
  [x: string]: number
}