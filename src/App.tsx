import * as React from 'react';
import Player from './Player/Player';
import './App.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const App = () => (
  <div>
    <Player
      type="video"
      url="https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8"
    />
  </div>
);

export default App;
