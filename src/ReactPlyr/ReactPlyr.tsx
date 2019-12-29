import * as React from 'react';
import * as PropTypes from 'prop-types';
import Plyr from 'plyr';
import defaultProps from './defaultProps';
import AudioType from './types';
import { CONSTROLS, EVENTS, SETTINGS } from './constants';
// import isEmptyObject from '../Utils/utils';
import 'plyr/src/sass/plyr.scss';

/*
 * Typescript: Static type check.
 * PropTypes: Runtime type check.
 */

const {
  READY,
  PLAY: EVENTPLAY,
  PAUSE,
  ENDED,
  LOADEDDATA,
  SEEKED,
  RATECHANGE,
  TIMEUPDATE,
  ENTERFULLSCREEN,
  EXITFULLSCREEN,
  VOLUMECHANGE,
  LANGUAGECHANGE,
  CONTROLSHIDDEN,
  CONTROLSSHOWN,
  CAPTIONSENABLED,
  CAPTIONSDISABLED,
} = EVENTS;

const {
  PLAY_LARGE,
  PLAY: CONTROLSPAY,
  PROGRESS,
  CURRENT_TIME,
  MUTE,
  VOLUME,
  CAPTION,
  SETTINGS: CONSTROLSSETTINGS,
  PIP,
  AIRPLAY,
  FULLSCREEN,
} = CONSTROLS;

const {
  CAPTIONS,
  QUALITY,
  SPEED,
  LOOP,
} = SETTINGS;

export namespace PlayerNameSpace {
  export interface State {
    muted?: boolean;
    url?: string;
    sources: [],
    tracks: []
    type: string,
  }

  export interface Props {
    url?: string;
    type: string;
    title?: string;
    src?: string;
    size?: number;
    muted?: boolean;

    sources?: {
      src: string;
      type: string;
      size?: number;
    }[];

    tracks?: {
      default: boolean,
      key: any,
      kind: string;
      label: string;
      srcLang: string;
      src: string;
    }[];

    settings?: string[];

    preload?: string;
    poster?: string;
    autoplay: boolean;

    onReady?: (player: Function) => void;
    onPlay?: () => void;
    onPause?: () => void;
    onEnd?: () => void;
    onLoadedData?: () => void;
    onSeeked?: (
      time: number | string | undefined | null,
    ) => void;
    onRateChange?: (speed: any) => void;
    onTimeUpdate?: (
      currentTime: number | string | undefined | null,
    ) => void;
    onEnterFullscreen?: () => void;
    onExitFullscreen?: () => void;
    onVolumeChange?: (p: { volume: any; muted: any }) => void;
    onLanguageChange?: (language: any) => void;
    onControlsHidden?: () => void;
    onControlsShown?: () => void;
    onCaptionsEnabled?: () => void;
    onCaptionsDisabled?: () => void;
  }
}

const pick = (object: {} = {}, keys :any[] = []) => {
  const obj :{} = {};
  if (keys?.length) {
    for (let index = 0; index < keys.length; index += 1) {
      if (object && Object.prototype.hasOwnProperty.call(object, keys[index])) {
        obj[keys[index]] = object[keys[index]];
      }
    }
  }
  return obj;
};
const difference = (arrays: any[] = []) => arrays
  .reduce((accumulator, currentValue) => accumulator
    .filter((value) => !currentValue.includes(value)));

class ReactPlyr extends React.Component
  <PlayerNameSpace.Props, PlayerNameSpace.State, any> {
  private readonly elementRef;
  private player: any;
  private readonly restProps: any[];

  static propTypes = {
    autopause: PropTypes.bool,
    autoplay: PropTypes.bool,
    blankVideo: PropTypes.string,
    captions: PropTypes.shape({
      active: PropTypes.bool,
      language: PropTypes.string,
      update: PropTypes.bool,
    }),
    clickToPlay: PropTypes.bool,
    controls: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOf([
          PLAY_LARGE,
          CONTROLSPAY,
          PROGRESS,
          CURRENT_TIME,
          MUTE,
          VOLUME,
          CAPTION,
          CONSTROLSSETTINGS,
          PIP,
          AIRPLAY,
          FULLSCREEN,
        ]),
      ),
      PropTypes.func,
      PropTypes.object,
      PropTypes.bool,
    ]),
    debug: PropTypes.bool,
    disableContextMenu: PropTypes.bool,
    displayDuration: PropTypes.bool,
    duration: PropTypes.number,
    enabled: PropTypes.bool,
    fullscreen: PropTypes.shape({
      enabled: PropTypes.bool,
      fallback: PropTypes.bool,
      iosNative: PropTypes.bool,
    }),
    hideControls: PropTypes.bool,
    iconPrefix: PropTypes.string,
    iconUrl: PropTypes.string,
    invertTime: PropTypes.bool,
    keyboard: PropTypes.shape({
      focused: PropTypes.bool,
      global: PropTypes.bool,
    }),
    loadSprite: PropTypes.bool,
    loop: PropTypes.shape({
      active: PropTypes.bool,
    }),
    muted: PropTypes.bool,
    onCaptionsDisabled: PropTypes.func,
    onCaptionsEnabled: PropTypes.func,
    onControlsHidden: PropTypes.func,
    onControlsShown: PropTypes.func,
    onEnd: PropTypes.func,
    onEnterFullscreen: PropTypes.func,
    onExitFullscreen: PropTypes.func,
    onLanguageChange: PropTypes.func,
    onLoadedData: PropTypes.func,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    onRateChange: PropTypes.func,
    onReady: PropTypes.func,
    onSeeked: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onVolumeChange: PropTypes.func,
    poster: PropTypes.string,
    preload: PropTypes.string,
    quality: PropTypes.shape({
      default: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
      ]),
      options: PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ),
    }),
    ratio: PropTypes.string,
    resetOnEnd: PropTypes.bool,
    seekTime: PropTypes.number,
    settings: PropTypes.arrayOf(
      PropTypes.oneOf([
        CAPTIONS,
        QUALITY,
        SPEED,
        LOOP,
      ]),
    ),
    sources: PropTypes.arrayOf(
      PropTypes.shape({
        size: PropTypes.number,
        src: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    ),
    speed: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.number),
      selected: PropTypes.number,
    }),
    storage: PropTypes.shape({
      enabled: PropTypes.bool,
      key: PropTypes.string,
    }),
    title: PropTypes.string,
    toggleInvert: PropTypes.bool,
    tracks: PropTypes.arrayOf(
      PropTypes.shape({
        default: PropTypes.bool,
        key: PropTypes.any,
        kind: PropTypes.string,
        label: PropTypes.string,
        src: PropTypes.string.isRequired,
        srcLang: PropTypes.string,
      }),
    ),
    type: PropTypes.oneOf([
      AudioType.Video, AudioType.Audio,
    ]).isRequired,
    url: PropTypes.string,
    volume: PropTypes.number,
  };
  static defaultProps = {
    onCaptionsDisabled: () => {},
    onCaptionsEnabled: () => {},
    onControlsHidden: () => {},
    onControlsShown: () => {},
    onEnd: () => {},
    onEnterFullscreen: () => {},
    onExitFullscreen: () => {},
    onLanguageChange: () => {},
    onLoadedData: () => {},
    onPause: () => {},
    onPlay: () => {},
    onRateChange: () => {},
    onReady: () => {},
    onSeeked: () => {},
    onTimeUpdate: () => {},
    onVolumeChange: () => {},

    preload: 'none',
    sources: [],
    tracks: [],
    type: '',
    url: null,

    ...defaultProps,
  };

  constructor(props: Readonly<PlayerNameSpace.Props>) {
    super(props);

    this.state = {
      muted: false,
      sources: [],
      tracks: [],
      type: '',
    };

    this.restProps = difference([Object.keys(this.props), Object.keys(ReactPlyr.defaultProps)]);
    this.elementRef = React.createRef();
    this.player = null;
  }

  /*
   *static getDerivedStateFromProps(
   *{ muted: mutedNextProps }: { muted: boolean },
   *{ muted: mutedPrevSate }: { muted: boolean },
   *) {
   */


  static getDerivedStateFromProps(mutedNextProps, mutedPrevSate) {
    console.log('getDerivedStateFromProps mutedNextProps', mutedNextProps);
    console.log('getDerivedStateFromProps mutedPrevSate', mutedPrevSate);

    /*
     *if (mutedNextProps !== mutedPrevSate) {
     *return {
     *  muted: mutedNextProps,
     *};
     *}
     */

    // No state update necessary
    return null;
  }

  public componentDidMount() {
    const { muted: mutedDState = false } = this.state;
    const defaultOptions = Object.keys(defaultProps).reduce(
      (acc, current) => ({
        ...acc,
        // eslint-disable-next-line react/destructuring-assignment
        [current]: this.props[current],
      }),
      {},
    );

    console.log('defaultOptions', defaultOptions);

    const options = {
      ...defaultOptions,
      muted: mutedDState,
    };

    const node = this.elementRef.current;

    this.player = node ? new Plyr(node, options) : null;

    if (!this.player) return;

    const {
      autoplay,
      onReady,
      onPlay,
      onPause,
      onEnd,
      onLoadedData,
      onSeeked,
      onRateChange,
      onTimeUpdate,
      onEnterFullscreen,
      onExitFullscreen,
      onVolumeChange,
      onLanguageChange,
      onControlsHidden,
      onControlsShown,
      onCaptionsEnabled,
      onCaptionsDisabled,
    } = this.props;

    this.player.on(READY, () => {
      onReady && onReady(this.player);
      if (autoplay) {
        this.player?.play();
      }
    });

    const {
      speed, muted, volume, language,
    } = this.player;

    this.player.on(
      EVENTPLAY, () => onPlay && onPlay(),
    );
    this.player.on(
      PAUSE, () => onPause && onPause(),
    );
    this.player.on(
      ENDED, () => onEnd && onEnd(),
    );
    this.player.on(
      LOADEDDATA,
      () => onLoadedData && onLoadedData(),
    );
    this.player.on(
      SEEKED,
      () => onSeeked && onSeeked(this.getCurrentTime()),
    );
    this.player.on(
      RATECHANGE,
      () => onRateChange && onRateChange(speed),
    );
    this.player.on(
      TIMEUPDATE,
      () => onTimeUpdate && onTimeUpdate(this.getCurrentTime()),
    );
    this.player.on(
      ENTERFULLSCREEN,
      () => onEnterFullscreen && onEnterFullscreen(),
    );
    this.player.on(
      EXITFULLSCREEN,
      () => onExitFullscreen && onExitFullscreen(),
    );
    this.player.on(
      VOLUMECHANGE,
      () => onVolumeChange && onVolumeChange({ muted, volume }),
    );
    this.player.on(
      LANGUAGECHANGE,
      () => onLanguageChange && onLanguageChange(language),
    );
    this.player.on(
      CONTROLSHIDDEN,
      () => onControlsHidden && onControlsHidden(),
    );
    this.player.on(
      CONTROLSSHOWN,
      () => onControlsShown && onControlsShown(),
    );
    this.player.on(
      CAPTIONSENABLED,
      () => onCaptionsEnabled && onCaptionsEnabled(),
    );
    this.player.on(
      CAPTIONSDISABLED,
      () => onCaptionsDisabled && onCaptionsDisabled(),
    );
  }

  /*
   *
   *public shouldComponentUpdate(
   *  { url: nextPropsUrl }: Readonly<PlayerNameSpace.Props>,
   *  { muted: nextStateMuted }: Readonly<PlayerNameSpace.State>,
   *): any {
   */


  // eslint-disable-next-line class-methods-use-this
  public shouldComponentUpdate(nextProps: Readonly<PlayerNameSpace.Props>,
    nextState: Readonly<PlayerNameSpace.State>): any {
    console.log('shouldComponentUpdate nextStateMuted', nextState);
    console.log('shouldComponentUpdate nextStateUrl', nextProps);
    console.log('shouldComponentUpdate this.props', this.props);
    console.log('shouldComponentUpdate this.state', this.state);

    // const { muted = false, url = '' } = this.state;

    // return muted !== nextStateMuted || url !== nextPropsUrl;

    return false;
  }

  /*
   *
   *
   *{
   *  muted: prevPropsMuted,
   *  url: prevPropsUrl,
   *}: Readonly<PlayerNameSpace.Props>) {
   *
   */


  public componentDidUpdate(prevPropsMuted, prevPropsUrl) {

    /*
     *  const {
     *  muted, poster, url, type, title, size, sourceType,
     *  } = this.props;
     *
     *  if (prevPropsMuted !== muted) {
     *  this.player.muted = muted;
     *  }
     */

    console.log('componentDidUpdate prevPropsUrl', prevPropsUrl);
    console.log('componentDidUpdate prevPropsMuted', prevPropsMuted);
    console.log('componentDidUpdate this.props', this.props);
    console.log('componentDidUpdate this.state', this.state);

    /*
     * if (prevPropsUrl !== url) {
     * url && this.updateSource({
     *   poster,
     *   size,
     *   sourceType,
     *   title,
     *   type,
     *   url,
     * });
     * }
     */

    return null;
  }

  public componentWillUnmount() {
    this.player?.destroy();
  }

  updateSource = ({
    poster = '',
    size = 0,
    sources = [],
    title = '',
    type = '',
    url = '',
  }) => {
    console.log('updateSource ::::::::::::::::::: ', {
      poster,
      size,
      sources,
      title,
      type,
      url,
    });
    // eslint-disable-next-line multiline-ternary
    this.player.source = type === AudioType.Audio
      ? {
        sources,
        title,
        // eslint-disable-next-line max-len
        // tracks: [{ default: true, kind: 'captions', label: 'English', src: '/path/to/captions.en.vtt', srclang: 'en' }],
        type,
      } : {
        poster,
        sources,
        title,
        type,
      };
  };

  decreaseVolume = (step: number) => this.player?.decreaseVolume(step);
  enterFullscreen = () => this.player?.fullscreen.enter();
  exitFullscreen = () => this.player?.fullscreen.exit();
  forward = (time: number) => this.player?.forward(time);
  getCurrentTime = () => this.player?.currentTime;
  getDuration = () => this.player?.duration;
  getType = () => this.player?.source?.type;
  getVolume = () => this.player?.volume;
  increaseVolume = (step: number) => this.player?.increaseVolume(step);
  isMuted = () => this.player?.muted;
  isPaused = () => this.player?.paused;
  setCurrentTime = (currentTime: number) => (this.player.currentTime = currentTime);
  setMuted = (muted = true) => (this.player.muted = muted);
  setVolume = (amount: number) => (this.player.volume = amount);
  stop = () => this.player?.stop();
  restart = () => this.player?.restart();
  rewind = (time: number) => this.player?.rewind(time);
  togglePlay = () => this.player?.togglePlay();
  play = () => this.player?.play();
  pause = () => this.player?.pause();
  toggleFullscreen = () => this.player?.fullscreen.toggle();
  toggleMute = () => this.player?.toggleControls(this.player.muted);

  // eslint-disable-next-line react/sort-comp
  private static captionVideo(tracks: {
    default: boolean,
    key: any,
    kind: string,
    label: string,
    src: string,
    srcLang: string
  }[] = []) {
    const captionsMap: any[] = [];

    console.log('tracks', tracks);

    if (tracks?.length) {
      for (let index = 0; index < tracks.length; index += 1) {
        const {
          kind = CAPTIONS,
          label,
          src,
          srcLang,
          default: def,
          ...attributes
        } = tracks[index];

        captionsMap.push(
          <track
            key={index}
            default={def}
            kind={kind}
            label={label}
            src={src}
            srcLang={srcLang}
            {...attributes}
          />,
        );
      }
    }
    return captionsMap;
  }

  private static sourcesVideo(sources: {
    src: string,
    type: string,
    size?: number
  }[] = []) {
    const sourcesVideo: any[] = [];

    if (sources?.length) {
      for (let index = 0; index < sources.length; index += 1) {
        const { src = '', type = '', size = 0 } = sources[index];
        sourcesVideo.push(
          <source
            key={index}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            size={size}
            src={src}
            type={type}
          />,
        );
      }
    }

    return sourcesVideo;
  }

  private static audioSource(sources: any[] = []) {
    const audioSource: any[] = [];

    if (sources?.length) {
      for (let index = 0; index < sources.length; index += 1) {
        const { src = '', type = '' } = sources[index];
        audioSource.push(<source key={index} src={src} type={type} />);
      }
    }

    return audioSource;
  }

  private renderPlayerWithSRC = () => {
    const {
      sources = [],
      tracks = [],
      url = '',
      preload,
      poster,
    } = this.props;

    if (sources?.length) {
      return (
        <video
          ref={this.elementRef}
          poster={poster}
          preload={preload}
          {...pick(this.props, this.restProps)}
        >
          {ReactPlyr.sourcesVideo(sources)}
          {ReactPlyr.captionVideo(tracks)}
        </video>
      );
    }

    return (
      <video
        ref={this.elementRef}
        poster={poster}
        preload={preload}
        src={url}
        {...pick(this.props, this.restProps)}
      >
        {ReactPlyr.captionVideo(tracks)}
      </video>
    );
  };

  private renderAudioPlayer = () => {
    const {
      sources = [], url, preload, ...rest
    } = this.props;

    console.log('renderAudioPlayer ', this.props);

    if (sources?.length) {
      return (
        <audio ref={this.elementRef} preload={preload}>
          {ReactPlyr.audioSource(sources)}
        </audio>
      );
    }

    return (
      <audio
        ref={this.elementRef}
        preload={preload}
        src={url}
        {...pick(rest, this.restProps)}
      />
    );
  };

  public render(): React.ReactElement<{}> {
    const { type = '' } = this.props;
    return type === AudioType.Video ? this.renderPlayerWithSRC() : this.renderAudioPlayer();
  }
}

export default ReactPlyr;
