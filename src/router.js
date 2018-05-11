import React from 'react';

import Async, { AsyncMeta } from 'markdown/es6/async.md';
import Loader, { LoaderMeta } from 'markdown/es6/loader.md';

import Flex, { FlexMeta } from 'markdown/css/flex.md';

import ReactRouter4, { ReactRouter4Meta } from 'markdown/react/react-router4.md';

import SinglePage, { SinglePageMeta } from 'markdown/others/单页应用工作原理.md';
import Weixin, { WeixinMeta } from 'markdown/others/如何在微信公众号打开本地微信页面.md';

export const RouterConfig = {
  es6: [{
    path: 'async',
    menuName: "Async",
    anchors: AsyncMeta && AsyncMeta.anchors,
    component: Async,
    redirectTo: true,
  },{
    path: 'loader',
    menuName: "Loader",
    anchors: LoaderMeta && LoaderMeta.anchors,
    component: Loader
  }],
  css: [{
    path: 'flex',
    menuName: "Flex",
    anchors: FlexMeta && FlexMeta.anchors,
    component: Flex,
    redirectTo: true,
  }],
  react: [{
    path: 'react-router4',
    menuName: "ReactRouter4",
    anchors: ReactRouter4Meta && ReactRouter4Meta.anchors,
    component: ReactRouter4,
    redirectTo: true,
  }],
  others: [{
    path: '单页应用工作原理',
    menuName: "单页应用工作原理",
    anchors: SinglePageMeta && SinglePageMeta.anchors,
    component: SinglePage,
    redirectTo: true,
  },{
    path: '如何在微信公众号打开本地微信页面',
    menuName: "如何在微信公众号打开本地微信页面",
    anchors: WeixinMeta && WeixinMeta.anchors,
    component: Weixin
  }],
};
