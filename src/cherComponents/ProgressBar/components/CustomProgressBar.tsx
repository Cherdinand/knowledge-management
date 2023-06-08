import React, { Component } from 'react';
import ProgressBar, { Shape } from 'progressbar.js';
import { Options } from '@/types/cherComponents';

type Props = {
  options: Options;
  currentProgress: number;
  totalProgress: number;
  svgElement: React.ReactNode;
};

export default class CustomProgressBar extends Component<Props> {
  static defauleProps = {
    currentProgress: 0,
    totalProgress: 20,
  };

  shape: Shape = null;

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    console.log('nextProps', nextProps);
    const { currentProgress, totalProgress } = nextProps;

    // 实现动画效果
    this.shape.animate(currentProgress / totalProgress);
  }

  componentDidMount() {
    this._create(this.props);
  }

  componentWillUnmount() {
    this.shape = null;
  }

  _create(props: Props, oldProps?: Props) {
    console.log('props', props);
    const { options, currentProgress, totalProgress } = props;
    if (this.shape !== null) {
      throw new Error('Progressbar is already created');
    }

    // 创建progressbar实例，获取progressbar.js提供的方法实现自定义progressbar动画效果
    this.shape = new ProgressBar.Path('#real-path', options);

    this.shape.set(currentProgress / totalProgress);
  }

  render() {
    return this.props.svgElement;
  }
}
