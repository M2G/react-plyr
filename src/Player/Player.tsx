import * as React from 'react';
import * as PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Plyr from 'plyr';
import defaultProps from './defaultProps';
import 'plyr/src/sass/plyr.scss';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function pick(object = {}, keys = []) {
  const obj = {};
  for (let i = 0; i < keys.length; i += 1) {
    // eslint-disable-next-line no-prototype-builtins
    if (object && object.hasOwnProperty(keys[i])) {
      obj[keys[i]] = object[keys[i]];
    }
  }
  return obj;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function difference(arrays: any[] | string[][]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const obj = {};
  let match;

  for (let i = 0; i < arrays.length; i += 1) {
    obj[i] = arrays[i];
  }

  if (obj && obj[0]) {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in obj[0]) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj[0].hasOwnProperty(key)) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        match = contains(obj[0][key], obj[1]);
      }
    }
  }
  // eslint-disable-next-line no-shadow
  function contains(a: { [x: string]: any; length: any; }, obj: any) {
    let i = a.length;
    // eslint-disable-next-line no-cond-assign
    while (i -= 1) {
      if (a[i] === obj) {
        return true;
      }
    }
    return false;
  }

  return !match ? [] : match;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Player {
  export interface State {
    muted: boolean;
  }

  export interface Props {
    url?: string;
    type: string;
    title?: string;
    size?: number;
    src?: string;

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

    preload?: string;
    poster?: string;
    autoplay: boolean;
    sourceType?: string;

    onReady?: (player: any) => void;
    onPlay?: () => void;
    onPause?: () => void;
    onEnd?: () => void;
    onLoadedData?: () => void;
    onSeeked?: (time: number | string | undefined | null | any) => void;
    onRateChange?: (speed: any) => void;
    onTimeUpdate?: (currentTime: number | string | undefined | null | any) => void;
    onEnterFullscreen?: () => void;
    onExitFullscreen?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onVolumeChange?: (p: { volume: any; muted: any }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLanguageChange?: (language: any) => void;
    onControlsHidden?: () => void;
    onControlsShown?: () => void;
    onCaptionsEnabled?: () => void;
    onCaptionsDisabled?: () => void;
  }
}

class Player extends React.Component<Player.Props, Player.State> {
  private readonly elementRef :
    | React.RefObject<HTMLAudioElement>
    | React.RefObject<HTMLVideoElement>;
  private player: any;
  private readonly restProps: boolean | never[] | undefined;

  constructor(props: Readonly<Player.Props>) {
    super(props);

    this.state = {
      muted: false,
    };

    this.restProps = difference([
      Object.keys(this.props),
      Object.keys(Player.defaults),
    ]);

    console.log('this.props :::::::::: ', this.props);

    this.elementRef = new React.createRef();
    this.player = null;
  }

  static getDerivedStateFromProps(
    { muted: mutedNextProps },
    { muted: mutedPrevSate },
  ) {
    if (mutedNextProps !== mutedPrevSate) {
      return {
        muted: mutedNextProps,
      };
    }
    return null;
  }

  componentDidMount() {
    const defaultOptions = {
      ...defaultProps,
      ...this.props,
    };
    const options = {
      ...defaultOptions,
      muted: this.state.muted,
    };

    const node = this.elementRef.current;

    this.player = node ? new Plyr(node, options) : null;

    if (this.player) {
      this.player.on('ready', () => {
        this.props.onReady && this.props.onReady(this.player);
        if (this.props.autoplay) {
          this.player.play();
        }
      });

      this.player.on('play', () => {
        this.props.onPlay && this.props.onPlay();
      });

      this.player.on('pause', () => {
        this.props.onPause && this.props.onPause();
      });

      this.player.on('ended', () => {
        this.props.onEnd && this.props.onEnd();
      });

      this.player.on('loadeddata', () => {
        this.props.onLoadedData && this.props.onLoadedData();
      });

      this.player.on('seeked', () => {
        this.props.onSeeked && this.props.onSeeked(this.getCurrentTime());
      });

      this.player.on('ratechange', () => {
        const { speed } = this.player;
        this.props.onRateChange && this.props.onRateChange(speed);
      });

      this.player.on('timeupdate', () => {
        this.props.onTimeUpdate && this.props.onTimeUpdate(this.getCurrentTime());
      });

      this.player.on('enterfullscreen', () => {
        this.props.onEnterFullscreen && this.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', () => {
        this.props.onExitFullscreen && this.props.onExitFullscreen();
      });

      this.player.on('volumechange', () => {
        const { muted, volume } = this.player;
        this.props.onVolumeChange && this.props.onVolumeChange({ muted, volume });
      });

      this.player.on('languagechange', () => {
        const { language } = this.player;
        this.props.onLanguageChange && this.props.onLanguageChange(language);
      });

      this.player.on('controlshidden', () => {
        this.props.onControlsHidden && this.props.onControlsHidden();
      });

      this.player.on('controlsshown', () => {
        this.props.onControlsShown && this.props.onControlsShown();
      });

      this.player.on('captionsenabled', () => {
        this.props.onCaptionsEnabled && this.props.onCaptionsEnabled();
      });

      this.player.on('captionsdisabled', () => {
        this.props.onCaptionsDisabled && this.props.onCaptionsDisabled();
      });
    }
  }

  // @ts-ignore
  componentDidUpdate(prevProps: { muted: any; url: any; }) {
    if (prevProps.muted !== this.props.muted) {
      this.player.muted = this.props.muted;
    }

    console.log('componentDidUpdate prevProps', prevProps);
    console.log('componentDidUpdate prevProps', this.props);

    if (prevProps.url !== this.props.url) {
      this.props.url &&
        this.updateSource({
          type: this.props.type,
          title: this.props.title,
          size: this.props.size,
          src: this.props.src,
          sourceType: this.props.sourceType,
        });
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  /*
  Video example:

  player.source = {
      type: 'video',
      title: 'Example title',
      sources: [
          {
              src: '/path/to/movie.mp4',
              type: 'video/mp4',
              size: 720,
          },
          {
              src: '/path/to/movie.webm',
              type: 'video/webm',
              size: 1080,
          },
      ],
      poster: '/path/to/poster.jpg',
      tracks: [
          {
              kind: 'captions',
              label: 'English',
              srclang: 'en',
              src: '/path/to/captions.en.vtt',
              default: true,
          },
          {
              kind: 'captions',
              label: 'French',
              srclang: 'fr',
              src: '/path/to/captions.fr.vtt',
          },
      ],
  };

Audio example:

  player.source = {
    type: 'audio',
    title: 'Example title',
    sources: [
        {
            src: '/path/to/audio.mp3',
            type: 'audio/mp3',
        },
        {
            src: '/path/to/audio.ogg',
            type: 'audio/ogg',
        },
    ],
};
*/

  updateSource = ({
    type = '',
    title = '',
    size = 0,
    src = '',
    sourceType = '',
  }) => {

    console.log('updateSource', { type, src })

    this.player.source = {
      type: type,
      title: title,
      sources: [
        {
          src: src,
          type: sourceType,
          size: size,
        },
      ],
    };
  };

  // Specifies the default values for props:
  static get defaults() {
    return {
      type: '',
      url: null,
      tracks: [],
      sources: [],

      onReady: () => {},
      onPlay: () => {},
      onPause: () => {},
      onEnd: () => {},
      onLoadedData: () => {},
      onSeeked: () => {},
      onRateChange: () => {},
      onTimeUpdate: () => {},
      onEnterFullscreen: () => {},
      onExitFullscreen: () => {},
      onVolumeChange: () => {},
      onLanguageChange: () => {},
      onControlsHidden: () => {},
      onControlsShown: () => {},
      onCaptionsEnabled: () => {},
      onCaptionsDisabled: () => {},
      ...defaultProps,
    };
  }
  // Specifies the default values for props:
  static get propTypes() {
    return {
      type: PropTypes.oneOf(['video', 'audio']),
      url: PropTypes.string,
      onReady: PropTypes.func,
      onPlay: PropTypes.func,
      onPause: PropTypes.func,
      onEnd: PropTypes.func,
      onLoadedData: PropTypes.func,
      onSeeked: PropTypes.func,
      onRateChange: PropTypes.func,
      onTimeUpdate: PropTypes.func,
      onEnterFullscreen: PropTypes.func,
      onExitFullscreen: PropTypes.func,
      onVolumeChange: PropTypes.func,
      onLanguageChange: PropTypes.func,
      onControlsHidden: PropTypes.func,
      onControlsShown: PropTypes.func,
      onCaptionsEnabled: PropTypes.func,
      onCaptionsDisabled: PropTypes.func,

      // plyr props
      enabled: PropTypes.bool,
      title: PropTypes.string,
      debug: PropTypes.bool,
      autoplay: PropTypes.bool,
      autopause: PropTypes.bool,
      seekTime: PropTypes.number,
      volume: PropTypes.number,
      muted: PropTypes.bool,
      duration: PropTypes.number,
      displayDuration: PropTypes.bool,
      invertTime: PropTypes.bool,
      toggleInvert: PropTypes.bool,
      ratio: PropTypes.string,
      clickToPlay: PropTypes.bool,
      hideControls: PropTypes.bool,
      resetOnEnd: PropTypes.bool,
      disableContextMenu: PropTypes.bool,
      loadSprite: PropTypes.bool,
      iconPrefix: PropTypes.string,
      iconUrl: PropTypes.string,
      blankVideo: PropTypes.string,
      quality: PropTypes.shape({
        default: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        options: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        ),
      }),
      loop: PropTypes.shape({
        active: PropTypes.bool,
      }),
      speed: PropTypes.shape({
        selected: PropTypes.number,
        options: PropTypes.arrayOf(PropTypes.number),
      }),
      keyboard: PropTypes.shape({
        focused: PropTypes.bool,
        global: PropTypes.bool,
      }),
      tooltips: PropTypes.shape({
        controls: PropTypes.bool,
        seek: PropTypes.bool,
      }),
      captions: PropTypes.shape({
        active: PropTypes.bool,
        language: PropTypes.string,
        update: PropTypes.bool,
      }),
      fullscreen: PropTypes.shape({
        enabled: PropTypes.bool,
        fallback: PropTypes.bool,
        iosNative: PropTypes.bool,
      }),
      storage: PropTypes.shape({
        enabled: PropTypes.bool,
        key: PropTypes.string,
      }),
      controls: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(
          PropTypes.oneOf([
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen',
          ]),
        ),
        PropTypes.func,
        PropTypes.object,
        PropTypes.bool,
      ]),
      settings: PropTypes.arrayOf(
        PropTypes.oneOf(['captions', 'quality', 'speed', 'loop']),
      ),
      poster: PropTypes.string,
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          size: PropTypes.number,
        }),
      ),
      tracks: PropTypes.arrayOf(
        PropTypes.shape({
          kind: PropTypes.string,
          label: PropTypes.string,
          src: PropTypes.string.isRequired,
          srcLang: PropTypes.string,
          default: PropTypes.bool,
          key: PropTypes.any,
        }),
      ),
    };
  }

  getType = () =>
    this.player && this.player.source && this.player.source.type;
  play = () => this.player && this.player.play();
  pause = () => this.player && this.player.pause();
  togglePlay = () => this.player && this.player.togglePlay();
  stop = () => this.player && this.player.stop();
  restart = () => this.player && this.player.restart();
  rewind = (time: any) => this.player && this.player.rewind(time);
  forward = (time: any) => this.player && this.player.forward(time);
  getCurrentTime = () => this.player && this.player.currentTime;
  setCurrentTime = (currentTime: any) =>
    (this.player.currentTime = currentTime);
  getDuration = () => this.player && this.player.duration;
  getVolume = () => this.player && this.player.volume;
  isMuted = () => this.player && this.player.muted;
  isPaused = () => this.player && this.player.paused;
  toggleMute = () =>
    this.player && this.player.toggleControls(this.player.muted);
  setMuted = (muted = true) => (this.player.muted = muted);
  increaseVolume = (step: any) =>
    this.player && this.player.increaseVolume(step);
  decreaseVolume = (step: any) =>
    this.player && this.player.decreaseVolume(step);
  setVolume = (amount: any) => (this.player.volume = amount);
  enterFullscreen = () =>
    this.player && this.player.fullscreen.enter();
  exitFullscreen = () => this.player && this.player.fullscreen.exit();
  toggleFullscreen = () =>
    this.player && this.player.fullscreen.toggle();

  captionVideo(tracks: { kind: string; label: string; srcLang: string; src: string; }[] | { [x: string]: any; key?: number | undefined; kind?: "captions" | undefined; label: any; src: any; srcLang: any; default: any; }[]) {
    const captionsMap = [];

    console.log('tracks', tracks);

    for (let i = 0; i < tracks.length; i += 1) {
      const {
        kind = 'captions',
        label,
        src,
        srcLang,
        // @ts-ignore
        default: def,
        ...attributes
      } = tracks[i];

      captionsMap.push(
        <track
          key={i}
          kind={kind}
          label={label}
          src={src}
          srcLang={srcLang}
          default={def}
          {...attributes}
          // @ts-ignore
          ref={this.elementRef}
        />,
      );
    }

    return captionsMap;
  }

  static sourcesVideo(sources: { src: string; type: string; size: number; }[] | { src?: "" | undefined; type?: "" | undefined; size?: 0 | undefined; }[]) {
    const sourcesVideo = [];

    console.log('sources', sources);

    for (let i = 0; i < sources.length; i += 1) {
      const { src = '', type = '', size = 0 } = sources[i];
      sourcesVideo.push(
        <source key={i} src={src} type={type} size={size} />
      );
    }

    return sourcesVideo;
  }

  // For video support for source defined as link to those video files.
  renderPlayerWithSRC = () => {
    const {
      sources = [],
      tracks = [],
      url = '',
      preload,
      poster,
      ...rest
    } = this.props;


    /*
     const captionsMap = tracks.map((source, index) => {
       const {
         key = index,
         kind = 'captions',
         label,
         src,
         srclang,
         default: def,
         ...attributes
       } = source;

       return (
         <track
           key={key}
           kind={kind}
           label={label}
           src={src}
           srclang={srclang}
           default={def}
           {...attributes}
           ref={this.elementRef}
         />
       );
     });
     */

    if (sources && sources.length) {

      return (
        <video
          preload={preload}
          poster={poster}
          ref={this.elementRef}
          {...pick(rest, this.restProps)}
        >
          {/*
          sources.map((source, index) => (
            // @ts-ignore
            <source
              key={index}
              src={source.src}
              type={source.type}
              size={source.size && source.size}
            />
          ))
          */}

          {Player.sourcesVideo(sources)}
          {this.captionVideo(tracks)}
        </video>
      );
    }

    return (
      <video
        src={url}
        preload={preload}
        poster={poster}
        ref={this.elementRef}
        {...pick(rest, this.restProps)}
      >
        {this.captionVideo(tracks)}
      </video>
    );
  };

  static audioSource(sources: { src: string; type: string; size: number; }[] | { src?: "" | undefined; type?: "" | undefined; }[]) {
    const audioSource = [];

    for (let i = 0; i < sources.length; i += 1) {
      const { src = '', type = '' } = sources[i];
      audioSource.push(<source key={i} src={src} type={type} />);
    }

    return audioSource;
  }

  renderAudioPlayer = () => {
    const { sources = [], url, preload, ...rest } = this.props;
    if (sources && sources.length) {
      return (
        <audio preload={preload} ref={this.elementRef} {...rest}>
          {
            /*
          sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))
          */}
          {Player.audioSource(sources)}
        </audio>
      );
    }

    return (
      <audio
        preload={preload}
        src={url}
        ref={this.elementRef}
        {...pick(rest, this.restProps)}
      />
    );
  };

  public render(): React.ReactElement<{}> {
    const { type = '' } = this.props;

    console.log('render', this.props);

    const render = type === 'video'
        ? this.renderPlayerWithSRC()
        : this.renderAudioPlayer();

    return render;
  }
}

export default Player;
