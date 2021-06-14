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
import { pick, difference, isEqual } from './utils';
import { CONSTROLS, EVENTS, SETTINGS, STYLE } from './constants';
import { captionVideo, sourcesVideo, audioSource } from './components';
import defaultProps from './defaultProps';
import AudioType from './types';
import '../node_modules/plyr/dist/plyr.css';
import './index.scss';

declare global {
  interface Window {
    hls:any;
  }
}

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

  BEFOREEND,
  CLICK,
}: any = EVENTS;

const {
  BLOCK,
  NONE
}: any = STYLE;

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
    trimming?: boolean;

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

const iconPlay = `<svg id="icon-play" aria-hidden="true" focusable="false" viewBox="0 0 18 18">
                    <use xlink:href="#plyr-play"></use>
                </svg>`;

const button = `<button class="c-btn--loop">
                          <svg id="icon-loop" viewBox="0 0 32 32">
                              <path d="M4 10h20v6l8-8-8-8v6h-24v12h4zM28 22h-20v-6l-8 8 8 8v-6h24v-12h-4z"></path>
                          </svg>
                        </button>`;

type PlyrInstance = Plyr;

type PlyrProps = HTMLAttributes<HTMLVideoElement> & {
  source?: SourceInfo
  options?: Options
}

type AllProps = PlayerNS.Props & PlayerNS.PropsAction & PlyrProps;

type HTMLPlyrVideoElement = HTMLVideoElement & { plyr?: PlyrInstance };

function areEqual(prevProps, nextProps): boolean {
  const { sources, url } = prevProps || {};
  return sources?.length ? isEqual(nextProps.sources, sources) : isEqual(nextProps.url, url);
}

function updateQuality(newQuality): void {
  console.log('window.hls.levels', window.hls.levels);
  console.log('newQuality', newQuality);

  if (newQuality === 0) {
    window.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
  } else {
    window.hls.levels?.forEach((level, levelIndex) => {
      if (level.height === newQuality) {
        console.log(`Found quality match with : ${newQuality}`);
        window.hls.currentLevel = levelIndex;
      }
    });
  }
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
      const defaultOptions: any = Object.keys(defaultProps)?.reduce(
        (acc: {}, current: string) => ({
          ...acc,
          [current]: props?.[current],
        }), {});

      const node: HTMLElement = elementRef?.current;

      const { isHls, url, trimming } = props || {};

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
          const availableQualities = hls.levels?.map(l => l.height)?.filter(Boolean);

          console.log('availableQualities', availableQualities)

          // Add new qualities to option
          defaultOptions.quality = {
            default: availableQualities[0], //Default - AUTO
            options: availableQualities,
            // this ensures Plyr to use Hls to update quality level
            // Ref: https://github.com/sampotts/plyr/blob/master/src/js/html5.js#L77
            forced: true,
            onChange: (e) => updateQuality(e),
          }

          hls.on(Hls.Events.LEVEL_SWITCHED, function (event, data) {
            const offsetParentChildNodes = elementRef.current.offsetParent.offsetParent.childNodes[0];
            const menuWrapper = offsetParentChildNodes.children[8].children[1].children[0];
            const span = offsetParentChildNodes.children[8].children[1].children[0].children[2].children[1].children[0].firstChild;
            const menuItem = menuWrapper.childNodes[0].children[0].children[1];


            console.log("LEVEL_SWITCHED hls.levels", hls.levels);
            console.log("LEVEL_SWITCHED hls.autoLevelEnabled", hls.autoLevelEnabled);

            if (hls.autoLevelEnabled) {
              menuItem.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
              span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
            } else {
              menuItem.innerHTML = `AUTO`;
              span.innerHTML = `AUTO`;
            }
          });
          // Initialize new Plyr player with quality options
          player = node ? new Plyr(node, defaultOptions) : null;
        });

        hls.attachMedia(node as HTMLMediaElement);

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

        //@see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
        // the ! non-null assertion expression operator
        player!.elements!.buttons!.play![0]!.innerHTML = iconPlay;
        player!.elements!.container!.insertAdjacentHTML(BEFOREEND, button);

        //Trim plugin part
        player!.trim!.trimming = trimming ? trimming : false;

        if (player?.trim?.trimming){
          player.on(TIMEUPDATE, () => {
            // ended and reboot
            if (+player.currentTime.toFixed(1) === +player.trim.startTime.toFixed(1)) {
              player.play();
            }
          });
        }

        player?.elements?.container?.children?.[4]?.addEventListener(CLICK, () => {
          if (player?.trim?.trimming) {
            player!.trim!.elements!.bar!.style!.display = NONE;
            player.trim.trimming = false;
          } else {
            player!.trim!.elements!.bar!.style!.display = BLOCK;
            player.trim.trimming = true;
          }
        });

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
    },
    props?.isHls ? [props?.url] : []
  );

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

  function renderVideo(): React.ReactElement {
    const {
      sources = [],
      tracks = [],
      url = '',
      preload = '',
      poster = '',
      ...rest
    } = props;

    if (sources?.length) {
      return (
        <video
          ref={(elementRef as unknown) as MutableRefObject<HTMLVideoElement>}
          poster={poster}
          preload={preload}
          {...pick(rest, restProps)}>
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
        {...pick(rest, restProps)}
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
  trimming: PropTypes.bool,
  clickToPlay: PropTypes.bool,
  controls: PropTypes.oneOfType([
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
    PropTypes.string,
    PropTypes.func,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.any,
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
  previewThumbnails: PropTypes.object,
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
  url: '',

  ...defaultProps,
};

export default memo(ReactPlyr, areEqual);
