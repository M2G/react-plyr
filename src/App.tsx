/* eslint-disable */
import React from 'react';

import ReactPlyr from './ReactPlyr';
// import ReactPlyr from '@m2g/react-plyr';
// import '@m2g/react-plyr/build/react-plyr.css';

function play() {
  console.log('play');
}

function pause() {
  console.log('pause');
}

// https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8

function App() {
  return (
    <div>
      <ReactPlyr
        onPause={pause}
        onPlay={play}
        isHls
        type='video'
        title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
        url="https://stayinshape.s3.eu-west-3.amazonaws.com/exercice_51_planche_cote/exercice_51_planche_cote.m3u8"
      />
    </div>
  );
}

export default App;
