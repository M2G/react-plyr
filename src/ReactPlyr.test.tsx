/* eslint-disable */
import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ReactPlyr from './ReactPlyr';

describe('Input', () => {
  let wrapper;
  let wrapper2;

  beforeEach(() => {
    wrapper = shallow(
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
  });


  beforeEach(() => {
    wrapper2 = shallow(
      <ReactPlyr
        type="video"
        url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      />,
    );
  });

  it('renders a simple HTML5 Audio', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('audio').length).toEqual(1);
    expect(wrapper.find('source').length).toEqual(2);
  });

  it('renders a simple HTML5 Audio without source', () => {
   // expect(toJson(wrapper2)).toMatchSnapshot();
    expect(wrapper2.find('source').src).toEqual("https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4");
  });

it('renders a simple HTML5 Video with Sources and Captions', () => {
  const wrapper = shallow(
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
      title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
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
      type="video"
    />
  );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
