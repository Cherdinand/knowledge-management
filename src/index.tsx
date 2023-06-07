import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/common/components/App/index';

// @tsignore: never use
// 将所有图片的引用放在入口文件中，省去每次都要import的麻烦。 todo 以后看是否要按需加载
import * as images from '@/markdown/images';

// todo 研究一下为什么引用了全部但是不使用的时候webpackdevserver不把图片打包进去
console.log('——————————————————————————', images);

import './markdown.scss';

ReactDOM.render(<App />, document.getElementById('root'));
