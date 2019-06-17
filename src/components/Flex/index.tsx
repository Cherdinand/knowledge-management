import React, {Component} from 'react';
import { Row, Col, Button } from 'antd';
import FlexContainer from './components/FlexContainer';
import FlexItems from './components/FlexItems';

import styles from './index.scss';

const justifyContentVals = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'];
const alignItemsVals = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'];
const alignContentVals = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch'];

const flexVals = ['auto', 'none', '1'];

type State = {
  outerStyles: React.CSSProperties,
  innerStyles: React.CSSProperties
}

export default class Flex extends Component<{}, State> {
  state = {
    outerStyles: {
      justifyContent: "flex-start",
      alignItems: "stretch",
      alignContent: "stretch"
    },
    innerStyles: {
      flex: "auto"
    },
  };
  
  handleOuterClick = (property: string, value: string, e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e)
    const outerStyles = {
      ...this.state.outerStyles,
      [property]: value,
    };
    this.setState({
      outerStyles,
    });
  };
  
  handleInnerClick = (value: string): void => {
    const innerStyles = {
      ...this.state.innerStyles,
      flex: value,
    };
    this.setState({
      innerStyles,
    });
  };
  
  render() {
    const { outerStyles, innerStyles} = this.state;
    const { justifyContent, alignItems, alignContent} = outerStyles;
    const { flex } = innerStyles;
    return (
      <div>
        { this.props.children }
        
        <FlexContainer outerStyles={outerStyles}/>
        
        <Row>
          <Col span={5}>
            <div className={styles.textShow}>justify-content : {justifyContent}</div>
            <div className={styles.textShow}>align-items : {alignItems}</div>
            <div className={styles.textShow}>align-content : {alignContent}</div>
          </Col>
          <Col span={19}>
            <div className={styles.btnWrap}>
              {
                justifyContentVals.map(val => {
                  return <Button key={val + 1} type="primary" onClick={this.handleOuterClick.bind(this,"justifyContent",val)}>{val}</Button>
                })
              }
            </div>
            <div className={styles.btnWrap}>
              {
                alignItemsVals.map(val => {
                  return <Button key={val + 2} type="primary" onClick={this.handleOuterClick.bind(this,"alignItems",val)}>{val}</Button>
                })
              }
            </div>
            <div className={styles.btnWrap}>
              {
                alignContentVals.map(val => {
                  return <Button key={val + 3} type="primary" onClick={this.handleOuterClick.bind(this,"alignContent",val)}>{val}</Button>
                })
              }
            </div>
          </Col>
        </Row>
        
        <FlexItems innerStyles={innerStyles}/>
        
        <Row>
          <Col span={5}>
            <div className={styles.textShow}>flex : {flex}</div>
          </Col>
          <Col span={19}>
            <div className={styles.btnWrap}>
              {
                flexVals.map(val => {
                  return <Button key={val} type="primary" onClick={this.handleInnerClick.bind(this,val)}>{val}</Button>
                })
              }
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
