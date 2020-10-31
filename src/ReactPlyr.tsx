/* eslint-disable */
import React, {
  useEffect,
  createRef,
  memo,
  useImperativeHandle,
  forwardRef,
  HTMLAttributes,
  MutableRefObject
} from 'react';
import Hls from 'hls.js/dist/hls.min';
import * as PropTypes from 'prop-types';
import Plyr, { Options, SourceInfo } from 'plyr';
import { pick, difference, isEqual } from '@utils';
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

    isHls?: boolean;
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
    onReady?: (player: { language; volume; muted; speed; on; destroy; play; currentTime }) => void;
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

type PlyrInstance = Plyr

type PlyrProps = HTMLAttributes<HTMLVideoElement> & {
  source?: SourceInfo
   options?: Options
}

type AllProps = PlayerNS.Props & PlayerNS.PropsAction & PlyrProps;

type HTMLPlyrVideoElement = HTMLVideoElement & { plyr?: PlyrInstance }

function areEqual(prevProps, nextProps): boolean {
  const { sources, url } = prevProps || {};
  return sources?.length ? isEqual(nextProps.sources, sources) : isEqual(nextProps.url, url);
}


function updateQuality(newQuality) {
  //@ts-ignore
  window.hls?.levels?.map((level, levelIndex) => {
    if (level.height === newQuality) {
      console.log("Found quality match with " + newQuality);
      //@ts-ignore
      window.hls.currentLevel = levelIndex;
    }
  });
}

const ReactPlyr: React.FC<AllProps> = forwardRef<HTMLPlyrVideoElement, AllProps>(({
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
}: AllProps, ref) => {
  const restProps = difference([Object.keys(props), Object.keys(defaultProps)]);
  const elementRef: any = createRef<HTMLPlyrVideoElement>();
  let player: any = null;

  // like did mount
  useEffect(() => {
    // For more options see: https://github.com/sampotts/plyr/#options
    const defaultOptions = Object.keys(defaultProps)?.reduce(
      (acc: {}, current: string) => ({
        ...acc,
        [current]: props?.[current],
      }), {});

    const node: HTMLElement = elementRef?.current;

    const { isHls, url } = props || {};

    //@see https://github.com/sampotts/plyr/issues/1741#issuecomment-640293554
    if (isHls && Hls.isSupported()) {
      // For more Hls.js options, see https://github.com/dailymotion/hls.js
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(node as HTMLMediaElement);

      // From the m3u8 playlist, hls parses the manifest and returns
      // all available video qualities. This is important, in this approach,
      // we will have one source on the Plyr player.
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {

        // Transform available levels into an array of integers (height values).
        const availableQualities = hls.levels?.map(l => l.height);

        // Add new qualities to option
        //@ts-ignore
        defaultOptions.quality = {
          default: availableQualities[0], //Default - AUTO
          options: availableQualities,
          // this ensures Plyr to use Hls to update quality level
          // Ref: https://github.com/sampotts/plyr/blob/master/src/js/html5.js#L77
          forced: true,
          onChange: (e) => updateQuality(e),
        }
        // Initialize new Plyr player with quality options
        player = node ? new Plyr(node, defaultOptions) : null;
      });

      hls.attachMedia(node as HTMLMediaElement);
      //@ts-ignore
      window.hls = hls;

      return () => {
        if (hls) {
          hls.destroy();
        }
      }
    } else {
      // default options with no quality update in case Hls is not supported
      player = node ? new Plyr(node, defaultOptions) : null;
    }

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
    }
  }, []);

  // Getting a reference to a React Component using useRef hook
  //@ts-ignore
  useImperativeHandle(ref, () => {
    return {
      decreaseVolume: decreaseVolume,
      enterFullscreen: enterFullscreen,
      exitFullscreen: exitFullscreen,
      forward: forward,
      getCurrentTime: getCurrentTime,
      getDuration: getDuration,
      getType: getType,
      getVolume: getVolume,
      increaseVolume: increaseVolume,
      isMuted: isMuted,
      isPaused: isPaused,
      setCurrentTime: setCurrentTime,
      setMuted: setMuted,
      setVolume: setVolume,
      stop: stop,
      restart: restart,
      rewind: rewind,
      togglePlay: togglePlay,
      play: play,
      pause: pause,
      toggleFullscreen: toggleFullscreen,
      toggleMute: toggleMute,
    };
  }, []);

  function decreaseVolume (step: number) { return player?.decreaseVolume(step); }
  function enterFullscreen () { return player?.fullscreen.enter(); }
  function exitFullscreen () { return player?.fullscreen.exit(); }
  function forward (time: number) { return player?.forward(time); }
  function getCurrentTime (): number { return player?.currentTime; }
  function getDuration () { return player?.duration; }
  function getType () { return player?.source?.type; }
  function getVolume () { return player?.volume; }
  function increaseVolume (step: number) { return player?.increaseVolume(step); }
  function isMuted () { return player?.muted; }
  function isPaused () { return player?.paused; }
  function setCurrentTime (currentTime: number) { return (player.currentTime = currentTime); }
  function setMuted (muted = true) { return (player.muted = muted); }
  function setVolume (amount: number) { return (player.volume = amount); }
  function stop () { return player?.stop(); }
  function restart () { return player?.restart(); }
  function rewind (time: number) { return player?.rewind(time); }
  function togglePlay () { return player?.togglePlay(); }
  function play () { return player?.play(); }
  function pause () { return player?.pause(); }
  function toggleFullscreen () { return player?.fullscreen.toggle(); }
  function toggleMute () { return player?.toggleControls(player.muted); }

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

    //@ts-ignore
    console.log('[render video]', pick(props, restProps));

    if (sources?.length) {
      return (
        <video
          ref={(elementRef as unknown) as MutableRefObject<HTMLVideoElement>}
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
        ref={(elementRef as unknown) as MutableRefObject<HTMLVideoElement>}
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
        <audio ref={(elementRef as unknown) as MutableRefObject<HTMLAudioElement>} preload={preload}>
          {audioSource(sources)}
        </audio>
      );
    }

    return (
      <audio
        ref={(elementRef as unknown) as MutableRefObject<HTMLAudioElement>}
        preload={preload}
        src={url}
        {...pick(rest, restProps)}
      />
    );
  }

  console.log('[render audio]');

  return props?.type === AudioType.Video
    ? renderVideo()
    : renderAudio();
});

ReactPlyr.displayName = 'ReactPlyr';

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
  isHls: PropTypes.bool,
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
  // @ts-ignore
  settings: PropTypes.arrayOf(
    PropTypes.oneOf([CAPTIONS, QUALITY, SPEED, LOOP]),
  ),
  // @ts-ignore
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.number,
      src: PropTypes.string,
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
  // @ts-ignore
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
  //@ts-ignore
  url: null,

  ...defaultProps,
};

export default memo(ReactPlyr, areEqual);
