import * as React from 'react';
// import * as PropTypes from 'prop-types';
import Plyr from 'plyr';
import defaultProps from './defaultProps';

// import AudioType from './types';

import {
  // CONSTROLS,
  EVENTS,
  //  SETTINGS
} from './constants';
import 'plyr/src/sass/plyr.scss';
// import isEmptyObject from '../Utils/utils';

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

/*
 *const {
 *  PLAY_LARGE,
 *  PLAY: CONTROLSPAY,
 *  PROGRESS,
 *  CURRENT_TIME,
 *  MUTE,
 *  VOLUME,
 *  CAPTION,
 *  SETTINGS: CONSTROLSSETTINGS,
 *  PIP,
 *  AIRPLAY,
 *  FULLSCREEN,
 *} = CONSTROLS;
 *
 *const {
 *  CAPTIONS, QUALITY, SPEED, LOOP,
 *} = SETTINGS;
 */

/*
 *function pick(object: {} = {}, keys: [] = []) {
 *  const obj = {};
 *
 *  if (keys?.length && !isEmptyObject(object)) {
 *    for (let i = 0; i < keys.length; i += 1) {
 *
 *      console.log('keys[i]', keys[i]);
 *
 *      obj[keys[i]] = object[keys[i]];
 *    }
 *  }
 *
 *  return obj;
 *}
 */

const contains = (array: [] = [], obj: {} = {}) => {
  let index = array.length || 0;
  while (index -= 1) {
    if (array[index] === obj) {
      return true;
    }
  }
  return false;
};

const difference = (arrays?: [string[], string[]]) => {
  const obj = {};
  // eslint-disable-next-line init-declarations
  let matched;

  if (arrays?.length) {
    for (let index = 0; index < arrays.length; index += 1) {
      obj[index] = arrays[index];
    }
  }
  if (obj?.[0] && obj?.[1]) {
    // eslint-disable-next-line guard-for-in
    for (const key in obj[0]) {
      // eslint-disable-next-line no-prototype-builtins
      console.log('obj[0].hasOwnProperty(key)', obj[0].hasOwnProperty(key));
      // eslint-disable-next-line no-prototype-builtins
      if (obj[0].hasOwnProperty(key)) {
        matched = contains(obj[0][key], obj[1]);
      }
    }
  }
  return matched;
};

export namespace PlayerNameSpace {
  export interface State {
    muted: boolean;
  }

  export interface Props {
    url?: string;
    type: string;
    title?: string;
    src?: string;
    muted?: boolean;

    sources?: {
      src: string;
      type: string;
      size: number;
    }[];

    tracks?: {
      kind: string;
      label: string;
      srcLang: string;
      src: string;
    }[];

    settings?: string[];

    preload?: string;
    poster?: string;
    autoplay: boolean;
    sourceType?: string;

    onReady?: (player: any) => void;
    onPlay?: () => void;
    onPause?: () => void;
    onEnd?: () => void;
    onLoadedData?: () => void;
    onSeeked?: (
      time: number | string | undefined | null | any,
    ) => void;
    onRateChange?: (speed: any) => void;
    onTimeUpdate?: (
      currentTime: number | string | undefined | null | any,
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

class Player extends React.Component<
  PlayerNameSpace.Props,
  PlayerNameSpace.State
> {
  private readonly elementRef:
    | React.RefObject<HTMLAudioElement>
    | React.RefObject<HTMLVideoElement>;
  private player: any;
  private restProps: boolean | never[] | undefined;

  static propTypes = {

    /*
     *type: PropTypes.oneOf([
     *  AudioType.Video,
     *  AudioType.Audio,
     *  AudioType.Youtube,
     *  AudioType.Vimeo,
     *]),
     *url: PropTypes.string,
     *onReady: PropTypes.func,
     *onPlay: PropTypes.func,
     *onPause: PropTypes.func,
     *onEnd: PropTypes.func,
     *onLoadedData: PropTypes.func,
     *onSeeked: PropTypes.func,
     *onRateChange: PropTypes.func,
     *onTimeUpdate: PropTypes.func,
     *onEnterFullscreen: PropTypes.func,
     *onExitFullscreen: PropTypes.func,
     *onVolumeChange: PropTypes.func,
     *onLanguageChange: PropTypes.func,
     *onControlsHidden: PropTypes.func,
     *onControlsShown: PropTypes.func,
     *onCaptionsEnabled: PropTypes.func,
     *onCaptionsDisabled: PropTypes.func,
     *
     * // plyr props
     *enabled: PropTypes.bool,
     *title: PropTypes.string,
     *debug: PropTypes.bool,
     *autoplay: PropTypes.bool,
     *autopause: PropTypes.bool,
     *seekTime: PropTypes.number,
     *volume: PropTypes.number,
     *muted: PropTypes.bool,
     *duration: PropTypes.number,
     *displayDuration: PropTypes.bool,
     *invertTime: PropTypes.bool,
     *toggleInvert: PropTypes.bool,
     *ratio: PropTypes.string,
     *clickToPlay: PropTypes.bool,
     *hideControls: PropTypes.bool,
     *resetOnEnd: PropTypes.bool,
     *disableContextMenu: PropTypes.bool,
     *loadSprite: PropTypes.bool,
     *iconPrefix: PropTypes.string,
     *iconUrl: PropTypes.string,
     *blankVideo: PropTypes.string,
     *quality: PropTypes.shape({
     *  default: PropTypes.oneOfType([
     *    PropTypes.string, PropTypes.number,
     *  ]),
     *  options: PropTypes.arrayOf(
     *    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
     *  ),
     *}),
     *loop: PropTypes.shape({
     *  active: PropTypes.bool,
     *}),
     *speed: PropTypes.shape({
     *  selected: PropTypes.number,
     *  options: PropTypes.arrayOf(PropTypes.number),
     *}),
     *keyboard: PropTypes.shape({
     *  focused: PropTypes.bool,
     *  global: PropTypes.bool,
     *}),
     *tooltips: PropTypes.shape({
     *  controls: PropTypes.bool,
     *  seek: PropTypes.bool,
     *}),
     *captions: PropTypes.shape({
     *  active: PropTypes.bool,
     *  language: PropTypes.string,
     *  update: PropTypes.bool,
     *}),
     *fullscreen: PropTypes.shape({
     *  enabled: PropTypes.bool,
     *  fallback: PropTypes.bool,
     *  iosNative: PropTypes.bool,
     *}),
     *storage: PropTypes.shape({
     *  enabled: PropTypes.bool,
     *  key: PropTypes.string,
     *}),
     *controls: PropTypes.oneOfType([
     *  PropTypes.string,
     *  PropTypes.arrayOf(
     *    PropTypes.oneOf([
     *      PLAY_LARGE,
     *      CONTROLSPAY,
     *      PROGRESS,
     *      CURRENT_TIME,
     *      MUTE,
     *      VOLUME,
     *      CAPTION,
     *      CONSTROLSSETTINGS,
     *      PIP,
     *      AIRPLAY,
     *      FULLSCREEN,
     *    ]),
     *  ),
     *  PropTypes.func,
     *  PropTypes.object,
     *  PropTypes.bool,
     *]),
     *settings: PropTypes.arrayOf(
     *  PropTypes.oneOf([CAPTIONS,
     *    QUALITY,
     *    SPEED,
     *    LOOP]),
     *),
     *poster: PropTypes.string,
     *source: PropTypes.arrayOf(
     *  PropTypes.shape({
     *    src: PropTypes.string.isRequired,
     *    type: PropTypes.string.isRequired,
     *    size: PropTypes.number,
     *  }),
     *),
     *track: PropTypes.arrayOf(
     *  PropTypes.shape({
     *    kind: PropTypes.string,
     *    label: PropTypes.string,
     *    src: PropTypes.string.isRequired,
     *    srcLang: PropTypes.string,
     *    default: PropTypes.bool,
     *    key: PropTypes.any,
     *  }),
     *),
     */
  };

  static defaultProps = {

    /*
     *source: [],
     *track: [],
     *type: '',
     *url: null,
     *
     *onReady: () => {},
     *onPlay: () => {},
     *onPause: () => {},
     *onEnd: () => {},
     *onLoadedData: () => {},
     *onSeeked: () => {},
     *onRateChange: () => {},
     *onTimeUpdate: () => {},
     *onEnterFullscreen: () => {},
     *onExitFullscreen: () => {},
     *onVolumeChange: () => {},
     *onLanguageChange: () => {},
     *onControlsHidden: () => {},
     *onControlsShown: () => {},
     *onCaptionsEnabled: () => {},
     *onCaptionsDisabled: () => {},
     *
     *...defaultProp,
     */
  };

  constructor(props: Readonly<PlayerNameSpace.Props>) {
    super(props);

    this.state = {
      muted: false,
    };

    this.restProps = difference([
      Object.keys(this.props), Object.keys(Player.defaultProps),
    ]);

    console.log('this.props :::::::::: ', this.props);
    console.log('this.restProps :::::::::: ', this.restProps);

    this.elementRef = React.createRef();
    // this.props.children
    this.player = null;
  }

  /*
   *static getDerivedStateFromProps(
   *  { muted: mutedNextProps }: { muted: any },
   *  { muted: mutedPrevSate }: { muted: any },
   *) {
   *  if (mutedNextProps !== mutedPrevSate) {
   *    return {
   *      muted: mutedNextProps,
   *    };
   *  }
   *  return null;
   *}
   */

  public componentDidMount() {
    const { muted: mutedDState = false } = this.state;
    const defaultOptions = {
      ...defaultProps,
      ...this.props,
    };

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

    this.player.on(EVENTPLAY, () => onPlay && onPlay());
    this.player.on(PAUSE, () => onPause && onPause());
    this.player.on(ENDED, () => onEnd && onEnd());
    this.player.on(LOADEDDATA, () => onLoadedData && onLoadedData());
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

  // eslint-disable-next-line class-methods-use-this
  public shouldComponentUpdate(
    // eslint-disable-next-line no-unused-vars
    nextProps: Readonly<PlayerNameSpace.Props>,
    // eslint-disable-next-line no-unused-vars
    nextState: Readonly<PlayerNameSpace.State>,
    // eslint-disable-next-line no-unused-vars
    nextContext: any,
  ): boolean {
    return true;
  }

  /*
   *public componentDidUpdate({
   *  muted: prevPropsMuted,
   *  url: prevPropsUrl,
   *}: {
   *  muted: boolean;
   *  url: string;
   *}) {
   *  const { muted, url, type, title, size, sourceType } = this.props;
   *
   *  if (prevPropsMuted !== muted) {
   *    this.player.muted = muted;
   *  }
   *
   *  console.log('componentDidUpdate prevProps', prevPropsMuted);
   *  console.log('componentDidUpdate prevProps', this.props);
   *
   *  if (prevPropsUrl !== url) {
   *    url &&
   *      this.updateSource({
   *        type,
   *        title,
   *        size,
   *        url,
   *        sourceType,
   *      });
   *  }
   *}
   */
  /*
   *updateSource = ({
   *  type = '',
   *  title = '',
   *  size = 0,
   *  url = '',
   *  sourceType = '',
   *}) => {
   *  console.log('updateSource', { type, url });
   *
   *  // statment type audio, video, vimeo & youtube
   *
   *  this.player.source = {
   *    type,
   *    title,
   *    sources: [
   *      {
   *        src: url,
   *        type: sourceType,
   *        size,
   *      },
   *    ],
   *  };
   *};
   */
  public componentWillUnmount() {
    this.player?.destroy();
  }

  getType = () => this.player?.source?.type;
  play = () => this.player?.play();
  pause = () => this.player?.pause();
  togglePlay = () => this.player?.togglePlay();
  stop = () => this.player?.stop();
  restart = () => this.player?.restart();
  rewind = (time: any) => this.player?.rewind(time);
  forward = (time: any) => this.player?.forward(time);
  getCurrentTime = () => this.player?.currentTime;
  // eslint-disable-next-line no-return-assign
  setCurrentTime = (currentTime: number) => (this.player.currentTime = currentTime);
  getDuration = () => this.player?.duration;
  getVolume = () => this.player?.volume;
  isMuted = () => this.player?.muted;
  isPaused = () => this.player?.paused;
  toggleMute = () => this.player?.toggleControls(this.player.muted);
  // eslint-disable-next-line no-return-assign
  setMuted = (muted = true) => (this.player.muted = muted);
  increaseVolume = (step: any) => this.player?.increaseVolume(step);
  decreaseVolume = (step: any) => this.player?.decreaseVolume(step);
  // eslint-disable-next-line no-return-assign
  setVolume = (amount: any) => (this.player.volume = amount);
  enterFullscreen = () => this.player?.fullscreen.enter();
  exitFullscreen = () => this.player?.fullscreen.exit();
  toggleFullscreen = () => this.player?.fullscreen.toggle();

  /*
   *captionVideo(
   *  tracks:
   *    | {
   *        kind: string;
   *        label: string;
   *        srcLang: string;
   *        src: string;
   *      }[]
   *    | {
   *        [x: string]: any;
   *        key?: number | undefined;
   *        kind?: 'captions' | undefined;
   *        label: string;
   *        src: string;
   *        srcLang: string;
   *        default: any;
   *      }[],
   *) {
   *  const captionsMap = [];
   *
   *  console.log('tracks', tracks);
   *
   *  if (tracks?.length) {
   *    for (let i = 0; i < tracks.length; i += 1) {
   *      const {
   *        kind = CAPTIONS,
   *        label,
   *        src,
   *        srcLang,
   *        default: def,
   *        ...attributes
   *      } = tracks[i];
   *
   *      captionsMap.push(
   *        <track
   *          key={i}
   *          kind={kind}
   *          label={label}
   *          src={src}
   *          srcLang={srcLang}
   *          default={def}
   *          {...attributes}
   *          ref={this.elementRef}
   *        />,
   *      );
   *    }
   *  }
   *  return captionsMap;
   *}
   */
  /*
   *static sourcesVideo(
   *  sources:
   *    | { src: string; type: string; size: number }[]
   *    | {
   *        src?: '' | undefined;
   *        type?: '' | undefined;
   *        size?: 0 | undefined;
   *      }[],
   *) {
   *  const sourcesVideo = [];
   *
   *  console.log('sources', sources);
   *
   *  if (sources?.length) {
   *    for (let i = 0; i < sources.length; i += 1) {
   *      const { src = '', type = '', size = 0 } = sources[i];
   *      sourcesVideo.push(
   *        <source key={i} src={src} type={type} size={size} />,
   *      );
   *    }
   *  }
   *
   *  return sourcesVideo;
   *}
   */

  // For video support for plyr supported videos using videoId (Youtube and Vimeo for now).
  /*
   *private renderPlayerWithVideoId = () => {
   *const { provider = '', videoId = '' } = this.props;
   *
   *return (
   *  <div
   *    data-plyr-provider={provider}
   *    data-plyr-embed-id={videoId}
   *    ref={this.elementRef}
   *    {...pick(this.props, this.restProps)}
   *  />
   *);
   *};
   */

  // For video support for source defined as link to those video files.
  /*
   *private renderPlayerWithSRC = () => {
   *const {
   *  sources = [],
   *  tracks = [],
   *  url = '',
   *  preload,
   *  poster,
   *  ...rest
   *} = this.props;
   */

  /*
   *const captionsMap = tracks.map((source, index) => {
   *  const {
   *    key = index,
   *    kind = 'captions',
   *    label,
   *    src,
   *    srclang,
   *    default: def,
   *    ...attributes
   *  } = source;
   *
   *  return (
   *    <track
   *      key={key}
   *      kind={kind}
   *      label={label}
   *      src={src}
   *      srclang={srclang}
   *      default={def}
   *      {...attributes}
   *      ref={this.elementRef}
   *    />
   *  );
   *});
   */

  /*
   * if (sources?.length) {
   * return (
   *   <video
   *     preload={preload}
   *     poster={poster}
   *     ref={this.elementRef}
   *     {...pick(rest, this.restProps)}
   *   >
   *     /*{Player.sourcesVideo(sources)}
   *     {this.captionVideo(tracks)}
   *   </video>
   * );
   * }
   */
  /*
   *return (
   *  <video
   *    ref={this.elementRef}
   *    poster={poster}
   *    preload={preload}
   *    src={url}
   *    {...pick(rest, this.restProps)}
   *  >
   *    {this.captionVideo(tracks)}
   *  </video>
   *);
   *};
   */

  /*
   *static audioSource(
   *sources:
   *  | { src: string; type: string; size: number }[]
   *  | { src?: '' | undefined; type?: '' | undefined }[],
   *) {
   *const audioSource = [];
   *
   *if (sources?.length) {
   *  for (let i = 0; i < sources.length; i += 1) {
   *    const { src = '', type = '' } = sources[i];
   *    audioSource.push(<source key={i} src={src} type={type} />);
   *  }
   *}
   *
   *return audioSource;
   *}
   */

  /*
   *private renderAudioPlayer = () => {
   *const { sources = [], url, preload, ...rest } = this.props;
   *if (sources?.length) {
   *  return (
   *    <audio preload={preload} ref={this.elementRef} {...rest}>
   *      {Player.audioSource(sources)}
   *    </audio>
   *  );
   *}
   *
   *return (
   *  <audio
   *    preload={preload}
   *    src={url}
   *    ref={this.elementRef}
   *    {...pick(rest, this.restProps)}
   *  />
   *);
   *};
   */

  /*
   *public render(): React.ReactElement<{}> {
   *const { type = '' } = this.props;
   *
   *console.log('render', this.props);
   *
   *const render =
   *  type === AudioType.Video
   *    ? this.renderPlayerWithSRC()
   *    : type === AudioType.Audio
   *    ? this.renderAudioPlayer()
   *    : this.renderPlayerWithVideoId();
   *
   *return render;
   *}
   */
  // eslint-disable-next-line class-methods-use-this
  public render(): React.ReactElement<{}> {
    // eslint-disable-next-line react/jsx-no-literals
    return (<div>ok</div>);
  }
}

export default Player;
