import React from 'react';
import ReactDOM from 'react-dom';

import App from "common/components/App";

// 将所有图片的引用放在入口文件中，省去每次都要import的麻烦
import 'markdown/images';

import './markdown.scss';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

