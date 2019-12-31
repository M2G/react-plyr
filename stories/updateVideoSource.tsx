import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import ReactPlyr from '../src/ReactPlyr/ReactPlyr';

const stories = storiesOf('React Plyr', module);

const videos = {
  video1: {
    muted: true,
    poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
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
    title: "Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;",
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
    type: 'video' },
  video2: {
    muted: false,
    poster: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg",
    sources: [
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
    title: "Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;",
    tracks: [
      {
        default: true,
        kind: 'captions',
        label: 'French',
        src: '/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
        srcLang: 'fr',
      }],
    type: 'video' },
};

export namespace WrapperNameSpace {
  export interface State {
    video: string;
  }
}

class Wrapper extends React.Component<WrapperNameSpace.State>{
   state: { video: string; };
  private elementRef: any;
  public setState: any;
  constructor(props) {
    super(props);

    this.state = {
      video: 'video1'
    };

    this.elementRef = React.createRef();
  }

  render() {

    const { video } = this.state;

    return (
      <>

        <ReactPlyr
          muted={videos[video].muted}
          poster={videos[video].poster}
          sources={videos[video].sources}
          tracks={videos[video].tracks}
          title={videos[video].title}
          type={videos[video].type}
          ref={this.elementRef}
        />

        <hr />

        <button onClick={() => this.setState({ video: 'video1' })}>Set video 1 sources</button>
        <button onClick={() => this.setState({ video: 'video2' })}>Set video 2 sources</button>
      </>
    );
  }
}


export default stories.add('Updating video (/w Source) on the fly', withInfo()(() =>
  // @ts-ignore
  <Wrapper />
));
