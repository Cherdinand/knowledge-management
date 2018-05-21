import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'common/components/Home';
import App from 'common/components/App';
// import './markdown.scss';
import { hot } from 'react-hot-loader'

console.log('module', module);

export default class AppContainer extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/*<Route exact path='/' render={() => {
            return <Redirect to="es6" />
          }}/>*/}
          <Route exact path='/' component={Home}/>
          <Route path="/:moduleName" component={App} />
        </Switch>
      </BrowserRouter>
    )
  }
}