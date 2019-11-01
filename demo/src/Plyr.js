'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _plyr = require('plyr');

var _plyr2 = _interopRequireDefault(_plyr);

var _defaultProps = require('./defaultProps');

var _defaultProps2 = _interopRequireDefault(_defaultProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Plyr = function (_Component) {
  _inherits(Plyr, _Component);

  function Plyr() {
    _classCallCheck(this, Plyr);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.getType = function () {
      return _this.player && _this.player.source && _this.player.source.type;
    };

    _this.play = function () {
      return _this.player && _this.player.play();
    };

    _this.pause = function () {
      return _this.player && _this.player.pause();
    };

    _this.togglePlay = function () {
      return _this.player && _this.player.togglePlay();
    };

    _this.stop = function () {
      return _this.player && _this.player.stop();
    };

    _this.restart = function () {
      return _this.player && _this.player.restart();
    };

    _this.rewind = function (time) {
      return _this.player && _this.player.rewind(time);
    };

    _this.forward = function (time) {
      return _this.player && _this.player.forward(time);
    };

    _this.getCurrentTime = function () {
      return _this.player && _this.player.currentTime;
    };

    _this.getDuration = function () {
      return _this.player && _this.player.duration;
    };

    _this.getVolume = function () {
      return _this.player && _this.player.volume;
    };

    _this.isMuted = function () {
      return _this.player && _this.player.muted;
    };

    _this.isPaused = function () {
      return _this.player && _this.player.paused;
    };

    _this.toggleMute = function () {
      return _this.player && _this.player.toggleControls(_this.player.muted);
    };

    _this.setMuted = function () {
      var muted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      return _this.player.muted = muted;
    };

    _this.increaseVolume = function (step) {
      return _this.player && _this.player.increaseVolume(step);
    };

    _this.decreaseVolume = function (step) {
      return _this.player && _this.player.decreaseVolume(step);
    };

    _this.setVolume = function (amount) {
      return _this.player.volume = amount;
    };

    _this.enterFullscreen = function () {
      return _this.player && _this.player.fullscreen.enter();
    };

    _this.exitFullscreen = function () {
      return _this.player && _this.player.fullscreen.exit();
    };

    _this.toggleFullscreen = function () {
      return _this.player && _this.player.fullscreen.toggle();
    };

    _this.player = null;

    _this.state = {
      muted: null
    };
    return _this;
  }

  // Specifies the default values for props:


  Plyr.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var defaultOptions = Object.keys(_defaultProps2.default).reduce(function (acc, current) {
      var _extends2;

      return _extends({}, acc, (_extends2 = {}, _extends2[current] = _this2.props[current], _extends2));
    }, {});

    var options = _extends({}, defaultOptions, {
      muted: this.state.muted
    });

    var selector = '.' + this.props.className.replace(/ /g, '.');
    this.player = new _plyr2.default(selector, options);

    if (this.player) {
      this.player.on('ready', function () {
        _this2.props.onReady && _this2.props.onReady();
      });

      this.player.on('play', function () {
        _this2.props.onPlay && _this2.props.onPlay();
      });

      this.player.on('pause', function () {
        _this2.props.onPause && _this2.props.onPause();
      });

      this.player.on('ended', function () {
        _this2.props.onEnd && _this2.props.onEnd();
      });

      this.player.on('loadeddata', function () {
        _this2.props.onLoadedData && _this2.props.onLoadedData();
      });

      this.player.on('seeked', function () {
        var time = _this2.getCurrentTime();
        _this2.props.onSeeked && _this2.props.onSeeked(time);
      });

      this.player.on('timeupdate', function () {
        var time = _this2.getCurrentTime();
        _this2.props.onTimeUpdate && _this2.props.onTimeUpdate(time);
      });

      this.player.on('enterfullscreen', function () {
        _this2.props.onEnterFullscreen && _this2.props.onEnterFullscreen();
      });

      this.player.on('exitfullscreen', function () {
        _this2.props.onExitFullscreen && _this2.props.onExitFullscreen();
      });

      this.player.on('volumechange', function () {
        var _player = _this2.player,
            muted = _player.muted,
            volume = _player.volume;

        _this2.props.onVolumeChange && _this2.props.onVolumeChange({ muted: muted, volume: volume });
      });

      this.player.on('captionsenabled', function () {
        _this2.props.onCaptionsEnabled && _this2.props.onCaptionsEnabled();
      });

      this.player.on('captionsdisabled', function () {
        _this2.props.onCaptionsDisabled && _this2.props.onCaptionsDisabled();
      });
    }
  };

  Plyr.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.muted !== this.props.muted) {
      this.player.muted = this.props.muted;
    }
  };

  Plyr.prototype.componentWillUnmount = function componentWillUnmount() {
    this.player && this.player.destroy();
  };

  // For video support for plyr supported videos using videoId (Youtube and Vimeo for now).


  Plyr.prototype.renderPlayerWithVideoId = function renderPlayerWithVideoId() {
    return _react2.default.createElement('div', {
      className: this.props.className,
      style: this.props.style,
      'data-plyr-provider': this.props.type,
      'data-plyr-embed-id': this.props.videoId
    });
  };

  // For video support for source defined as link to those video files.


  Plyr.prototype.renderPlayerWithSRC = function renderPlayerWithSRC() {
    var _props = this.props,
        sources = _props.sources,
        url = _props.url,
        preload = _props.preload,
        poster = _props.poster,
        className = _props.className;


    if (sources && Array.isArray(sources) && sources.length) {
      return _react2.default.createElement(
        'video',
        {
          className: className,
          preload: preload,
          poster: poster
        },
        sources.map(function (source, index) {
          return _react2.default.createElement('source', {
            key: index,
            src: source.src,
            type: source.type,
            size: source.size && source.size
          });
        })
      );
    }

    return _react2.default.createElement('video', {
      className: className,
      src: url,
      preload: preload,
      poster: poster
    });
  };

  Plyr.prototype.renderAudioPlayer = function renderAudioPlayer() {
    var _props2 = this.props,
        sources = _props2.sources,
        url = _props2.url,
        preload = _props2.preload,
        className = _props2.className;


    if (sources && Array.isArray(sources) && sources.length) {
      return _react2.default.createElement(
        'audio',
        {
          className: className,
          preload: preload
        },
        sources.map(function (source, index) {
          return _react2.default.createElement('source', { key: index, src: source.src, type: source.type });
        })
      );
    }

    return _react2.default.createElement('audio', {
      className: className,
      preload: preload,
      src: url
    });
  };

  Plyr.prototype.render = function render() {
    if (this.props.type === 'audio') {
      return this.renderAudioPlayer();
    } else if (this.props.type === 'video') {
      return this.renderPlayerWithSRC();
    }

    return this.renderPlayerWithVideoId();
  };

  return Plyr;
}(_react.Component);

Plyr.getDerivedStateFromProps = function (nextProps) {
  return {
    muted: nextProps.muted
  };
};

Plyr.defaultProps = _extends({
  type: 'youtube',
  className: 'react-plyr'

}, _defaultProps2.default);
Plyr.propTypes = {
  type: _propTypes2.default.oneOf(['youtube', 'vimeo', 'video', 'audio']),
  className: _propTypes2.default.string,
  videoId: _propTypes2.default.string,
  url: _propTypes2.default.string,

  onReady: _propTypes2.default.func,
  onPlay: _propTypes2.default.func,
  onPause: _propTypes2.default.func,
  onEnd: _propTypes2.default.func,
  onLoadedData: _propTypes2.default.func,
  onSeeked: _propTypes2.default.func,
  onTimeUpdate: _propTypes2.default.func,
  onEnterFullscreen: _propTypes2.default.func,
  onExitFullscreen: _propTypes2.default.func,
  onVolumeChange: _propTypes2.default.func,
  onCaptionsEnabled: _propTypes2.default.func,
  onCaptionsDisabled: _propTypes2.default.func,

  // plyr props
  enabled: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  debug: _propTypes2.default.bool,
  autoplay: _propTypes2.default.bool,
  autopause: _propTypes2.default.bool,
  seekTime: _propTypes2.default.number,
  volume: _propTypes2.default.number,
  muted: _propTypes2.default.bool,
  duration: _propTypes2.default.number,
  displayDuration: _propTypes2.default.bool,
  invertTime: _propTypes2.default.bool,
  toggleInvert: _propTypes2.default.bool,
  ratio: _propTypes2.default.string,
  clickToPlay: _propTypes2.default.bool,
  hideControls: _propTypes2.default.bool,
  resetOnEnd: _propTypes2.default.bool,
  disableContextMenu: _propTypes2.default.bool,
  loadSprite: _propTypes2.default.bool,
  iconPrefix: _propTypes2.default.string,
  iconUrl: _propTypes2.default.string,
  blankVideo: _propTypes2.default.string,
  quality: _propTypes2.default.shape({
    default: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    options: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]))
  }),
  loop: _propTypes2.default.shape({
    active: _propTypes2.default.bool
  }),
  speed: _propTypes2.default.shape({
    selected: _propTypes2.default.number,
    options: _propTypes2.default.arrayOf(_propTypes2.default.number)
  }),
  keyboard: _propTypes2.default.shape({
    focused: _propTypes2.default.bool,
    global: _propTypes2.default.bool
  }),
  tooltips: _propTypes2.default.shape({
    controls: _propTypes2.default.bool,
    seek: _propTypes2.default.bool
  }),
  captions: _propTypes2.default.shape({
    active: _propTypes2.default.bool,
    language: _propTypes2.default.string
  }),
  fullscreen: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    fallback: _propTypes2.default.bool,
    iosNative: _propTypes2.default.bool
  }),
  storage: _propTypes2.default.shape({
    enabled: _propTypes2.default.bool,
    key: _propTypes2.default.string
  }),
  controls: _propTypes2.default.arrayOf(_propTypes2.default.string),
  settings: _propTypes2.default.arrayOf(_propTypes2.default.string),

  poster: _propTypes2.default.string,
  sources: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    src: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string.isRequired,
    size: _propTypes2.default.string
  }))
};
exports.default = Plyr;
module.exports = exports['default'];
