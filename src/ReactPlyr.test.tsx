/* eslint-disable */
import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactPlyr from './ReactPlyr';

it('renders a simple HTML5 Audio', () => {
  const wrapper = shallow(
    //@ts-ignore
    <ReactPlyr
      sources={
        [{
          src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
          type: 'audio/mp3',
        },
        {
          src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg',
          type: 'audio/ogg',
        }]
      }
      title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
      type="audio"
    />,
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});

it('renders a simple HTML5 Video with Captions', () => {
  const wrapper = shallow(
    //@ts-ignore
    <ReactPlyr
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      provider="video"
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
        }]
      }
      url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
    />,
  );
  expect(toJson(wrapper, { mode: 'deep', noKey: true })).toMatchSnapshot();
});

it('renders a simple HTML5 Video with Sources and Captions', () => {
  const wrapper = shallow(
    //@ts-ignore
    <ReactPlyr
      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      settings={['quality', 'captions']}
      sources={
        [{
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
        }]
      }
      tracks={
        // @ts-ignore
        [{
          kind: 'captions',
          label: 'English',
          src: '/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
          srcLang: 'en',
        },
          // @ts-ignore
        {
          kind: 'captions',
          label: 'French',
          src: '/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
          srcLang: 'fr',
        }]
      }
      type="video"
    />,
  );
  expect(toJson(wrapper, { mode: 'deep', noKey: true })).toMatchSnapshot();
});
