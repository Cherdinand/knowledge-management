import React from 'react';

import Async, { AsyncMeta } from 'markdown/es6/async.md';
import Loader, { LoaderMeta } from 'markdown/es6/loader.md';

import Flex, { FlexMeta } from 'markdown/css/flex.md';

import ReactRouter4, { ReactRouter4Meta } from 'markdown/react/react-router4.md';

import _201805, { _201805Meta } from 'markdown/others/2018-05.md';

export const RouterConfig = {
  es6: [{
    path: 'async',
    menuName: "Async",
    anchors: AsyncMeta.anchors,
    component: Async,
    redirectTo: true,
  },{
    path: 'loader',
    menuName: "Loader",
    anchors: LoaderMeta.anchors,
    component: Loader
  }],
  css: [{
    path: 'flex',
    menuName: "Flex",
    anchors: FlexMeta.anchors,
    component: Flex,
    redirectTo: true,
  }],
  react: [{
    path: 'react-router4',
    menuName: "ReactRouter4",
    anchors: ReactRouter4Meta.anchors,
    component: ReactRouter4,
    redirectTo: true,
  }],
  others: [{
    path: '2018-05',
    menuName: "2018-05",
    component: _201805,
    anchors: _201805Meta.anchors,
    redirectTo: true,
  }],
};
