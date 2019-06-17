import React from 'react';
import { Alert } from 'antd';
import classnames from 'classnames';

import styles from './index.scss';

type Props = {
  type: string,
  message: string | React.ReactNode
}

export default (props: Props) => {
  const { type, ...alertProps } = props;

  return (
    <Alert
      className={classnames(styles.mb15,{[styles.warning]: type === "warning", [styles.info]: type === "info"})}
      {...alertProps}
    />
  )
};