import { useContext } from 'react';
import { Popover } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
  ActiveContext,
  IsLoggedInContext,
  PopupContext,
  ScrollTopContext,
  UserContext,
} from '../../App';
import './index.css';
import { useState } from 'react/cjs/react.development';

function Header() {
  let history = useHistory();

  const scrollTop = useContext(ScrollTopContext);
  const { activeComponent } = useContext(ActiveContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(IsLoggedInContext);
  const { setPopup } = useContext(PopupContext);
  const { user, setUser } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState('');

  const [hidePopOver, setHidePopover] = useState(false);

  const popOver = () => (
    <ul className="header__profile__pop-over">
      <li>
        <Link
          to="/user/nbmnbnyd"
          style={{ width: '100%' }}
          onClick={() => {
            setHidePopover(false);
          }}
        >
          profile
        </Link>
      </li>
      <li
        onClick={() => {
          setIsLoggedIn(false);
          setUser({});
          setHidePopover(false);
        }}
      >
        <span>logout</span>
      </li>
    </ul>
  );

  return (
    <header>
      <div
        className="header"
        style={{
          backgroundColor:
            scrollTop <= 100
              ? `rgba(16, 16, 16, ${scrollTop / 100})`
              : 'rgba(16, 16, 16, 1)',
        }}
      >
        <div className="header__history">
          <button
            type="button"
            className="prev"
            title="Go back"
            onClick={() => {
              history.goBack();
            }}
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
          <button
            type="button"
            className="next"
            title="Go forward"
            onClick={() => {
              history.goForward();
            }}
          >
            <svg role="img" height="24" width="24" viewBox="0 0 24 24">
              <polyline
                points="8 4 17 12 8 20"
                fill="none"
                stroke="#181818"
              ></polyline>
            </svg>
          </button>
        </div>

        {activeComponent === 'search' && (
          <div className="header__search">
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                history.push(`/search/${searchValue}`);
              }}
            >
              <input
                maxLength="80"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                placeholder="Artists, songs, or podcasts"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />

              <svg
                height="24"
                role="img"
                width="24"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
                  fill="currentColor"
                ></path>
              </svg>
            </form>
          </div>
        )}
        {isLoggedIn && user.username ? (
          <div className="header__profile">
            <Popover
              placement="bottomRight"
              content={popOver}
              trigger="click"
              visible={hidePopOver}
              onVisibleChange={(e) => setHidePopover(e)}
            >
              <button type="button">
                <img
                  src="https://i.scdn.co/image/ab6775700000ee859dcd4682008374c5d9ffc8c6"
                  aria-hidden="false"
                  loading="eager"
                  alt="xanderHere"
                />
                <span className="one-line">{user.username}</span>
                <svg
                  role="img"
                  height="16"
                  width="16"
                  className="Svg-sc-1bi12j5-0 gSLhUO _kBqVtNa6io1mPbycO8V"
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
        ) : (
          <div className="header__log">
            <button
              className="header__log__sign-up"
              onClick={() => {
                setPopup('signup');
              }}
            >
              SIGN UP
            </button>
            <button
              className="header__log__log-in"
              onClick={() => {
                setPopup('login');
              }}
            >
              LOG IN
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
