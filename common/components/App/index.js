import { hot } from 'react-hot-loader'
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from 'common/components/Home';
import BasicLayout from "common/components/BasicLayout";

@hot(module)
export default class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => {
            return <Redirect to="es6" />
          }}/>
          {/*<Route exact path='/' component={Home}/>*/}
          <Route path="/:moduleName" component={BasicLayout} />
        </Switch>
      </BrowserRouter>
    )
  }
}