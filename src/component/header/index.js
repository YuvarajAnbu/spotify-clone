import { useState, useContext, useEffect } from 'react';
import { Popover } from 'antd';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { OpenSideBarContext, PopupContext, ScrollTopContext } from '../../App';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/user/userSlice';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';

function Header() {
  let history = useHistory();
  let location = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.user);
  const { active: activeComponent } = useSelector(
    (state) => state.activeComponent
  );
  const dispatch = useDispatch();

  const { openSideBar, setOpenSideBar } = useContext(OpenSideBarContext);

  useEffect(() => {
    dispatch(changeActiveComponent(''));
  }, [location, dispatch]);

  const scrollTop = useContext(ScrollTopContext);
  const { setPopup } = useContext(PopupContext);
  const [searchValue, setSearchValue] = useState('');

  const [hidePopOver, setHidePopover] = useState(false);

  const popOver = () => (
    <ul className="header__profile__pop-over">
      <li>
        <Link
          to="/profile"
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
          // setIsLoggedIn(false);
          // setUser({});
          dispatch(logOut());
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
        <div
          className="header__sidebar-btn"
          onClick={() => {
            setOpenSideBar(true);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            className={openSideBar ? 'a' : 'b'}
            width="24px"
            height="24px"
          >
            <g>
              <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
            </g>
          </svg>
        </div>

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
                  alt=""
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
                  className="Svg-sc-1bi12j5-0 gSLhUO _kBqVtNa6io1mPbycO8V"
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
