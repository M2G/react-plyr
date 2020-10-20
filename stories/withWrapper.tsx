/* eslint-disable */
import React, { useState, useRef } from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import ReactPlyr from '../src/ReactPlyr';

const stories = storiesOf('React Plyr', module);

export namespace WrapperNameSpaceNS {
  export interface State {
    muted: boolean;
  }
}

function Wrapper({}:WrapperNameSpaceNS.State) {
  const ref = useRef(null);
  const [state, setState] = useState({
    muted: false,
    playerState: 'isStopped',
  });

  function getState(state){
    switch (state) {
      case 'isPlaying':
        return '▶️';
      case 'isPaused':
        return '⏸';
      case 'isStopped':
        return '⏹';
      default:
        return '⏺';
    }
  }

  function handlePlay(){
    console.log('handlePlay', ref)
    ref.current.play();
    setState({ playerState: 'isPlaying' });
  }

  function handleToogle(){
    ref.current.togglePlay();
    setState(state => ({
      playerState: state === 'isPlaying' ? 'isPaused' : 'isPlaying',
    }));
  }

  function handlePause(){
    console.log('handlePause', ref)
    ref.current.pause();
    setState({ playerState: 'isPaused' });
  }

  function handleStop(){
    ref.current.stop();
    setState({ playerState: 'isStopped' });
  }

  function handleRestart(){
    ref.current.restart();
  }

  function handleRewind(){
    ref.current.rewind();
  }

  function handleForward(){
    ref.current.forward();
  }

  function handleMute(){
    setState({ muted: true });
  }

  function handleDecreaseVolume(step){
    ref.current.decreaseVolume(step);
  }

  function handleIncreaseVolume(step){
    ref.current.increaseVolume(step);
  }

  function handleSetFullVolume(amount) {
    ref.current.setVolume(amount);
  }

    // @ts-ignore
    const { muted, playerState } = state;

    return (
      <div>
        <ReactPlyr
          type="video"
          url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          muted={muted}
          volume={0.5}
          hideControls={false}
          onReady={action('Is Ready!')}
          // controls={[]}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnd={action('Video has finished!')}
          onEnterFullscreen={action('Fullscreen is enabled')}
          onExitFullscreen={action('Fullscreen is disabled')}
          onVolumeChange={action('Volume changed')}
          onSeeked={action('Seeked!')}
          ref={ref}
        />
        <hr />
        <button onClick={handleRewind}>️⏪ Rewind</button>
        <button onClick={handlePlay}>️▶️ Play</button>
        <button onClick={handleForward}>️⏩ Forward</button>
        <button onClick={handleToogle}>️⏯ Toggle Playing</button>
        <button onClick={handlePause}>️⏸️ Pause</button>
        <button onClick={handleStop}>️⏹ Stop</button>
        <button onClick={handleRestart}>️🔄 Restart</button>
        <hr />
        <button onClick={handleMute}>️🔇 Mute</button>
        <button onClick={() => handleDecreaseVolume(0.2)}>
          ️🔉 Decrease volume
        </button>
        <button onClick={() => handleIncreaseVolume(0.2)}>
          ️🔊 Increase volume
        </button>
        <button onClick={() => handleSetFullVolume(1)}>
          ️🔊 Set volume to full
        </button>
        <hr />
        <h4>State: {getState(playerState)}</h4>
      </div>
    );
  }

export default stories.add(
  'External Controls & State',
  withInfo()(() => <Wrapper />),
);
