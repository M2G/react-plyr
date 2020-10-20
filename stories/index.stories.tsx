/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { action } from '@storybook/addon-actions';
import ReactPlyr from '../src/ReactPlyr';
import './withWrapper';
import './updateVideoSource';
import './updateVideoUrl';

storiesOf('React Plyr', module)
  .add('Video with all Controls', withInfo()(() => (
    <ReactPlyr
      // @ts-ignore
      controls={[
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'captions',
        'settings',
        'pip',
        'airplay',
        'fullscreen',
      ]}
      type="video"
      url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
    />
  )))
  .add('Default video with file address', withInfo()(() => (
    <ReactPlyr
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      title="View From A Blue Moon"
      type="video"
      url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
    />
  )))
  .add('Default video with multiple file addresses', withInfo()(() => (
    <ReactPlyr
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      sources={[
        {
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
        },
      ]}
      title="View From A Blue Moon"
      type="video"
    />
  )))
  .add('Player with autoplay and callbacks', withInfo()(() => (
    <ReactPlyr
      autoplay
      onControlsHidden={action('conntrols are hidden')}
      onControlsShown={action('controls are shown')}
      onEnd={action('Video has finished!')}
      onEnterFullscreen={action('Fullscreen is enabled')}
      onExitFullscreen={action('Fullscreen is disabled')}
      onPause={action('Video is paused')}
      onPlay={action('Play!')}
      onRateChange={action('onRateChange')}
      onReady={action('Video is ready!')}
      onSeeked={action('Seeked')}
      onVolumeChange={action('Volume changed')}
      // onTimeUpdate={action('time update')}
      url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
      // @ts-ignore
      volume={0.4}
      type="video"
    />
  )))
  .add('With captions', withInfo()(() => (
    <ReactPlyr
      captions={{ active: true, language: 'auto', update: false }}
      onCaptionsDisabled={action('Captions are disabled')}
      onCaptionsEnabled={action('Captions are enabled')}
      onLanguageChange={action('Language changed')}
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      sources={[
        {
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
      ]}
      tracks={[
        {
          default: true,
          kind: 'captions',
          label: 'English',
          src: './View_From_A_Blue_Moon_Trailer-HD.en.vtt',
          srcLang: 'en',
        },
        // @ts-ignore
        {
          kind: 'captions',
          label: 'Français',
          src: './View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
          srcLang: 'fr',
        },
      ]}
      type="video"
    />
  )))
  .add('Audio player with url', withInfo()(() => (
    <ReactPlyr
      type="audio"
      url="https://archive.org/download/testmp3testfile/mpthreetest.mp3"
    />
  )))
  .add('Audio player with sources', withInfo()(() => (
    <ReactPlyr
      sources={[
        {
          src: 'https://archive.org/download/testmp3testfile/mpthreetest.ogg',
          type: 'audio/ogg',
        },
        {
          src: 'https://archive.org/download/testmp3testfile/mpthreetest.mp3',
          type: 'audio/mpeg',
        },
      ]}
      type="audio"
    />
  )))
  .add('Multiple players on same page', withInfo()(() => [
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
  ].map((video, index) => (
    // @ts-ignore
    <ReactPlyr key={index} style={{ width: 540 }} type="video" url={video} />
  ))));
