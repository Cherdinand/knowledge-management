import React from 'react';
import { Icon } from 'antd';

import styles from './index.scss';

const H3 = props => (
  <h3 id={`${props.children}`}>
    <a className={styles.anchors} href={`#${props.children}`}>
      {props.children}
      <Icon className={styles.link} type="link" />
    </a>
  </h3>
);

const InlineCode = props => <code className={styles.inlineCode} {...props} />;

const Blockquote = props => <blockquote className={styles.tip} {...props} />;

const Em = props => <em className={styles.em} {...props} />;

export {
  H3,
  InlineCode,
  Blockquote,
  Em,
}