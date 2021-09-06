import { Slider } from 'antd';
import { Link } from 'react-router-dom';

import './index.css';

function Playbar() {
  return (
    <div className="playbar">
      <div className="playbar__desc">
        <Link to="/">
          <img src="https://i.scdn.co/image/ab67616d00001e02768412f6074c56d0399f112b" />
        </Link>
        <div className="playbar__desc__name one-line">
          <p className="one-line">
            <Link to="/">crazy life</Link>
          </p>
          <span className="one-line">
            <Link to="/">free hexel</Link>, <Link to="/">free hexel</Link>
          </span>
        </div>

        <div
          className="playbar__desc__icon"
          title="Save to Your Library"
          // "Remove form Your Library"
        >
          {/* <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path
              fill="#ffffff"
              d="M13.764 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253A4.05 4.05 0 00.974 5.61c0 1.089.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195A4.052 4.052 0 0014.96 5.61a4.057 4.057 0 00-1.196-2.883zm-.722 5.098L8.58 13.048c-.307.36-.921.36-1.228 0L2.864 7.797a3.072 3.072 0 01-.905-2.187c0-.826.321-1.603.905-2.187a3.091 3.091 0 012.191-.913 3.05 3.05 0 011.957.709c.041.036.408.351.954.351.531 0 .906-.31.94-.34a3.075 3.075 0 014.161.192 3.1 3.1 0 01-.025 4.403z"
            ></path>
          </svg> */}
          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path fill="none" d="M0 0h16v16H0z"></path>
            <path
              fill="#1db954"
              d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="playbar__controls">
        <div className="playbar__controls__buttons">
          <button type="button" className="suffle active">
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"></path>
            </svg>
          </button>

          <button type="button" className="prev">
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
            </svg>
          </button>

          <button type="button" className="play">
            {/* <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path className="a" fill="none" d="M0 0h16v16H0z"></path>
              <path
                className="b"
                fill="#ffffff"
                d="M3 2h3v12H3zm7 0h3v12h-3z"
              ></path>
            </svg> */}
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path className="b" d="M4.018 14L14.41 8 4.018 2z"></path>
            </svg>
          </button>

          <button type="button" className="next">
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
            </svg>
          </button>

          <button type="button" className="repeat active">
            <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"></path>
            </svg>
            {/* <svg role="img" height="16" width="16" viewBox="0 0 16 16">
              <path className="a" fill="none" d="M0 0h16v16H0z"></path>
              <path
                className="b"
                d="M5 5V4c-2.2.3-4 2.2-4 4.5 0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.7 3.3 5.3 5 5zm5.5 7H6v-1.5l-3.5 2 3.5 2V13h4.5c1.9 0 3.5-1.2 4.2-2.8-.5.3-1 .5-1.5.6-.7.7-1.6 1.2-2.7 1.2zm1-12C9 0 7 2 7 4.5S9 9 11.5 9 16 7 16 4.5 14 0 11.5 0zm.9 7h-1.3V3.6H10v-1h.1c.2 0 .3 0 .4-.1.1 0 .3-.1.4-.2.1-.1.2-.2.2-.3.1-.1.1-.2.1-.3v-.1h1.1V7z"
              ></path>
            </svg> */}
          </button>
        </div>

        <div className="playbar__controls__slider">
          <span>2:04</span>
          <Slider
            max={420}
            tooltipVisible={false}
            handleStyle={{
              backgroundColor: '#fff',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
            }}
          />
          <span>4:19</span>
        </div>
      </div>

      <div className="playbar__extras">
        <button>
          <svg role="img" height="16" width="16" viewBox="0 0 16 16">
            <path d="M8.5 1A4.505 4.505 0 004 5.5c0 .731.191 1.411.502 2.022L1.99 13.163a1.307 1.307 0 00.541 1.666l.605.349a1.307 1.307 0 001.649-.283L9.009 9.95C11.248 9.692 13 7.807 13 5.5 13 3.019 10.981 1 8.5 1zM4.023 14.245a.307.307 0 01-.388.066l-.605-.349a.309.309 0 01-.128-.393l2.26-5.078A4.476 4.476 0 007.715 9.92l-3.692 4.325zM8.5 9C6.57 9 5 7.43 5 5.5S6.57 2 8.5 2 12 3.57 12 5.5 10.429 9 8.5 9z"></path>
          </svg>
        </button>
        <button className="active">
          <svg
            width="16px"
            height="16px"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g>
                <g>
                  <path d="M3,14c-0.1689453,0-0.3369141-0.0429688-0.4892578-0.1279297C2.1953125,13.6953125,2,13.3613281,2,13V5     c0-0.3613281,0.1953125-0.6953125,0.5107422-0.8720703C2.828125,3.9521484,3.2128906,3.9580078,3.5214844,4.1464844l6.5458984,4     C10.3642578,8.328125,10.5458984,8.6513672,10.5458984,9s-0.1816406,0.671875-0.4785156,0.8535156l-6.5458984,4     C3.3613281,13.9511719,3.1806641,14,3,14z M4,6.7832031v4.4335938L7.6279297,9L4,6.7832031z" />
                </g>
              </g>
              <g>
                <path d="M29,10H13c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h16c0.5527344,0,1,0.4472656,1,1S29.5527344,10,29,10z" />
              </g>
              <g>
                <path d="M29,28H5c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h24c0.5527344,0,1,0.4472656,1,1S29.5527344,28,29,28z" />
              </g>
              <g>
                <path d="M29,19H5c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h24c0.5527344,0,1,0.4472656,1,1S29.5527344,19,29,19z" />
              </g>
            </g>
          </svg>
        </button>
        <div className="playbar__extras__volume-bar">
          <button>
            <svg role="presentation" height="16" width="16" viewBox="0 0 16 16">
              <path d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"></path>
              {/* <path d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"></path> */}
              {/* <path d="M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z"></path> */}
            </svg>
          </button>
          <Slider
            className="playbar__extras__slider"
            defaultValue={100}
            max={100}
            tooltipVisible={false}
            handleStyle={{
              backgroundColor: '#fff',
              border: 'none',
              outline: 'none',
              boxShadow: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Playbar;
