import React, {Component} from 'react';
import { Alert } from 'antd';
import classnames from 'classnames';

import styles from './index.scss';


export default (props) => {
  const { type } = props;
  
  return (
    <Alert
      className={classnames(styles.mb15,{[styles.warning]: type === "warning", [styles.info]: type === "info"})}
      {...props}
    />
  )
}
