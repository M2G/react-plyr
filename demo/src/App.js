import React, { Component, Fragment } from 'react';
import GithubCorner from 'react-github-corner';
import { Switch, Route, Link } from "react-router-dom";

import Plyr from './Plyr';

import './demo.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <GithubCorner href="https://github.com/xDae/react-plyr" svgStyle="position: initial" />
          <div className="grid">
            <header>
              <h1>React-Plyr</h1>
              <p>A simple, accessible and customisable media player for {' '}
                <Link to="/htmlvideo" className="faux-link">
                  <svg className="icon">
                    <title>HTML5</title>
                    <path d="M14.738.326C14.548.118 14.28 0 14 0H2c-.28 0-.55.118-.738.326S.98.81 1.004 1.09l1 11c.03.317.208.603.48.767l5 3c.16.095.338.143.516.143s.356-.048.515-.143l5-3c.273-.164.452-.45.48-.767l1-11c.026-.28-.067-.557-.257-.764zM12 4H6v2h6v5.72l-4 1.334-4-1.333V9h2v1.28l2 .666 2-.667V8H4V2h8v2z" />
                  </svg>Video</Link>,{' '}
                <Link to="/audio" className="faux-link">
                  <svg className="icon">
                    <title>HTML5</title>
                    <path d="M14.738.326C14.548.118 14.28 0 14 0H2c-.28 0-.55.118-.738.326S.98.81 1.004 1.09l1 11c.03.317.208.603.48.767l5 3c.16.095.338.143.516.143s.356-.048.515-.143l5-3c.273-.164.452-.45.48-.767l1-11c.026-.28-.067-.557-.257-.764zM12 4H6v2h6v5.72l-4 1.334-4-1.333V9h2v1.28l2 .666 2-.667V8H4V2h8v2z" />
                  </svg>Audio</Link>,{' '}
                <Link to="/" className="faux-link" >
                  <svg className="icon" role="presentation">
                    <title>YouTube</title>
                    <path d="M15.8,4.8c-0.2-1.3-0.8-2.2-2.2-2.4C11.4,2,8,2,8,2S4.6,2,2.4,2.4C1,2.6,0.3,3.5,0.2,4.8C0,6.1,0,8,0,8
                    s0,1.9,0.2,3.2c0.2,1.3,0.8,2.2,2.2,2.4C4.6,14,8,14,8,14s3.4,0,5.6-0.4c1.4-0.3,2-1.1,2.2-2.4C16,9.9,16,8,16,8S16,6.1,15.8,4.8z
                      M6,11V5l5,3L6,11z" />
                  </svg>YouTube</Link> and
                <Link to="/vimeo" className="faux-link">
                  <svg className="icon" role="presentation">
                    <title>Vimeo</title>
                    <path d="M16,4.3c-0.1,1.6-1.2,3.7-3.3,6.4c-2.2,2.8-4,4.2-5.5,4.2c-0.9,0-1.7-0.9-2.4-2.6C4,9.9,3.4,5,2,5
                        C1.9,5,1.5,5.3,0.8,5.8L0,4.8c0.8-0.7,3.5-3.4,4.7-3.5C5.9,1.2,6.7,2,7,3.8c0.3,2,0.8,6.1,1.8,6.1c0.9,0,2.5-3.4,2.6-4
                        c0.1-0.9-0.3-1.9-2.3-1.1c0.8-2.6,2.3-3.8,4.5-3.8C15.3,1.1,16.1,2.2,16,4.3z" />
                  </svg>Vimeo</Link>
              </p>

              <div className="call-to-action">
                <span className="button--with-count">
                  <a href="https://github.com/xDae/react-plyr" target="_blank" className="button" data-shr-network="github">
                    <svg className="icon" role="presentation">
                      <title>GitHub</title>
                      <path d="M8,0.2c-4.4,0-8,3.6-8,8c0,3.5,2.3,6.5,5.5,7.6
                C5.9,15.9,6,15.6,6,15.4c0-0.2,0-0.7,0-1.4C3.8,14.5,3.3,13,3.3,13c-0.4-0.9-0.9-1.2-0.9-1.2c-0.7-0.5,0.1-0.5,0.1-0.5
                c0.8,0.1,1.2,0.8,1.2,0.8C4.4,13.4,5.6,13,6,12.8c0.1-0.5,0.3-0.9,0.5-1.1c-1.8-0.2-3.6-0.9-3.6-4c0-0.9,0.3-1.6,0.8-2.1
                c-0.1-0.2-0.4-1,0.1-2.1c0,0,0.7-0.2,2.2,0.8c0.6-0.2,1.3-0.3,2-0.3c0.7,0,1.4,0.1,2,0.3c1.5-1,2.2-0.8,2.2-0.8
                c0.4,1.1,0.2,1.9,0.1,2.1c0.5,0.6,0.8,1.3,0.8,2.1c0,3.1-1.9,3.7-3.7,3.9C9.7,12,10,12.5,10,13.2c0,1.1,0,1.9,0,2.2
                c0,0.2,0.1,0.5,0.6,0.4c3.2-1.1,5.5-4.1,5.5-7.6C16,3.8,12.4,0.2,8,0.2z" />
                    </svg>
                    Download on GitHub
                  </a>
                </span>
              </div>
            </header>

            <main>
              <Switch>
                <Route exact path="/" render={() => (
                  <div>
                    <Plyr videoId="CDFN1VatiJA" debug />
                  </div>
                )} />
                <Route exact path="/htmlvideo" render={() => (
                  <div>
                    <span>html5 video</span>
                    {/* <Plyr
                      type="video"
                      title="View From A Blue Moon"
                      poster="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
                      sources={[
                        {
                          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
                          type: 'video/mp4',
                          size: 576,
                        },
                        {
                          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
                          type: 'video/mp4',
                          size: 720,
                        },
                        {
                          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
                          type: 'video/mp4',
                          size: 1080,
                        },
                        {
                          src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
                          type: 'video/mp4',
                          size: 1440,
                        },
                      ]}
                    /> */}
                  </div>
                )} />
              </Switch>

              <ul>
                <li className="plyr__cite plyr__cite--video" hidden>
                  <small>
                    <svg className="icon">
                      <title>HTML5</title>
                      <path d="M14.738.326C14.548.118 14.28 0 14 0H2c-.28 0-.55.118-.738.326S.98.81 1.004 1.09l1 11c.03.317.208.603.48.767l5 3c.16.095.338.143.516.143s.356-.048.515-.143l5-3c.273-.164.452-.45.48-.767l1-11c.026-.28-.067-.557-.257-.764zM12 4H6v2h6v5.72l-4 1.334-4-1.333V9h2v1.28l2 .666 2-.667V8H4V2h8v2z" />
                    </svg>
                    <a href="https://itunes.apple.com/au/movie/view-from-a-blue-moon/id1041586323" target="_blank">View From A Blue Moon</a> © Brainfarm
                  </small>
                </li>
                <li className="plyr__cite plyr__cite--audio" hidden>
                  <small>
                    <svg className="icon" title="HTML5">
                      <title>HTML5</title>
                      <path d="M14.738.326C14.548.118 14.28 0 14 0H2c-.28 0-.55.118-.738.326S.98.81 1.004 1.09l1 11c.03.317.208.603.48.767l5 3c.16.095.338.143.516.143s.356-.048.515-.143l5-3c.273-.164.452-.45.48-.767l1-11c.026-.28-.067-.557-.257-.764zM12 4H6v2h6v5.72l-4 1.334-4-1.333V9h2v1.28l2 .666 2-.667V8H4V2h8v2z" />
                    </svg>
                    <a href="http://www.kishibashi.com/" target="_blank">Kishi Bashi – “It All Began With A Burst”</a> © Kishi Bashi
                  </small>
                </li>
                <li className="plyr__cite plyr__cite--youtube" hidden>
                  <small>
                    <a href="https://www.youtube.com/watch?v=bTqVqk7FSmY" target="_blank">View From A Blue Moon</a> on&nbsp;
                    <span className="color--youtube">
                      <svg className="icon" role="presentation">
                        <title>YouTube</title>
                        <path d="M15.8,4.8c-0.2-1.3-0.8-2.2-2.2-2.4C11.4,2,8,2,8,2S4.6,2,2.4,2.4C1,2.6,0.3,3.5,0.2,4.8C0,6.1,0,8,0,8
                                    s0,1.9,0.2,3.2c0.2,1.3,0.8,2.2,2.2,2.4C4.6,14,8,14,8,14s3.4,0,5.6-0.4c1.4-0.3,2-1.1,2.2-2.4C16,9.9,16,8,16,8S16,6.1,15.8,4.8z
                                      M6,11V5l5,3L6,11z" />
                      </svg>YouTube
                    </span>
                  </small>
                </li>
                <li className="plyr__cite plyr__cite--vimeo" hidden>
                  <small>
                    <a href="https://vimeo.com/76979871" target="_blank">The New Vimeo Player</a> on&nbsp;
                    <span className="color--vimeo">
                      <svg className="icon" role="presentation">
                        <title>Vimeo</title>
                        <path d="M16,4.3c-0.1,1.6-1.2,3.7-3.3,6.4c-2.2,2.8-4,4.2-5.5,4.2c-0.9,0-1.7-0.9-2.4-2.6C4,9.9,3.4,5,2,5
                                C1.9,5,1.5,5.3,0.8,5.8L0,4.8c0.8-0.7,3.5-3.4,4.7-3.5C5.9,1.2,6.7,2,7,3.8c0.3,2,0.8,6.1,1.8,6.1c0.9,0,2.5-3.4,2.6-4
                                c0.1-0.9-0.3-1.9-2.3-1.1c0.8-2.6,2.3-3.8,4.5-3.8C15.3,1.1,16.1,2.2,16,4.3z" />
                      </svg>Vimeo
                    </span>
                  </small>
                </li>
              </ul>
            </main>
          </div>
        <aside>
          <svg className="icon">
            <title>Twitter</title>
            <path d="M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1
      C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7
      c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3
      c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z" />
          </svg>
          <p>If you think Plyr's good,
            <a href="https://twitter.com/intent/tweet?text=A+simple+HTML5+media+player+with+custom+controls+and+WebVTT+captions.&url=http%3A%2F%2Fplyr.io&via=Sam_Potts" target="_blank" data-shr-network="twitter">tweet it</a>
          </p>
        </aside>
      </Fragment>
    );
  }
}

export default App;
