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
  // @ts-ignore
  return (
    <ReactPlyr
      onPause={pause}
      onPlay={play}
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      settings={['quality', 'captions']}
      sources={[
        {
          size: 576,
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
          type: 'video/mp4',
        },
        {
          size: 720,
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
          type: 'video/mp4',
        },
        {
          size: 1080,
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
          type: 'video/mp4',
        },
        {
          size: 1440,
          src:
            'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
          type: 'video/mp4',
        },
      ]}
      title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
      tracks={
        // @ts-ignore
        [{
          kind: 'captions',
          label: 'English',
          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
          srcLang: 'en',
        },
          {
            default: true,
            kind: 'captions',
            label: 'French',
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
            srcLang: 'fr',
          }]
      }
      type="video"
      previewThumbnails={{
        enabled: true,
        src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
      }}
    />
    /*
    <div>
      <ReactPlyr
        onPause={pause}
        onPlay={play}
        isHls
        type='video'
        title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
       // url="https://stayinshape.s3.eu-west-3.amazonaws.com/exercice_51_planche_cote/x36xhzz.m3u8"
        url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
      />
    </div>*/
  );
}

export default App;
