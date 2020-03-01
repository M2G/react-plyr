import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import ReactPlyr from '../src/ReactPlyr';

const stories = storiesOf('React Plyr', module);

const videos = {
  video1: { url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4', type: 'video' },
  video2: { url: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4', type: 'video' },
};

export namespace WrapperNameSpace {
  export interface State {
    video: string;
  }
}

class Wrapper extends React.Component<WrapperNameSpace.State> {
   state: { video: string; };
  private elementRef: any;
  public setState: any;
  constructor(props) {
    super(props);

    this.state = {
      video: 'video1',
    };

    this.elementRef = React.createRef();
  }

  render() {
    const { video } = this.state;

    return (
      <>
        <ReactPlyr
          ref={this.elementRef}
          type={videos[video].type}
          url={videos[video].url}
        />

        <hr />

        <button onClick={() => this.setState({ video: 'video1' })}>Set video 1 url</button>
        <button onClick={() => this.setState({ video: 'video2' })}>Set video 2 url</button>
      </>
    );
  }
}
// @ts-ignore
export default stories.add('Updating video (/w URL) on the fly', withInfo()(() => <Wrapper />));
