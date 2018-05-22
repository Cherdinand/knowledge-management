import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';

import styles from './index.scss';

const H3 = props => (
  <h3 id={`${props.children}`} className={styles.titleWrap}>
    <a className={styles.anchors} href={`#${props.children}`}>
      <span className={styles.name}>{props.children}</span>
      <Icon className={styles.link} type="link" />
    </a>
  </h3>
);

const InlineCode = props => <code className={styles.inlineCode} {...props} />;

const Blockquote = props => {
  const type = props.children[1].props.children;
  
  return (
    <blockquote className={classnames(styles.tips, {[styles.info]: type === "info", [styles.warning]: type === "warning"})} {...props} />
  )
};

const Em = props => <em className={styles.em} {...props} />;

export {
  H3,
  InlineCode,
  Blockquote,
  Em,
}