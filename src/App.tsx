import * as React from 'react';
import Player from './Player/Player';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type

function play () {
  console.log('play')
}

function pause () {
  console.log('pause')
}

const App = () => {
  return (
    <div>
      <Player
        onPlay={play}
        onPause={pause}
        type="video"
        url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      />
    </div>
  );
};

export default App;
