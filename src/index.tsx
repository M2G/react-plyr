import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

// eslint-disable-next-line
const render = (Component) => {
  const MOUNT_NODE = document.getElementById('root');
  if (MOUNT_NODE) {
    ReactDOM.render(<Component />, MOUNT_NODE);
  }
};

render(App);
