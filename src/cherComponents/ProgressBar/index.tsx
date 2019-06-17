import React, { Component } from 'react';
import CustomProgressBar from './components/CustomProgressBar';
import Alert from '@/common/components/Alert/index';
import { Button } from 'antd'; 
import { Options } from '@/types/cherComponents'; 

type State = {
  currentProgress: number,
  totalProgress: number,
  options: Options,
  svgElement: React.ReactNode | null,
  containerStyle: React.CSSProperties
}

export default class ProgressBar extends Component<{}, State> {
  state = {
    currentProgress: 10,
    totalProgress: 20,
    options: {
      strokeWidth: 3,
      belowStoke: "#d7e6be",
      aboveStoke: "rgb(114, 148, 114)",
      easing: 'easeInOut',
      duration: 1000
    },
    containerStyle: {
      width: '200px',
      height: '200px'
    },
    svgElement: null
  };

  componentDidMount(){
    const { options: { strokeWidth, belowStoke, aboveStoke }, containerStyle } = this.state; 
    this.setState({
      svgElement: (
        <div style={containerStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
            <path fillOpacity="0" strokeWidth={strokeWidth} stroke={belowStoke} d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
            <path id="real-path" fillOpacity="0" strokeWidth={strokeWidth} stroke={aboveStoke} d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
          </svg>
        </div>
      )
    })
  }
  
  animate = () => {
    this.setState({
      currentProgress: ++this.state.currentProgress
    })
  };
  
  render() {
    const { currentProgress, totalProgress, options, svgElement } = this.state;

    return (
      <div>
        <Alert
          message="基于progressbar.js写的一个react组件，可以用于自定义一条闭合曲线的svg的progressbar，此svg只能由一个path生成。"
          type="info"
        />
        {
          svgElement && (
            <CustomProgressBar
              options={options}
              currentProgress={currentProgress}
              totalProgress={totalProgress}
              svgElement={svgElement}
            />
          )
        }
       
        <Button type="primary" onClick={this.animate}>动画</Button>
      </div>
    )
  }
}
