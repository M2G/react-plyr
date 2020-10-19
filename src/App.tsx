/* eslint-disable */
import React, { useState } from 'react';
import ReactPlyr from './ReactPlyr';

function play() {
  console.log('play');
}

function pause() {
  console.log('pause');
}

function App() {
  const [slider, setSlider] = useState({ sources: [{
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
    }] });

  console.log('slider', slider.sources)

  return (
    <div>
      <button onClick={() =>
        // @ts-ignore
        setSlider({ sources: [{
          size: 576,
          src: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
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
          }] })}>click</button>

      <ReactPlyr
        onPause={pause}
        onPlay={play}
        poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
        settings={['quality', 'captions']}
        sources={slider.sources}
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
      {/*<ReactPlyr
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
              src: '/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
              srcLang: 'en',
            },
            {
              default: true,
              kind: 'captions',
              label: 'French',
              src: '/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
              srcLang: 'fr',
            },
          ]
        }
        type="video"
      />*/}
    </div>
  );
}

export default App;
