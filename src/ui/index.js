import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import ImageZoom from 'react-medium-image-zoom';

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

const Img = props => {
  const { src, alt, title } = props;
  
  return (
    <ImageZoom
      image={{
        src: `/assets/images/${src}`,
        alt,
        className: 'img',
        style: { width: title }
      }}
    />
  )
};

const A = ({href, children}) => <a href={href} style={{fontSize: 16}}>{children}<Icon type="export" /></a>;

const Em = props => <em className={styles.em} {...props} />;

export {
  H3,
  InlineCode,
  Blockquote,
  Em,
  Img,
  A,
}