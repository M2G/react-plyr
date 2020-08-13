import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './serviceWorker';
import './index.scss';

// eslint-disable-next-line @typescript-eslint/typedef
const render = (Component) => {
  const MOUNT_NODE = document.getElementById('root');
  if (MOUNT_NODE) {
    ReactDOM.render(<Component />, MOUNT_NODE);
  }
};

render(App);

unregister();


/*
import ReactPlyr from './ReactPlyr';

export default ReactPlyr;
*/
