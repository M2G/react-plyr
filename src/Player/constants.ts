const EVENTS = {
  READY: 'ready',
  PLAY: 'play',
  PAUSE: 'pause',
  ENDED: 'ended',
  LOADEDDATA: 'loadeddata',
  SEEKED: 'seeked',
  RATECHANGE: 'ratechange',
  TIMEUPDATE: 'timeupdate',
  ENTERFULLSCREEN: 'enterfullscreen',
  EXITFULLSCREEN: 'exitfullscreen',
  VOLUMECHANGE: 'volumechange',
  LANGUAGECHANGE: 'languagechange',
  CONTROLSHIDDEN: 'controlshidden',
  CONTROLSSHOWN: 'controlsshown',
  CAPTIONSENABLED: 'captionsenabled',
  CAPTIONSDISABLED: 'captionsdisabled',
};

const CONSTROLS = {
  PLAY_LARGE: 'play-large',
  PLAY: 'play',
  PROGRESS: 'progress',
  CURRENT_TIME: 'current-time',
  MUTE: 'mute',
  VOLUME: 'volume',
  CAPTION: 'captions',
  SETTINGS: 'settings',
  PIP: 'pip',
  AIRPLAY: 'airplay',
  FULLSCREEN: 'fullscreen',
};

const SETTINGS = {
  CAPTIONS: 'captions',
  QUALITY: 'quality',
  SPEED: 'speed',
  LOOP:'loop'
};

export {
  EVENTS,
  CONSTROLS,
  SETTINGS
};
