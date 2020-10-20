/* eslint-disable */
import React, { useState, createRef } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import ReactPlyr from '../src/ReactPlyr';

const stories = storiesOf('React Plyr', module);

const videos = {
  video1: {
    muted: true,
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
    sources: [{
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
    }],
    title: 'Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;',
    tracks: [{
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
    }],
    type: 'video',
  },
  video2: {
    muted: false,
    poster: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg',
    sources: [
      {
        size: 720,
        src: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
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
    ],
    title: 'Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;',
    tracks: [
      {
        default: true,
        kind: 'captions',
        label: 'French',
        src: '/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
        srcLang: 'fr',
      },
    ],
    type: 'video',
  },
};

export namespace WrapperNameSpaceNS {
  export interface State {
    video: string;
  }
}

function Wrapper({}:WrapperNameSpaceNS.State) {

  const [state, setState] = useState({
    video: 'video1',
  });

    const elementRef = createRef();

    const { video } = state;

    return (
      <div>
        <ReactPlyr
          ref={elementRef}
          muted={videos[video].muted}
          poster={videos[video].poster}
          sources={videos[video].sources}
          title={videos[video].title}
          tracks={videos[video].tracks}
          type={videos[video].type}
        />
        <hr />
        <button onClick={() => setState({ video: 'video1' })}>Set video 1 sources</button>
        <button onClick={() => setState({ video: 'video2' })}>Set video 2 sources</button>
      </div>
    );
}

// @ts-ignore
export default stories.add('Updating video (/w Source) on the fly', withInfo()(() => <Wrapper />));
