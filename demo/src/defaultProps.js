'use strict';

exports.__esModule = true;
var defaultProps = {
  // Disable
  enabled: true,

  // Custom media title
  title: '',

  // Logging to console
  debug: false,

  // Auto play (if supported)
  autoplay: false,

  // Only allow one media playing at once (vimeo only)
  autopause: true,

  // Default time to skip when rewind/fast forward
  seekTime: 10,

  // Default volume
  volume: 1,
  muted: false,

  // Pass a custom duration
  duration: null,

  // Display the media duration on load in the current time position
  // If you have opted to display both duration and currentTime, this is ignored
  displayDuration: true,

  // Invert the current time to be a countdown
  invertTime: true,

  // Clicking the currentTime inverts it's value to show time left rather than elapsed
  toggleInvert: true,

  // Aspect ratio (for embeds)
  ratio: '16:9',

  // Click video container to play/pause
  clickToPlay: true,

  // Auto hide the controls
  hideControls: true,

  // Reset to start when playback ended
  resetOnEnd: false,

  // Disable the standard context menu
  disableContextMenu: true,

  // Sprite (for icons)
  loadSprite: true,
  iconPrefix: 'plyr',
  iconUrl: 'https://cdn.plyr.io/3.3.5/plyr.svg',

  // Blank video (used to prevent errors on source change)
  blankVideo: 'https://cdn.plyr.io/static/blank.mp4',

  // Quality default
  quality: {
    default: 576,
    options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240, 'default']
  },

  // Set loops
  loop: {
    active: false
  },

  // Speed default and options to display
  speed: {
    selected: 1,
    options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
  },

  // Keyboard shortcut settings
  keyboard: {
    focused: true,
    global: false
  },

  // Display tooltips
  tooltips: {
    controls: false,
    seek: true
  },

  // Captions settings
  captions: {
    active: false,
    language: (navigator.language || navigator.userLanguage).split('-')[0]
  },

  // Fullscreen settings
  fullscreen: {
    enabled: true, // Allow fullscreen?
    fallback: true, // Fallback for vintage browsers
    iosNative: false // Use the native fullscreen in iOS (disables custom controls)
  },

  // Local storage
  storage: {
    enabled: true,
    key: 'plyr'
  },

  // Default controls
  controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],

  settings: ['captions', 'quality', 'speed'],

  // Localisation
  i18n: {
    restart: 'Restart',
    rewind: 'Rewind {seektime} secs',
    play: 'Play',
    pause: 'Pause',
    fastForward: 'Forward {seektime} secs',
    seek: 'Seek',
    played: 'Played',
    buffered: 'Buffered',
    currentTime: 'Current time',
    duration: 'Duration',
    volume: 'Volume',
    mute: 'Mute',
    unmute: 'Unmute',
    enableCaptions: 'Enable captions',
    disableCaptions: 'Disable captions',
    enterFullscreen: 'Enter fullscreen',
    exitFullscreen: 'Exit fullscreen',
    frameTitle: 'Player for {title}',
    captions: 'Captions',
    settings: 'Settings',
    speed: 'Speed',
    normal: 'Normal',
    quality: 'Quality',
    loop: 'Loop',
    start: 'Start',
    end: 'End',
    all: 'All',
    reset: 'Reset',
    disabled: 'Disabled',
    enabled: 'Enabled',
    advertisement: 'Ad'
  },

  // URLs
  urls: {
    vimeo: {
      sdk: 'https://player.vimeo.com/api/player.js',
      iframe: 'https://player.vimeo.com/video/{0}?{1}',
      api: 'https://vimeo.com/api/v2/video/{0}.json'
    },
    youtube: {
      sdk: 'https://www.youtube.com/iframe_api',
      api: 'https://www.googleapis.com/youtube/v3/videos?id={0}&key={1}&fields=items(snippet(title))&part=snippet',
      poster: 'https://img.youtube.com/vi/{0}/maxresdefault.jpg,https://img.youtube.com/vi/{0}/hqdefault.jpg'
    },
    googleIMA: {
      sdk: 'https://imasdk.googleapis.com/js/sdkloader/ima3.js'
    }
  },

  // API keys
  keys: {
    google: null
  },

  // Advertisements plugin
  // Register for an account here: http://vi.ai/publisher-video-monetization/?aid=plyrio
  ads: {
    enabled: false,
    publisherId: ''
  }
};

exports.default = defaultProps;
module.exports = exports['default'];