import { Popover } from 'antd';
import './index.css';

function Header() {
  const popOver = () => (
    <ul className="header__profile__pop-over">
      <li>profile</li>
      <li>logout</li>
    </ul>
  );

  return (
    <div className="header">
      <div className="header__history">
        <button
          type="button"
          className="prev"
          title="Go back"
          className="disabled"
        >
          <svg
            role="img"
            focusable="false"
            height="24"
            width="24"
            viewBox="0 0 24 24"
          >
            <polyline
              points="16 4 7 12 16 20"
              fill="none"
              stroke="#181818"
            ></polyline>
          </svg>
        </button>
        <button type="button" className="next" title="Go forward">
          <svg role="img" height="24" width="24" viewBox="0 0 24 24">
            <polyline
              points="8 4 17 12 8 20"
              fill="none"
              stroke="#181818"
            ></polyline>
          </svg>
        </button>
      </div>

      <div className="header__profile">
        <Popover placement="rightBottom" content={popOver} trigger="click">
          <button type="button">
            <img
              src="https://i.scdn.co/image/ab67616d00001e02768412f6074c56d0399f112b"
              aria-hidden="false"
              loading="eager"
              alt="xanderHere"
            />
            <span className="one-line">
              xanderHeresssssssssssssssssssssssssssssssssssssss
            </span>
            <svg
              role="img"
              height="16"
              width="16"
              class="Svg-sc-1bi12j5-0 gSLhUO _kBqVtNa6io1mPbycO8V"
              viewBox="0 0 16 16"
            >
              <path d="M3 6l5 5.794L13 6z"></path>
            </svg>
            {/* <svg
              role="img"
              height="16"
              width="16"
              class="Svg-sc-1bi12j5-0 gSLhUO _kBqVtNa6io1mPbycO8V"
              viewBox="0 0 16 16"
            >
              <path d="M13 10L8 4.206 3 10z"></path>
            </svg> */}
          </button>
        </Popover>
      </div>
    </div>
  );
}

export default Header;
