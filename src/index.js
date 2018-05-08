import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import AppContainer from 'common/components/AppContainer';

import { H3, InlineCode, Code } from './ui';

import './index.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppContainer>
          children
        </AppContainer>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);