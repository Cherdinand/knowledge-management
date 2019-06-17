import React from 'react';
import { Icon } from 'antd';
import ImageZoom from 'react-medium-image-zoom';
import {AProps, ImgProps, QuoteProps, StringChildren} from '@/types/ui'; 

import styles from './index.scss';

const H3: React.SFC<StringChildren> = props => (
  <h3 id={`${props.children}`} className={styles.titleWrap}>
    <a className={styles.anchors} href={`#${props.children}`}>
      <span className={styles.name}>{props.children}</span>
      <Icon className={styles.link} type="link" />
    </a>
  </h3>
);

const InlineCode: React.SFC<StringChildren> = props => <code className={styles.inlineCode} {...props} />;

const Blockquote: React.SFC<QuoteProps> = props => {
  const type = props.children[1].props.children;
  return (
    <blockquote className={styles.tips} data-type={type} {...props} />
  )
};

const Img: React.SFC<ImgProps> = props => {
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

const A: React.SFC<AProps> = props => <a href={props.href} style={{fontSize: 16}}>{props.children}<Icon type="export" /></a>;

const Em: React.SFC<StringChildren> = props => <em className={styles.em} {...props} />;

export {
  H3,
  InlineCode,
  Blockquote,
  Em,
  Img,
  A,
}