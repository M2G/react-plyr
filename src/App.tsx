import * as React from 'react';
import Player from './Player/Player';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/*
function play () {
  console.log('play')
}

function pause () {
  console.log('pause')
}
*/


const App = () => {

  return (
    <div>
      {/*
      <Player
        onPlay={play}
        onPause={pause}
        type="video"
        url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      />
      */}
      <Player
        type='video'
        settings={['quality']}
      >
        <source
          src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4'
          type='video/mp4'
          size={576}
        />
        <source
          src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4'
          type='video/mp4'
          size={720}
        />
        <source
          src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4'
          type='video/mp4'
          size={1080}
        />
        <source
          src='https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4'
          type='video/mp4'
          size={1440}
        />
        <track
          kind="captions"
          label="English"
          srcLang="en"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
          default
        />
        <track
          kind="captions"
          label="Français"
          srcLang="fr"
          src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt"
        />
      </Player>
      {/*
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
    </div>
  );
};

export default App;
