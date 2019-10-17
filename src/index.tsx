import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './serviceWorker';
import './index.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/ban-ts-ignore
// @ts-ignore
const render = Component => {
  const MOUNT_NODE = document.getElementById('root');
  if (MOUNT_NODE) ReactDOM.render(<Component />, MOUNT_NODE);
};

render(App);

unregister();
