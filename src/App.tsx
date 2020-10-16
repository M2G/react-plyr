/* eslint-disable */
import React from 'react';
import ReactPlyr from './ReactPlyr';

function play() {
  console.log('play');
}

function pause() {
  console.log('pause');
}


const App = () => (
  <div>
    <ReactPlyr
      onPause={pause}
      onPlay={play}
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      settings={['quality', 'captions']}
      sources={
          [{
            size: 576,
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
            type: 'video/mp4',
          },
          {
            size: 720,
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
            type: 'video/mp4',
          },
          {
            size: 1080,
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
            type: 'video/mp4',
          },
          {
            size: 1440,
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
            type: 'video/mp4',
          }]
        }
      title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
      tracks={
        // @ts-ignore
          [{
            kind: 'captions',
            label: 'English',
            src: '/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
            srcLang: 'en',
          },
          {
            default: true,
            kind: 'captions',
            label: 'French',
            src: '/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
            srcLang: 'fr',
          }]
        }
      type="video"
    />
  </div>
);

export default App;
