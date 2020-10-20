/* eslint-disable */
import React, { createRef, useState } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import ReactPlyr from '../src/ReactPlyr';

const stories = storiesOf('React Plyr', module);

const videos = {
  video1: { url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4', type: 'video' },
  video2: { url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4', type: 'video' },
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
          type={videos[video].type}
          url={videos[video].url}
        />
        <hr />
        <button onClick={() => setState({ video: 'video1' })}>Set video 1 url</button>
        <button onClick={() => setState({ video: 'video2' })}>Set video 2 url</button>
      </div>
    );
}
// @ts-ignore
export default stories.add('Updating video (/w URL) on the fly', withInfo()(() => <Wrapper />));
