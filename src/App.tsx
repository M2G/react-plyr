import * as React from 'react';
import Player from './Player/Player';

/* eslint-disable */

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/*
 *function play () {
 *  console.log('play')
 *}
 *
 *function pause () {
 *  console.log('pause')
 *}
 */

const App = () => (
  <div>
    {/*

      // you can update with url

       // VIDEO CAN UPDATE

      <Player
        onPlay={play}
        onPause={pause}
        type="video"
        url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      />

       // VIDEO CANT NOT UPDATE

       <Player
        autoplay
        muted={false}
        type='video'
        settings={['quality', 'captions']}
        poster='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg'
       >
          <source
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
            type: 'video/mp4',
            size: 576,
           />
          <source
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
            type: 'video/mp4',
            size: 720
           />
          <source
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
            type: 'video/mp4',
            size: 1080,
           />
          <source
            src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
            type: 'video/mp4',
            size: 1440
           />
           <tracks
            kind: "captions",
            label: "English",
            srcLang: "en",
            src: "/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
           >
           <tracks
              kind: "captions",
              label: "French",
              srcLang: "fr",
              src: "/View_From_A_Blue_Moon_Trailer-HD.fr.vtt",
            />
       </Player>

       // YOUTUBE

       <Player
          type='video'
          title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
        >
         <source
           src='bTqVqk7FSmY'
           provider='youtube'
        />
       </Player>

       // VIMEO

       <Player
          type='video'
          title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
        >
         <source
           src='143418951'
           provider=vimeo'
        />
       </Player>

        // AUDIO

        <Player
          type='audio'
          title='Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;'
        >
        <source
           src='https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3'
           type='audio/mp3'
        />
         <source
          src='https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg'
          type='audio/ogg'
        />
        </Player>

      */}
    <Player
      autoplay
      muted={false}
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      // @ts-ignore
      settings={['quality', 'captions']}
      type="video">
      <source
        sizes="576"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        type="video/mp4"
      />
      <source
        sizes="720"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
        type="video/mp4"
      />
      <source
        sizes="1080"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
        type="video/mp4"
      />
      <source
        sizes="1440"
        src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4"
        type="video/mp4"
      />
      <track
        kind="captions"
        label="English"
        src="/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
        srcLang="en"
      />
      <track
        kind="captions"
        label="French"
        src="/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
        srcLang="fr"
      />
    </Player>
  </div>
);

export default App;
