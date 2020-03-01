import * as React from 'react';
import * as PropTypes from 'prop-types';
import Plyr from 'plyr';
import { pick, difference } from '@utils';
import { CONSTROLS, EVENTS, SETTINGS } from '@constants';
import defaultProps from './defaultProps';
import AudioType from './types';
import 'plyr/src/sass/plyr.scss';

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

export namespace PlayerNS {
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
      default: boolean;
      kind: string;
      label: string;
      srcLang: string;
      src: string;
    }[];

    settings?: string[];

    preload?: string;
    poster?: string;
    autoplay?: boolean;
  }
  export interface PropsAction {
    onReady?: (player: Function) => void;
    onPlay?: () => void;
    onPause?: () => void;
    onEnd?: () => void;
    onLoadedData?: () => void;
    onSeeked?: (
      time: number | string | undefined | null,
    ) => void;
    onRateChange?: (speed: number) => void;
    onTimeUpdate?: (
      currentTime: number | string | undefined | null,
    ) => void;
    onEnterFullscreen?: () => void;
    onExitFullscreen?: () => void;
    onVolumeChange?: (p: { volume: number; muted: boolean }) => void;
    onLanguageChange?: (language: any) => void;
    onControlsHidden?: () => void;
    onControlsShown?: () => void;
    onCaptionsEnabled?: () => void;
    onCaptionsDisabled?: () => void;
  }
}

class ReactPlyr extends React.PureComponent
  <PlayerNS.Props & PlayerNS.PropsAction> {
  private readonly elementRef: React.RefObject<any>;
  private player: any;
  private readonly restProps: any[];

  private static readonly propTypes = {
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
        size: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        type: PropTypes.string,
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

  private static readonly defaultProps = {
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

  public constructor (props: Readonly<PlayerNS.Props>) {
    super(props);

    this.restProps = difference([Object.keys(this.props), Object.keys(ReactPlyr.defaultProps)]);
    this.elementRef = React.createRef();
    this.player = null;

    this.decreaseVolume = this.decreaseVolume.bind(this);
    this.enterFullscreen = this.enterFullscreen.bind(this);
    this.exitFullscreen = this.exitFullscreen.bind(this);
    this.forward = this.forward.bind(this);
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.getType = this.getType.bind(this);
    this.getVolume = this.getVolume.bind(this);
    this.increaseVolume = this.increaseVolume.bind(this);
    this.isMuted = this.isMuted.bind(this);
    this.isPaused = this.isPaused.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.restart = this.restart.bind(this);
    this.rewind = this.rewind.bind(this);
    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.setMuted = this.setMuted.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.stop = this.stop.bind(this);
    this.renderPlayerWithSRC = this.renderPlayerWithSRC.bind(this);
    this.renderAudioPlayer = this.renderAudioPlayer.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.updateSource = this.updateSource.bind(this);
  }

  public componentDidMount (): void {
    const defaultOptions = Object.keys(defaultProps)
      .reduce((acc: {}, current: string) => ({
        ...acc,
        // eslint-disable-next-line
        [current]: this.props[current],
      }), {});

    console.log('defaultOptions', defaultOptions);

    const node = this.elementRef.current;

    this.player = node ? new Plyr(node, defaultOptions) : null;

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
      onReady?.(this.player);
      if (autoplay) {
        this.player?.play();
      }
    });

    const {
      speed,
      muted,
      volume,
      language,
    } = this.player;

    this.player.on(
      EVENTPLAY, () => onPlay?.(),
    );
    this.player.on(
      PAUSE, () => onPause?.(),
    );
    this.player.on(
      ENDED, () => onEnd?.(),
    );
    this.player.on(
      LOADEDDATA,
      () => onLoadedData?.(),
    );
    this.player.on(
      SEEKED,
      () => onSeeked?.(this.getCurrentTime()),
    );
    this.player.on(
      RATECHANGE,
      () => onRateChange?.(speed),
    );
    this.player.on(
      TIMEUPDATE,
      () => onTimeUpdate?.(this.getCurrentTime()),
    );
    this.player.on(
      ENTERFULLSCREEN,
      () => onEnterFullscreen?.(),
    );
    this.player.on(
      EXITFULLSCREEN,
      () => onExitFullscreen?.(),
    );
    this.player.on(
      VOLUMECHANGE,
      () => onVolumeChange?.({ muted, volume }),
    );
    this.player.on(
      LANGUAGECHANGE,
      () => onLanguageChange?.(language),
    );
    this.player.on(
      CONTROLSHIDDEN,
      () => onControlsHidden?.(),
    );
    this.player.on(
      CONTROLSSHOWN,
      () => onControlsShown?.(),
    );
    this.player.on(
      CAPTIONSENABLED,
      () => onCaptionsEnabled?.(),
    );
    this.player.on(
      CAPTIONSDISABLED,
      () => onCaptionsDisabled?.(),
    );
  }

  public componentDidUpdate (
    {
      poster: posterPrevProps, sources: sourcesPrevProps,
      title: titlePrevProps, tracks: tracksPrevProps, type: typePrevProps,
      url: urlPrevProps,
    }: Readonly<PlayerNS.Props>,
  ): void {
    const {
      poster = '', sources = [], title = '', tracks = [], type = '', url = '',
    } = this.props;

    console.log('componentDidUpdate PrevProps', {
      posterPrevProps,
      sourcesPrevProps,
      titlePrevProps,
      tracksPrevProps,
      typePrevProps,
      urlPrevProps,
    });

    console.log('componentDidUpdate this.props', this.props);

    if (posterPrevProps !== poster
      || sourcesPrevProps !== sources
      || titlePrevProps !== title
      || tracksPrevProps !== tracks
      || typePrevProps !== type
      || urlPrevProps !== url) {
      this.updateSource({
        poster, sources, title, tracks, type, url,
      });
    }
  }

  public componentWillUnmount (): void {
    this.player?.destroy();
  }

  private updateSource ({
    poster,
    sources,
    title,
    tracks,
    type,
    url,
  }): void {
    console.log('updateSource ::::::::::::::::::: ', {
      poster,
      sources,
      title,
      tracks,
      type,
      url,
    });

    this.player.source = type === AudioType.Audio
      ? { sources, title, type } : {
    poster, sources, title, type,
    };
  }

  private decreaseVolume (step: number) { return this.player?.decreaseVolume(step); }
  private enterFullscreen () { return this.player?.fullscreen.enter(); }
  private exitFullscreen () { return this.player?.fullscreen.exit(); }
  private forward (time: number) { return this.player?.forward(time); }
  private getCurrentTime () { return this.player?.currentTime; }
  private getDuration () { return this.player?.duration; }
  private getType () { return this.player?.source?.type; }
  private getVolume () { return this.player?.volume; }
  private increaseVolume (step: number) { return this.player?.increaseVolume(step); }
  private isMuted () { return this.player?.muted; }
  private isPaused () { return this.player?.paused; }
  private setCurrentTime (currentTime: number) { return (this.player.currentTime = currentTime); }
  private setMuted (muted = true) { return (this.player.muted = muted); }
  private setVolume (amount: number) { return (this.player.volume = amount); }
  private stop () { return this.player?.stop(); }
  private restart () { return this.player?.restart(); }
  private rewind (time: number) { return this.player?.rewind(time); }
  private togglePlay () { return this.player?.togglePlay(); }
  private play () { return this.player?.play(); }
  private pause () { return this.player?.pause(); }
  private toggleFullscreen () { return this.player?.fullscreen.toggle(); }
  private toggleMute () { return this.player?.toggleControls(this.player.muted); }

  private static captionVideo (tracks: {
    default: boolean;
    kind: string;
    label: string;
    src: string;
    srcLang: string;
  }[] = []) {
    const captionsMap: {}[] = [];

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

  private static sourcesVideo (sources: {
    src: string;
    type: string;
    size?: number;
  }[] = []) {
    const sourcesVideo: {}[] = [];

    console.log('sources', sources);

    if (sources?.length) {
      for (let index = 0; index < sources.length; index += 1) {
        const { src = '', type = '', size = 0 } = sources[index];
        sourcesVideo.push(
          <source
            key={index}
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

  private static audioSource (sources: {
    src: string;
    type: string;
  }[] = []) {
    const audioSource: {}[] = [];

    if (sources?.length) {
      for (let index = 0; index < sources.length; index += 1) {
        const { src = '', type = '' } = sources[index];
        audioSource.push(<source key={index} src={src} type={type} />);
      }
    }

    return audioSource;
  }

  private renderPlayerWithSRC (): React.ReactElement {
    const {
      sources = [],
      tracks = [],
      url = '',
      preload = '',
      poster = '',
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
  }

  private renderAudioPlayer (): React.ReactElement {
    const {
      sources = [],
      url = '',
      preload = '',
      ...rest
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
  }

  public render (): React.ReactElement<{}> {
    const { type = '' } = this.props;
    return type === AudioType.Video ? this.renderPlayerWithSRC() : this.renderAudioPlayer();
  }
}

export default ReactPlyr;
