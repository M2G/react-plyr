/* eslint-disable */
import React from 'react';

// import ReactPlyr from '../build/react-plyr';
// import '@m2g/react-plyr/build/react-plyr.css';
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
  /*
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
*/

  return (
    <div>
      {/*<button onClick={() =>
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
          }] })}>click</button>*/}

      <ReactPlyr
        onPause={pause}
        onPlay={play}
        isHls
        type='video'
        title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
        url="https://stream.mux.com/Wxle5yzErvilJ02C13zuv8OSeROvfwsjS.m3u8"
      />

      {/*
      <ReactPlyr
        onPause={pause}
        onPlay={play}
        poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
        settings={['quality', 'captions']}
        sources={[{
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
        }]}
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
      /> */}
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
