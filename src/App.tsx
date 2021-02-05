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

      {/*  <ReactPlyr
        isHls
        type='video'
        title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
        url="https://stream.mux.com/wocZIhYzdSIO75tju01mse9eFCKDqZhdM5ax8K01xdMQw.m3u8?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZUYUJhNXoxZXg0M1ZsYXR5bGgzbkFDb29zWDYzeEplSjZXNnd0dVk2cHcifQ.eyJleHAiOjE2MDQ1OTU3NTEsImF1ZCI6InYiLCJzdWIiOiJ3b2NaSWhZemRTSU83NXRqdTAxbXNlOWVGQ0tEcVpoZE01YXg4SzAxeGRNUXcifQ.bxZfH9oF7UNcgYZTySbZuk_ROH2H1ZWKZayvX0VWD_RIlAwTXR0RZKFgffQ6a1dcNoSyWPGbuzCxcdapHex9g2CgMDa9uZen074lRVWIYT92_Jn7_biImUrpW4OSKG4XRIO0NsV1LIhnPzq6aoMj0vupMJbeWw07rk7AVOh7lDszeEH7NsoJ3kp7bnyC5kCuGP648etG6Ww005e5Dsg5K7M9pSBl7GFuL7kQ_v52ycA7f9x7oybV19jKOfysn8WZr08p24_pQM8Fz8o1o_CqAMxEz03L30VAdE5SSO6hUzAQ0I3_5U6KL8BInFm87OSVZzJANYkQEjU_OR8piadBkA"
      />
*/}
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
            src: 'https://cdn.plyr.io/static/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
            srcLang: 'en',
          },
            {
              default: true,
              kind: 'captions',
              label: 'French',
              src: 'https://cdn.plyr.io/static/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
              srcLang: 'fr',
            }]
        }
        type="video"
        previewThumbnails={{
        enabled: true,
          src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
        }}
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
