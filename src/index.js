import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'common/components/Home';
import AppContainer from 'common/components/AppContainer';

import './markdown.scss';

import { setConfig } from 'react-hot-loader'
setConfig({ logLevel: 'debug' })

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    document.getElementById('root')
  );
};

render(AppContainer);
