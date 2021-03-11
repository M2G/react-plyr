# ReactPlyr Video/Audio Component

A React video component based on Plyr (without Youtube and Vimeo part).

## Installation

Add `@m2g/react-plyr` into your package.json dependencies:

```sh
npm install @m2g/react-plyr --save
```

## Usage

### Simple Video
```javascript
import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css';

// add the component in the render function
<ReactPlyr
  type="video"
  url="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
/>;
```

### Simple Audio
```javascript
import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css';

// add the component in the render function
<ReactPlyr
  type="audio"
  title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
  url="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
/>;
```

### Video with Source

```javascript
import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css';

// add the component in the render function
<ReactPlyr
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  settings={['quality', 'captions']}
  sources={[
    {
      size: 576,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
    },
    {
      size: 720,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
    },
    {
      size: 1080,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
    },
    {
      size: 1440,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
      type: 'video/mp4',
    },
  ]}
  title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
  type="video"
  tracks={
    // @ts-ignore
    [
      {
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
      },
    ]
  }
/>;
```

### Video with Source and caption

```javascript
import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css';

// add the component in the render function
<ReactPlyr
  poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
  settings={['quality', 'captions']}
  sources={[
    {
      size: 576,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
    },
    {
      size: 720,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
    },
    {
      size: 1080,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
    },
    {
      size: 1440,
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
      type: 'video/mp4',
    },
  ]}
  title="Kishi Bashi &ndash; &ldquo;It All Began With A Burst&rdquo;"
  type="video"
  tracks={
    // @ts-ignore
    [{
      kind: 'captions',
      label: 'English',
      src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      srcLang: 'en',
    },
      {
        default: true,
        kind: 'captions',
        label: 'French',
        src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt',
        srcLang: 'fr',
      }]
  }
  type="video"
  previewThumbnails={{
    enabled: true,
    src: ['https://cdn.plyr.io/static/demo/thumbs/100p.vtt', 'https://cdn.plyr.io/static/demo/thumbs/240p.vtt'],
  }}
/>;
```

### Audio with Source

```javascript
import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css';

// add the component in the render function
<ReactPlyr
      title='Example title'
      type="audio"
      sources={[
          {
              src: '/path/to/audio.mp3',
              type: 'audio/mp3',
          },
          {
              src: '/path/to/audio.ogg',
              type: 'audio/ogg',
          },
      ]}
/>;
```

### HLS example

```javascript
import ReactPlyr from '@m2g/react-plyr';
import '@m2g/react-plyr/build/react-plyr.css';

// add the component in the render function
<ReactPlyr
  isHls
  type='video'
  title='My title'
  url="https://stream.mux.com/Wxle5yzErvilJ02C13zuv8OSeROvfwsjS.m3u8"
/>;
```

Note: See App.tsx file on project if you want more example.

## Props

| Prop               | Prop               | Description                                                                                                                                      | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------ | -------------------|----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| enable             | Boolean            | Disable                                                                                                                                          | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| title              | String             | Custom media title                                                                                                                               | ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| debug              | Boolean            | Logging to console                                                                                                                               | false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| autoplay           | Boolean            | Auto play (if supported)                                                                                                                         | false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| autopause          | Boolean            | Only allow one media playing at once (vimeo only)                                                                                                | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| seekTime           | Number             | Default time to skip when rewind/fast forward                                                                                                    | 10                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| volume             | Boolean            | Default volume                                                                                                                                   | 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| muted              | Boolean            | Default volume (0)                                                                                                                               | false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| duration           | Number             | Pass a custom duration                                                                                                                           | null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| displayDuration    | Boolean            | Display the media duration on load in the current time position<br/> If you have opted to display both duration and currentTime, this is ignored | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| invertTime         | Boolean            | Invert the current time to be a countdown                                                                                                        | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| toggleInvert       | Boolean            | Clicking the currentTime inverts it's value to show time left rather than elapsed                                                                | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ratio              | String             | Aspect ratio (for embeds)                                                                                                                        | "16:9"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| clickToPlay        | Boolean            | Click video container to play/pause                                                                                                              | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| hideControls       | Boolean            | Auto hide the controls                                                                                                                           | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| resetOnEnd         | Boolean            | Reset to start when playback ended                                                                                                               | false                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| disableContextMenu | Boolean            | Disable the standard context menu                                                                                                                | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| loadSprite         | Boolean            | Sprite (for icons)                                                                                                                               | true                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| iconPrefix         | String             | Sprite (for icons)                                                                                                                               | "plyr"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| iconUrl            | String             | Sprite (for icons)                                                                                                                               | "https://cdn.plyr.io/3.3.5/plyr.svg"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| blankVideo         | String             | Blank video (used to prevent errors on source change)                                                                                            | "https://cdn.plyr.io/static/blank.mp4"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| quality            | Object             | Quality default                                                                                                                                  | `{ default: 576, options: [ 4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240, "default" ] }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| loop               | Boolean            | Set loops                                                                                                                                        | `{ loop: { active: false } }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| speed              | Object             | Speed default and options to display                                                                                                             | `{ selected: 1, options: [ 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2 ] }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| keyboard           | Object             | Keyboard shortcut settings                                                                                                                       | `{ focused: true, global: false }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| tooltips           | Object             | Display tooltips                                                                                                                                 | `{ controls: false, seek: true }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| captions           | Object             | Captions settings                                                                                                                                | `{ active: false, language: 'auto', update: false }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| fullscreen         | Object             | Fullscreen settings                                                                                                                              | `{ enabled: true, fallback: true, iosNative: false }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| storage            | Object             | Local storage                                                                                                                                    | `{ enabled: true, key: 'plyr' }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| controls           | Object             | Default controls                                                                                                                                 | `[ 'play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen' ]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| settings           | Object             |                                                                                                                                                  | `[ 'captions', 'quality', 'speed' ]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| i18n               | Object             | Localisation                                                                                                                                     | `{ restart: 'Restart', rewind: 'Rewind {seektime} secs', play: 'Play', pause: 'Pause', fastForward: 'Forward {seektime} secs', seek: 'Seek', played: 'Played', buffered: 'Buffered', currentTime: 'Current time', duration: 'Duration', volume: 'Volume', mute: 'Mute', unmute: 'Unmute', enableCaptions: 'Enable captions', disableCaptions: 'Disable captions', enterFullscreen: 'Enter fullscreen', exitFullscreen: 'Exit fullscreen', frameTitle: 'Player for {title}', captions: 'Captions', settings: 'Settings', speed: 'Speed', normal: 'Normal', quality: 'Quality', loop: 'Loop', start: 'Start', end: 'End', all: 'All', reset: 'Reset', disabled: 'Disabled', enabled: 'Enabled', advertisement: 'Ad' }` |
| urls               | Object             | URLs                                                                                                                                             | `{ vimeo: { sdk: 'https://player.vimeo.com/api/player.js', iframe: 'https://player.vimeo.com/video/{0}?{1}', api: 'https://vimeo.com/api/v2/video/{0}.json' }, youtube: { sdk: 'https://www.youtube.com/iframe_api', api: 'https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet', poster: 'https://img.youtube.com/vi/{0}/maxresdefault.jpg,https://img.youtube.com/vi/{0}/hqdefault.jpg' }, googleIMA: { sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js' } }`                                                                                                                                                                                            |
| keys               | Object             | API keys                                                                                                                                         | `{ google: null }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ads                | Object             | Advertisements plugin<br> Register for an account here: http://vi.ai/publisher-video-monetization/                                               | `{ enabled: false, publisherId: '', tagUrl: '' }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| tracks             | Array              |                                                                                                                                                  | `[]`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| previewThumbnails  | Object             | `enabled`: Whether to enable the preview thumbnails (they must be generated by you). `src` must be either a string or an array of strings representing URLs for the VTT files containing the image URL(s). Learn more about [preview thumbnails](#preview-thumbnails) below.  | `{ enabled: false, src: '' }`                                                                                                                                                                                                                |

## Support

Please [open an issue](https://github.com/m2g/react-plyr/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/m2g/react-plyr/compare/).
