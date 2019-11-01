import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Plyr from '../../src';

const stories = storiesOf('React Plyr', module);

const videos = {
  youtube: { id: 'yGh0bjzj4IQ', provider: 'youtube' },
  vimeo: { id: '76979871', provider: 'vimeo' },
};

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      video: 'youtube'
    }
  }

  render() {
    return (
      <Fragment>
        <Plyr
          videoId={videos[this.state.video].id}
          provider={videos[this.state.video].provider}
          ref={plyr => this.plyr = plyr}
        />

        <hr />

        <button onClick={() => this.setState({ video: 'youtube' })}>Set Youtube video source</button>
        <button onClick={() => this.setState({ video: 'vimeo' })}>Set Vimeo video source</button>
      </Fragment>
    );
  }
}

export default stories.add('Updating video on the fly', withInfo()(() =>
  <Wrapper />
));
