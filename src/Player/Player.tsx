import * as React from 'react';
import * as PropTypes from 'prop-types';
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
function difference(arrays = []) {
  return arrays.reduce((a, b) => {
    return a.filter((value) => {
      return !b.includes(value);
    });
  })
}

/*
interface AppState {
  muted: boolean;
}

interface AppProps {}
<AppProps, AppState>
*/

/* eslint-disable */
// @ts-ignore
class Player extends React.Component {
  private elementRef: React.RefObject<HTMLAudioElement>; // @ts-ignore
  private static defaultProps: object;
  private player: any;
  private restProps: any;
  /*private restProps: Readonly<P> & Readonly<{ children?: React.ReactNode }> & {
    controls: string[]; seekTime: number; classNames: { embedContainer: string; paused: string; hidden: string; tooltip: string; isTouch: string; video: string; type: string; tabFocus: string; cues: string; captions: { active: string; enabled: string }; hover: string; uiSupported: string; provider: string; pip: { active: string; supported: string }; airplay: { active: string; supported: string }; embed: string; posterEnabled: string; hideControls: string; stopped: string; display: { time: string }; control: string; loading: string; menu: { badge: string; value: string; open: string }; previewThumbnails: { thumbContainer: string; scrubbingContainerShown: string; imageContainer: string; scrubbingContainer: string; thumbContainerShown: string; timeContainer: string }; controlPressed: string; ads: string; fullscreen: { fallback: string; enabled: string }; playing: string; poster: string; noTransition: string; isIos: string }; onLoadedData: () => void; clickToPlay: boolean; loop: { active: boolean }; iconUrl: string; events: string[]; onExitFullscreen: () => void; hideControls: boolean; onCaptionsDisabled: () => void; loadSprite: boolean; settings: string[]; toggleInvert: boolean; onTimeUpdate: () => void; onSeeked: () => void; onEnterFullscreen: () => void; onPlay: () => void; autoplay: boolean; i18n: { play: string; seekLabel: string; seek: string; captions: string; speed: string; enabled: string; duration: string; download: string; loop: string; buffered: string; advertisement: string; unmute: string; end: string; disabled: string; fastForward: string; menuBack: string; all: string; settings: string; normal: string; restart: string; start: string; mute: string; disableCaptions: string; frameTitle: string; played: string; pause: string; quality: string; currentTime: string; volume: string; enableCaptions: string; exitFullscreen: string; rewind: string; enterFullscreen: string; reset: string; qualityBadge: { "1080": string; "576": string; "720": string; "1440": string; "480": string; "2160": string } }; quality: { default: number; options: number[] }; volume: number; onEnd: () => void; fullscreen: { iosNative: boolean; fallback: boolean; enabled: boolean }; onRateChange: () => void; blankVideo: string; tooltips: { controls: boolean; seek: boolean }; onReady: () => void; resetOnEnd: boolean; sources: any[]; onControlsHidden: () => void; onPause: () => void; autopause: boolean; storage: { enabled: boolean; key: string }; title: string; selectors: { container: string; controls: { container: null; wrapper: string }; buttons: { play: string; settings: string; restart: string; mute: string; pause: string; captions: string; download: string; rewind: string; fullscreen: string; pip: string; loop: string; airplay: string; fastForward: string }; editable: string; inputs: { volume: string; language: string; seek: string; speed: string; quality: string }; display: { currentTime: string; duration: string; volume: string; loop: string; buffer: string }; progress: string; caption: string; menu: { quality: string }; captions: string; labels: string }; onCaptionsEnabled: () => void; enabled: boolean; speed: { options: number[]; selected: number }; captions: { active: boolean; update: boolean; language: string }; duration: null; urls: { download: null }; onControlsShown: () => void; playsinline: boolean; muted: boolean; onLanguageChange: () => void; keyboard: { focused: boolean; global: boolean }; debug: boolean; listeners: { play: null; restart: null; mute: null; language: null; seek: null; pause: null; captions: null; speed: null; quality: null; volume: null; download: null; rewind: null; fullscreen: null; pip: null; loop: null; airplay: null; fastForward: null }; onVolumeChange: () => void; previewThumbnails: { src: string; enabled: boolean }; url: null; tracks: any[]; displayDuration: boolean; iconPrefix: string; invertTime: boolean; attributes: { embed: { provider: string; id: string } }; disableContextMenu: boolean; ratio: string
  };*/

  constructor(props) {
    super(props);
    // @ts-ignore
    this.state = {
      muted: false,
    };
    // @ts-ignore
    this.restProps = difference([Object.keys(this.props), Object.keys(Player.defaults)]);
    // @ts-ignore
    this.elementRef = new React.createRef();
    this.player = null;
  }

  static getDerivedStateFromProps(nextProps, prevSate){
    // compare
    return {
      muted: nextProps.muted,
    }
  };

  componentDidMount() {
    const defaultOptions = {
      ...defaultProps,
      // @ts-ignore
      ...this.props
    };
    const options = {
      ...defaultOptions,
      // @ts-ignore
      muted: this.state.muted,
    };
    // @ts-ignore
    const { url = '' } = options;

    console.log('url', url);

    const node = this.elementRef.current;

    this.player = node ? new Plyr(node, options) : null;

    if (this.player) {
      this.player.on('ready', () => {
        // @ts-ignore
        this.props.onReady && this.props.onReady(this.player);
        // @ts-ignore
        if (this.props.autoplay) {
          this.player.play();
        }
      });

      this.player.on('play', () => {
        // @ts-ignore
        this.props.onPlay && this.props.onPlay();
      });

      this.player.on('pause', () => {
        // @ts-ignore
        this.props.onPause && this.props.onPause();
      });

      this.player.on('ended', () => {
        // @ts-ignore
        this.props.onEnd && this.props.onEnd();
      });

      this.player.on('loadeddata', () => {
        // @ts-ignore
        this.props.onLoadedData && this.props.onLoadedData();
      });

      this.player.on('seeked', () => {
        // @ts-ignore
        const time = this.getCurrentTime();
        // @ts-ignore
        this.props.onSeeked && this.props.onSeeked(time);
      });

      this.player.on('ratechange', () => {
        const { speed } = this.player;
        // @ts-ignore
        this.props.onRateChange && this.props.onRateChange(speed);
      });

      this.player.on('timeupdate', () => {
        // @ts-ignore
        const time = this.getCurrentTime();
        // @ts-ignore
        this.props.onTimeUpdate && this.props.onTimeUpdate(time);
      });

      this.player.on('enterfullscreen', () => {
        // @ts-ignore
        this.props.onEnterFullscreen && this.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', () => {
        // @ts-ignore
        this.props.onExitFullscreen && this.props.onExitFullscreen();
      });

      this.player.on('volumechange', () => {
        const { muted, volume } = this.player;
        // @ts-ignore
        this.props.onVolumeChange && this.props.onVolumeChange({ muted, volume });
      });

      this.player.on('languagechange', () => {
        const { language } = this.player;
        // @ts-ignore
        this.props.onLanguageChange && this.props.onLanguageChange(language);
      });

      this.player.on('controlshidden', () => {
        // @ts-ignore
        this.props.onControlsHidden && this.props.onControlsHidden();
      });

      this.player.on('controlsshown', () => {
        // @ts-ignore
        this.props.onControlsShown && this.props.onControlsShown();
      });

      this.player.on('captionsenabled', () => {
        // @ts-ignore
        this.props.onCaptionsEnabled && this.props.onCaptionsEnabled();
      });

      this.player.on('captionsdisabled', () => {
        // @ts-ignore
        this.props.onCaptionsDisabled && this.props.onCaptionsDisabled();
      });
    }
  }

  componentDidUpdate(prevProps) {
    // @ts-ignore
    if (prevProps.muted !== this.props.muted) {
      // @ts-ignore
      this.player.muted = this.props.muted;
    }
  }

  componentWillUnmount() {
    this.player && this.player.destroy();
  }

  // Specifies the default values for props:
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  static get defaults() {
    return {
      isHLS: false,
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
      ...defaultProps
    };
  }
  // Specifies the default values for props:
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type,react/static-property-placement
  static get propTypes() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return {
      /* eslint-disable */
      type: PropTypes.oneOf(['video', 'audio']),
      url: PropTypes.string,
      isHLS: PropTypes.bool,
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
        default: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        options: PropTypes.arrayOf(
          PropTypes.oneOfType([PropTypes.string, PropTypes.number])
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
          ])
        ),
        PropTypes.func,
        PropTypes.object,
        PropTypes.bool,
      ]),
      settings: PropTypes.arrayOf(
        PropTypes.oneOf(['captions', 'quality', 'speed', 'loop'])
      ),
      poster: PropTypes.string,
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          size: PropTypes.number,
        })
      ),
      tracks: PropTypes.arrayOf(
        PropTypes.shape({
          kind: PropTypes.string,
          label: PropTypes.string,
          src: PropTypes.string.isRequired,
          srclang: PropTypes.string,
          default: PropTypes.bool,
          key: PropTypes.any,
        })
      ),
    };
  }

  getType = () => this.player && this.player.source && this.player.source.type;
  play = () => this.player && this.player.play();
  pause = () => this.player && this.player.pause();
  togglePlay = () => this.player && this.player.togglePlay();
  stop = () => this.player && this.player.stop();
  restart = () => this.player && this.player.restart();
  rewind = time => this.player && this.player.rewind(time);
  forward = time => this.player && this.player.forward(time);
  getCurrentTime = () => this.player && this.player.currentTime;
  setCurrentTime = currentTime => (this.player.currentTime = currentTime);
  getDuration = () => this.player && this.player.duration;
  getVolume = () => this.player && this.player.volume;
  isMuted = () => this.player && this.player.muted;
  isPaused = () => this.player && this.player.paused;
  toggleMute = () => this.player && this.player.toggleControls(this.player.muted);
  setMuted = (muted = true) => (this.player.muted = muted);
  increaseVolume = step => this.player && this.player.increaseVolume(step);
  decreaseVolume = step => this.player && this.player.decreaseVolume(step);
  setVolume = amount => (this.player.volume = amount);
  enterFullscreen = () => this.player && this.player.fullscreen.enter();
  exitFullscreen = () => this.player && this.player.fullscreen.exit();
  toggleFullscreen = () => this.player && this.player.fullscreen.toggle();

  // For video support for source defined as link to those video files.
  renderPlayerWithSRC = () => {
    // @ts-ignore
    const { sources = [], url = '', preload, poster, tracks = [], ...rest } = this.props;

    let captionsMap = [];

    for (let i = 0; i < tracks.length; i += 1) {
      const { source = {}} = tracks[i];
      const {
        key = i,
        kind = 'captions',
        label,
        src,
        srclang,
        default: def,
        ...attributes
      } = source;

      captionsMap.push(
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
    }


    /* const captionsMap = tracks.map((source, index) => {
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
     });*/

    if (sources && sources.length) {

      let sourcesVideo = [];

      for (let i = 0; i < sources.length; i += 1) {
        const { src = '', type = '', size = '' } = sources[i];
        sourcesVideo.push(
          // @ts-ignore
          <source
            key={i}
            src={src}
            type={type}
            size={size}
          />)
      }


      // @ts-ignore
      return (
        <video
          preload={preload}
          poster={poster}
          // @ts-ignore
          ref={this.elementRef}
          {...pick(rest, this.restProps)}
        >
          {/*sources.map((source, index) => (
            // @ts-ignore
            <source
              key={index}
              src={source.src}
              type={source.type}
              size={source.size && source.size}
            />
          ))*/}
          {sourcesVideo}
          {captionsMap}
        </video>
      );
    }

    return (
      <video
        src={url}
        preload={preload}
        poster={poster}
        // @ts-ignore
        ref={this.elementRef}
        {...pick(rest, this.restProps)}
      >
        {captionsMap}
      </video>
    );
  };

  renderAudioPlayer = () => {
    // @ts-ignore
    const { sources = [], url, preload, ...rest } = this.props;

    let audioSource = [];

    for (let i = 0; i < sources.length; i += 1) {
      const { src = '', type = ''} = sources[i];
      audioSource.push(<source key={i} src={src} type={type} />);
    }

    if (sources && sources.length) {
      return (
        <audio preload={preload} ref={this.elementRef} {...rest}>
          {/*sources.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))*/}
          {audioSource}
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
    // @ts-ignore
    const { type = ''} = this.props;

    const render = type === 'video' ?
      this.renderPlayerWithSRC()
      : this.renderAudioPlayer();

    return (render);
  }
}

export default Player;
