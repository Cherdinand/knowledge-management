import React, { Component } from 'react';
const ProgressBar = require('progressbar.js');

class CustomProgressBar extends Component {
  shape = null;

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
    const { currentProgress, totalProgress } = nextProps;
    
    // 实现动画效果
    this.shape.animate(currentProgress / totalProgress);
  }

  componentDidMount() {
    this._create(this.props);
  }

  _create(props, oldProps) {
    console.log('props',props);
    const { options, currentProgress, totalProgress } = props;
    if (this.shape !== null) {
      throw new Error('Progressbar is already created');
    }

    // 创建progressbar实例，获取progressbar.js提供的方法实现自定义progressbar动画效果
    this.shape = new ProgressBar.Path(
      '#real-path',
      options,
    );

    this.shape.set(currentProgress / totalProgress);
  }
  
  render() {
    return this.props.svgElement;
  }
};

CustomProgressBar.defaultProps = {
  options: {},
  currentProgress: 0,
  totalProgress: 20,
  svgElement: null,
};

export default CustomProgressBar;
