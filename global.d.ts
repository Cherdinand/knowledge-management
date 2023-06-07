// ts compiler只认识.ts .tsx，添加这些是为了告诉ts compiler这些后缀的文件存在
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.md';

// 补充说明没有ts版本的repository
declare module 'classnames';
declare module 'react-medium-image-zoom';
declare module 'progressbar.js' {
  const Path: any;

  export type Shape = {
    [key: string]: any;
  } | null;
}
