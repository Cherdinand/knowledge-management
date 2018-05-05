import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Class from '../markdown/class.md';
import Love from '../markdown/love.md';
import './index.scss';

const A = () => {
  return "# Hello, world!"
};

class App extends Component {
  render() {
    return (
      <div>
        
        # Hello, world!
        
        <Class />
        <Love />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);