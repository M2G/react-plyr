import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { withKnobs, text, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import ReactPlyr from '../src/ReactPlyr';

const stories = storiesOf('React Plyr', module);

export namespace WrapperNameSpace {
  export interface State {
    muted: boolean;
  }
}

class Wrapper extends React.Component<WrapperNameSpace.State> {
  private plyr: any;
  constructor(props) {
    super(props);

    this.state = {
      muted: false,
      playerState: 'isStopped',
    };
  }

  getState = state => {
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
  };

  handlePlay = () => {
    this.plyr.play();
    this.setState({ playerState: 'isPlaying' });
  };

  handleToogle = () => {
    this.plyr.togglePlay();
    this.setState(state => ({
      playerState: state === 'isPlaying' ? 'isPaused' : 'isPlaying',
    }));
  };

  handlePause = () => {
    this.plyr.pause();
    this.setState({ playerState: 'isPaused' });
  };

  handleStop = () => {
    this.plyr.stop();
    this.setState({ playerState: 'isStopped' });
  };

  handleRestart = () => {
    this.plyr.restart();
  };

  handleRewind = () => {
    this.plyr.rewind();
  };

  handleForward = () => {
    this.plyr.forward();
  };

  handleMute = () => {
    this.setState({ muted: true });
  };

  handleDecreaseVolume = step => {
    this.plyr.decreaseVolume(step);
  };

  handleIncreaseVolume = step => {
    this.plyr.increaseVolume(step);
  };

  handleSetFullVolume = amount => {
    this.plyr.setVolume(amount);
  };

  render() {

    // @ts-ignore
    const { muted, playerState } = this.state;

    return (
      <>
        <ReactPlyr
          type="video"
          url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
          muted={muted}
          // @ts-ignore
          volume={0.5}
          hideControls={false}
          onReady={action('Is Ready!')}
          // controls={[]}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onEnd={action('Video has finished!')}
          onEnterFullscreen={action('Fullscreen is enabled')}
          onExitFullscreen={action('Fullscreen is disabled')}
          onVolumeChange={action('Volume changed')}
          onSeeked={action('Seeked!')}
          ref={plyr => (this.plyr = plyr)}
        />

        <hr />

        <button onClick={this.handleRewind}>️⏪ Rewind</button>
        <button onClick={this.handlePlay}>️▶️ Play</button>
        <button onClick={this.handleForward}>️⏩ Forward</button>
        <button onClick={this.handleToogle}>️⏯ Toggle Playing</button>
        <button onClick={this.handlePause}>️⏸️ Pause</button>
        <button onClick={this.handleStop}>️⏹ Stop</button>
        <button onClick={this.handleRestart}>️🔄 Restart</button>

        <hr />

        <button onClick={this.handleMute}>️🔇 Mute</button>
        <button onClick={() => this.handleDecreaseVolume(0.2)}>
          ️🔉 Decrease volume
        </button>
        <button onClick={() => this.handleIncreaseVolume(0.2)}>
          ️🔊 Increase volume
        </button>
        <button onClick={() => this.handleSetFullVolume(1)}>
          ️🔊 Set volume to full
        </button>

        <hr />

        <h4>State: {this.getState(playerState)}</h4>
      </>
    );
  }
}

export default stories.add(
  'External Controls & State',
  // @ts-ignore
  withInfo()(() => <Wrapper />),
);
