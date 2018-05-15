import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AppContainer from 'common/components/AppContainer';

import './markdown.scss';
// import './css/arta.css';
// import './css/tomorrow.css';
import './css/brown-paper.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => {
            return <Redirect to="es6" />
          }}/>
          <Route path="/:moduleName" component={AppContainer} />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);