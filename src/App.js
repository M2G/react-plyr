import React from 'react';
import Plyr from './Plyr/Plyr'

import './App.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <div>
      <Plyr
        type="audio"
        url="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
      />
    </div>
);
}

export default App;
