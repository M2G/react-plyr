/* eslint-disable */
import React, { useEffect, createRef, memo } from 'react';
import * as PropTypes from 'prop-types';
import Plyr from 'plyr';
import { pick, difference } from './utils';
import { CONSTROLS, EVENTS, SETTINGS } from './constants';
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
}: any = EVENTS;

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

const { CAPTIONS, QUALITY, SPEED, LOOP } = SETTINGS;

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
    onSeeked?: (time: number | string | undefined | null) => void;
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

const areEqual = (prevProps, nextProps) => {

  console.log('areEqual', { prevProps, nextProps })

};

type AllProps = PlayerNS.Props & PlayerNS.PropsAction;

function ReactPlyr({
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
  ...props
}: AllProps) {
  const restProps = difference([Object.keys(props), Object.keys(defaultProps)]);
  const elementRef: any = createRef();
  const player = null;

  useEffect(() => {
    const defaultOptions = Object.keys(defaultProps).reduce(
      (acc: {}, current: string) => ({
        ...acc,
        [current]: props[current],
      }),
      {},
    );

    const node: any = elementRef?.current;

    const player: { language, volume, muted, speed, on, destroy, play, currentTime } = node ? new Plyr(node, defaultOptions) : null;

    if (!player) return;

    const { speed, muted, volume, language } = player;

    player?.on(READY, () => {
      onReady?.(player);
      if (autoplay) {
        player?.play();
      }
    });
    player?.on(EVENTPLAY, () => onPlay?.());
    player?.on(PAUSE, () => onPause?.());
    player?.on(ENDED, () => onEnd?.());
    player?.on(LOADEDDATA, () => onLoadedData?.());
    player?.on(SEEKED, () => onSeeked?.(getCurrentTime()));
    player?.on(RATECHANGE, () => onRateChange?.(speed));
    player?.on(TIMEUPDATE, () => onTimeUpdate?.(getCurrentTime()));
    player?.on(ENTERFULLSCREEN, () => onEnterFullscreen?.());
    player?.on(EXITFULLSCREEN, () => onExitFullscreen?.());
    player?.on(VOLUMECHANGE, () => onVolumeChange?.({ muted, volume }));
    player?.on(LANGUAGECHANGE, () => onLanguageChange?.(language));
    player?.on(CONTROLSHIDDEN, () => onControlsHidden?.());
    player?.on(CONTROLSSHOWN, () => onControlsShown?.());
    player?.on(CAPTIONSENABLED, () => onCaptionsEnabled?.());
    player?.on(CAPTIONSDISABLED, () => onCaptionsDisabled?.());

    return () => {
      player?.destroy();
    };
  }, []);

  const { poster, sources, title, tracks, type } = props;

  useEffect(() => {
    return updateSource({ poster, sources, title, tracks, type });
  }, [poster, sources, title, tracks, type]);

  function updateSource({
    poster,
    sources,
    title,
    tracks,
    type,
  }): void {

    // @ts-ignore
    player?.source =
      type === AudioType.Audio
        ? { sources, title, type }
        : { poster, sources, title, type, tracks };
  }

  // function decreaseVolume (step: number) { return player?.decreaseVolume(step); }
  // function enterFullscreen () { return player?.fullscreen.enter(); }
  // function exitFullscreen () { return player?.fullscreen.exit(); }
  // function forward (time: number) { return player?.forward(time); }
  function getCurrentTime () { return player?.currentTime; }
  // function getDuration () { return player?.duration; }
  // function getType () { return player?.source?.type; }
  // function getVolume () { return player?.volume; }
  // function increaseVolume (step: number) { return player?.increaseVolume(step); }
  // function isMuted () { return player?.muted; }
  // function isPaused () { return player?.paused; }
  // function setCurrentTime (currentTime: number) { return (player.currentTime = currentTime); }
  // function setMuted (muted = true) { return (player.muted = muted); }
  // function setVolume (amount: number) { return (player.volume = amount); }
  // function stop () { return player?.stop(); }
  // function restart () { return layer?.restart(); }
  // function rewind (time: number) { return player?.rewind(time); }
  // function togglePlay () { return player?.togglePlay(); }
  // function play () { return player?.play(); }
  // function pause () { return player?.pause(); }
  // function toggleFullscreen () { return player?.fullscreen.toggle(); }
  // function toggleMute () { return player?.toggleControls(player.muted); }

  function captionVideo(
    tracks: {
      default: boolean;
      kind: string;
      label: string;
      src: string;
      srcLang: string;
    }[] = [],
  ) {
    const captionsMap: {}[] = [];

    if (tracks?.length) {
      for (let i = 0; i < tracks.length; i += 1) {
        const {
          kind = CAPTIONS,
          label,
          src,
          srcLang,
          default: def,
          ...attributes
        } = tracks[i];

        captionsMap.push(
          <track
            key={i}
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

  function sourcesVideo(
    sources: {
      src: string;
      type: string;
      size?: number;
    }[] = [],
  ): {}[] {
    const sourcesVideo: {}[] = [];

    if (sources?.length) {
      for (let i = 0; i < sources.length; i += 1) {
        const { src = '', type = '', size = 0 } = sources[i];
        sourcesVideo.push(
          <source
            key={i}
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

  function audioSource(
    sources: {
      src: string;
      type: string;
    }[] = [],
  ): {}[] {
    const audioSource: {}[] = [];

    if (sources?.length) {
      for (let i = 0; i < sources.length; i += 1) {
        const { src = '', type = '' } = sources[i];
        audioSource.push(<source key={i} src={src} type={type} />);
      }
    }

    return audioSource;
  }

  function renderVideo(): React.ReactElement {
    const {
      sources = [],
      tracks = [],
      url = '',
      preload = '',
      poster = '',
    } = props;

    console.log('[render video]');

    if (sources?.length) {
      return (
        <video
          ref={elementRef}
          poster={poster}
          preload={preload}
          {...pick(props, restProps)}
        >
          {sourcesVideo(sources)}
          {captionVideo(tracks)}
        </video>
      );
    }

    return (
      <video
        ref={elementRef}
        poster={poster}
        preload={preload}
        src={url}
        {...pick(props, restProps)}
      >
        {captionVideo(tracks)}
      </video>
    );
  }

  function renderAudio(): React.ReactElement {
    const { sources = [], url = '', preload = '', ...rest } = props;

    if (sources?.length) {
      return (
        <audio ref={elementRef} preload={preload}>
          {audioSource(sources)}
        </audio>
      );
    }

    return (
      <audio
        ref={elementRef}
        preload={preload}
        src={url}
        {...pick(rest, restProps)}
      />
    );
  }

  console.log('[render]');

  return type === AudioType.Video
    ? renderVideo()
    : renderAudio();
}

ReactPlyr.propTypes = {
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
      PropTypes.string,
      PropTypes.number,
    ]),
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  }),
  ratio: PropTypes.string,
  resetOnEnd: PropTypes.bool,
  seekTime: PropTypes.number,
  settings: PropTypes.arrayOf(
    PropTypes.oneOf([CAPTIONS, QUALITY, SPEED, LOOP]),
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
  type: PropTypes.oneOf([AudioType.Video, AudioType.Audio])
    .isRequired,
  url: PropTypes.string,
  volume: PropTypes.number,
};

ReactPlyr.defaultProps = {
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

// @ts-ignore
export default memo(ReactPlyr, areEqual);
