import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Class from 'markdown/class';

import AppContainer from 'common/components/AppContainer';

import { H3, InlineCode, Code } from './ui';

import './index.scss';

class App extends Component {
  render() {
    return (
      <AppContainer>
        children
      </AppContainer>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);