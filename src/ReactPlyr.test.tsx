/* eslint-disable */
import * as React from 'react';
import { shallow } from 'enzyme';
import ReactPlyr from './ReactPlyr';

describe('React Plyr', () => {
  let wrapper;
  let wrapper2;
  let wrapper3;
  let wrapper4;

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
        type="audio"
        url="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
      />,
    );
  });

  beforeEach(() => {
    wrapper3 = shallow(
      <ReactPlyr
        type="video"
        url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      />,
    );
  });


  beforeEach(() => {
    wrapper4 = shallow(
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
      />,
    );
  });

  it('renders a simple HTML5 Audio', () => {
    expect(wrapper.find('audio').length).toEqual(1);
    expect(wrapper.find('source').length).toEqual(2);
    expect(wrapper.prop('children')[0].props.src).toEqual("https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3");
    wrapper.setProps({
      sources:  [{
        src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
        type: 'audio/mp3',
        },
        {
          src: 'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg',
          type: 'audio/ogg',
        }] });

    expect(wrapper.prop('children')[0].props.src).toEqual("https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3");
  });

  it('renders a simple HTML5 Audio without source', () => {
    expect(wrapper2.find('audio').length).toEqual(1);
    expect(wrapper2.prop('src')).toEqual("https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3");
    wrapper2.setProps({ url: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3" });
    expect(wrapper2.prop('src')).toEqual("https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3");
  });

  it('renders a simple HTML5 Video with Sources and Captions', () => {
    expect(wrapper4.find('video').length).toEqual(1);
    expect(wrapper4.find('source').length).toEqual(4);
    expect(wrapper4.find('track').length).toEqual(2);
    expect(wrapper4.prop('children')[0][0].props.src).toEqual("https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4");
    wrapper4.setProps({
      sources: [{
        size: 576,
        src: 'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
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
        }] });

    expect(wrapper4.prop('children')[0][0].props.src).toEqual("https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4");
  });

  it('renders a simple HTML5 Video with Sources and Captions', () => {
    expect(wrapper3.find('video').length).toEqual(1);
    expect(wrapper3.prop('src')).toEqual("https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4");
    wrapper3.setProps({ url: "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" });
    expect(wrapper3.prop('src')).toEqual("https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4");
  });
});
