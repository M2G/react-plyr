import * as React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Player from './Player';

it('renders a simple HTML5 Video with Captions', () => {
  const wrapper = shallow(
    <Player
      provider="html5"
      poster="/path/to/poster.jpg"
      url="mymovie.mp4"
      tracks={[
        {
          kind: 'captions',
          label: 'English captions',
          src: '/path/to/english-captions.vtt',
          srclang: 'en',
          default: true,
        },
        {
          label: 'Spanish captions',
          src: '/path/to/spanish-captions.vtt',
          srclang: 'es',
        },
      ]}
    />
  );
  expect(toJson(wrapper, { noKey: true, mode: 'deep' })).toMatchSnapshot();
});
