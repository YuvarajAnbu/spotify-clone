import { Link } from 'react-router-dom';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';
import { useContext } from 'react';
import { OpenSideBarContext } from '../../App';

function Sidebar() {
  const { user, isLoggedIn } = useSelector((state) => state.user);

  const { active: activeComponent } = useSelector(
    (state) => state.activeComponent
  );
  const dispatch = useDispatch();

  const setActiveComponent = (value) => {
    dispatch(changeActiveComponent(value));
  };

  const { openSideBar, setOpenSideBar } = useContext(OpenSideBarContext);
  return (
    <div className={openSideBar ? 'sidebar active' : 'sidebar'}>
      <div className="sidebar__top">
        <div
          className="sidebar__top__close"
          onClick={() => {
            setOpenSideBar(false);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            preserveAspectRatio="xMidYMid meet"
            width="24px"
            height="24px"
          >
            <g>
              <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
            </g>
          </svg>
        </div>
        <Link
          className="sidebar__top__logo"
          to="/"
          onClick={() => {
            setOpenSideBar(false);
          }}
        >
          <svg viewBox="0 0 1134 340" className="spotify-logo--text">
            <title>Spotify</title>
            <path
              fill="currentColor"
              d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
            ></path>
          </svg>
          {/* <svg
            viewBox="0 0 152 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.976 6.6H12.64V57H0.976V6.6ZM22.441 6.6H34.105V57H22.441V6.6ZM66.658 17.688C71.458 17.688 75.322 19.128 78.25 22.008C81.226 24.888 82.714 29.16 82.714 34.824V57H71.482V36.552C71.482 33.48 70.81 31.2 69.466 29.712C68.122 28.176 66.178 27.408 63.634 27.408C60.802 27.408 58.546 28.296 56.866 30.072C55.186 31.8 54.346 34.392 54.346 37.848V57H43.114V18.264H53.842V22.8C55.33 21.168 57.178 19.92 59.386 19.056C61.594 18.144 64.018 17.688 66.658 17.688ZM130.613 3.576V57H119.885V52.536C117.101 55.896 113.069 57.576 107.789 57.576C104.141 57.576 100.829 56.76 97.8531 55.128C94.9251 53.496 92.6211 51.168 90.9411 48.144C89.2611 45.12 88.4211 41.616 88.4211 37.632C88.4211 33.648 89.2611 30.144 90.9411 27.12C92.6211 24.096 94.9251 21.768 97.8531 20.136C100.829 18.504 104.141 17.688 107.789 17.688C112.733 17.688 116.597 19.248 119.381 22.368V3.576H130.613ZM109.733 48.36C112.565 48.36 114.917 47.4 116.789 45.48C118.661 43.512 119.597 40.896 119.597 37.632C119.597 34.368 118.661 31.776 116.789 29.856C114.917 27.888 112.565 26.904 109.733 26.904C106.853 26.904 104.477 27.888 102.605 29.856C100.733 31.776 99.7971 34.368 99.7971 37.632C99.7971 40.896 100.733 43.512 102.605 45.48C104.477 47.4 106.853 48.36 109.733 48.36ZM138.849 18.264H150.081V57H138.849V18.264ZM144.465 12.864C142.401 12.864 140.721 12.264 139.425 11.064C138.129 9.864 137.481 8.376 137.481 6.6C137.481 4.824 138.129 3.336 139.425 2.136C140.721 0.935997 142.401 0.335996 144.465 0.335996C146.529 0.335996 148.209 0.911997 149.505 2.064C150.801 3.216 151.449 4.656 151.449 6.384C151.449 8.256 150.801 9.816 149.505 11.064C148.209 12.264 146.529 12.864 144.465 12.864Z"
              fill="currentColor"
            />
          </svg> */}
        </Link>
      </div>

      <ul className="sidebar__links">
        {/* <li className="sidebar__links__title">IINDI HOME</li>
        {isLoggedIn && user.username && (
          <li
            className={
              activeComponent === 'profile'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'profile') {
                setActiveComponent('profile');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/profile">
              <span>Profile</span>
            </Link>
          </li>
        )}

        {isLoggedIn && user.username && (
          <li
            className={
              activeComponent === 'messages'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'messages') {
                setActiveComponent('messages');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/messages">
              <span>Messages</span>
            </Link>
          </li>
        )} */}

        <li
          className={
            activeComponent === 'home'
              ? 'sidebar__links__link sidebar__links__link--active'
              : 'sidebar__links__link'
          }
          onClick={() => {
            if (activeComponent !== 'home') {
              setActiveComponent('home');
              setOpenSideBar(false);
            }
          }}
        >
          <Link to="/">
            <div className="default-icon">
              <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M13.5 1.515a3 3 0 00-3 0L3 5.845a2 2 0 00-1 1.732V21a1 1 0 001 1h6a1 1 0 001-1v-6h4v6a1 1 0 001 1h6a1 1 0 001-1V7.577a2 2 0 00-1-1.732l-7.5-4.33z"
                ></path>
              </svg>
            </div>
            <span>Home</span>
          </Link>
        </li>
        <li
          className={
            activeComponent === 'search'
              ? 'sidebar__links__link sidebar__links__link--active'
              : 'sidebar__links__link'
          }
          onClick={() => {
            if (activeComponent !== 'search') {
              setActiveComponent('search');
              setOpenSideBar(false);
            }
          }}
        >
          <Link to="/search">
            <div className="default-icon">
              <svg
                role="img"
                height="24"
                width="24"
                className="Svg-sc-1bi12j5-0 jgfuCe search-icon"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"
                ></path>
              </svg>
            </div>
            <span>Search</span>
          </Link>
        </li>
        <li
          className={
            activeComponent === 'playlists'
              ? 'sidebar__links__link sidebar__links__link--active'
              : 'sidebar__links__link'
          }
          onClick={() => {
            if (activeComponent !== 'playlists') {
              setActiveComponent('playlists');
              setOpenSideBar(false);
            }
          }}
        >
          <Link to="/collection">
            <div className="default-icon">
              <svg
                role="img"
                height="24"
                width="24"
                className="Svg-sc-1bi12j5-0 jgfuCe collection-icon"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"
                ></path>
              </svg>
            </div>
            <span>Your Library</span>
          </Link>
        </li>
        <li
          className={
            activeComponent === 'liked'
              ? 'sidebar__links__link sidebar__links__link--active'
              : 'sidebar__links__link'
          }
          onClick={() => {
            if (activeComponent !== 'liked') {
              setActiveComponent('liked');
              setOpenSideBar(false);
            }
          }}
        >
          <Link to="/collection/tracks">
            <div className="default-icon">
              <img
                loading="lazy"
                draggable="false"
                src="https://misc.scdn.co/liked-songs/liked-songs-640.png"
                alt=""
              />
            </div>
            <span>Liked Songs</span>
          </Link>
        </li>
      </ul>

      {/* {isLoggedIn && user.username && (
        <ul className="sidebar__links">
          <li className="sidebar__links__title">IINDI HUB</li>
          <li
            className={
              activeComponent === 'vocals'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'vocals') {
                setActiveComponent('vocals');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/vocals">
              <span>Vocals</span>
            </Link>
          </li>
          <li
            className={
              activeComponent === 'beats'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'beats') {
                setActiveComponent('beats');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/beats">
              <span>Beats</span>
            </Link>
          </li>
          <li
            className={
              activeComponent === 'covers'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'covers') {
                setActiveComponent('covers');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/covers">
              <span>Covers</span>
            </Link>
          </li>
          <li
            className={
              activeComponent === 'contests'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'contests') {
                setActiveComponent('contests');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/contests">
              <span>Contests</span>
            </Link>
          </li>
          <li
            className={
              activeComponent === 'artists'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'artists') {
                setActiveComponent('artists');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/artists">
              <span>Artists</span>
            </Link>
          </li>
          <li
            className={
              activeComponent === 'labels'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'labels') {
                setActiveComponent('labels');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/labels">
              <span>Labels</span>
            </Link>
          </li>
        </ul>
      )}

      {isLoggedIn && user.username && (
        <ul className="sidebar__links">
          <li className="sidebar__links__title">IINDI CREATE</li>
          <li
            className={
              activeComponent === 'submissions'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'submissions') {
                setActiveComponent('submissions');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/submissions">
              <span>My Submissions</span>
            </Link>
          </li>
          <li
            className={
              activeComponent === 'uploads'
                ? 'sidebar__links__link sidebar__links__link--active'
                : 'sidebar__links__link'
            }
            onClick={() => {
              if (activeComponent !== 'uploads') {
                setActiveComponent('uploads');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/uploads">
              <span>My Uploads</span>
            </Link>
          </li>
        </ul>
      )} */}

      {isLoggedIn && user.username && (
        <ul className="sidebar__upload">
          <li
            className={
              activeComponent === 'upload'
                ? 'sidebar__upload__link sidebar__upload__link--active'
                : 'sidebar__upload__link'
            }
            onClick={() => {
              if (activeComponent !== 'upload') {
                setActiveComponent('upload');
                setOpenSideBar(false);
              }
            }}
          >
            <Link to="/upload">
              <div className="default-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="24px"
                  height="24px"
                >
                  <path
                    fill="currentColor"
                    d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
                  />
                </svg>
              </div>
              <span>New Upload</span>
            </Link>
          </li>
        </ul>
      )}

      {/* <ul className="sidebar__playlists">
        <li
          className={
            activeComponent === 'liked'
              ? 'sidebar__playlists__link sidebar__playlists__link--active'
              : 'sidebar__playlists__link'
          }
          onClick={() => {
            if (activeComponent !== 'liked') {
              setActiveComponent('liked');
              setOpenSideBar(false);
            }
          }}
        >
          <Link to="/collection/tracks">
            <div className="default-icon">
              <svg role="img" height="12" width="12" viewBox="0 0 16 16">
                <path fill="none" d="M0 0h16v16H0z"></path>
                <path
                  fill="currentColor"
                  d="M13.797 2.727a4.057 4.057 0 00-5.488-.253.558.558 0 01-.31.112.531.531 0 01-.311-.112 4.054 4.054 0 00-5.487.253c-.77.77-1.194 1.794-1.194 2.883s.424 2.113 1.168 2.855l4.462 5.223a1.791 1.791 0 002.726 0l4.435-5.195a4.052 4.052 0 001.195-2.883 4.057 4.057 0 00-1.196-2.883z"
                ></path>
              </svg>
            </div>
            <span>Liked Songs</span>
          </Link>
        </li>
        <div className="sidebar__line"></div>
      </ul> */}
      <ul
        // className={
        //   isLoggedIn && user.username
        //     ? 'sidebar__install'
        //     : 'sidebar__install sidebar__bottom'
        // }
        className="sidebar__install sidebar__bottom"
      >
        <li
          className={
            activeComponent === 'install'
              ? 'sidebar__install__link sidebar__install__link--active'
              : 'sidebar__install__link'
          }
          onClick={() => {
            if (activeComponent !== 'install') {
              setActiveComponent('install');
              setOpenSideBar(false);
            }
          }}
        >
          <Link to="/download">
            <div className="default-icon">
              <svg role="img" height="24" width="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M11.5 0C5.149 0 0 5.148 0 11.5 0 17.851 5.149 23 11.5 23S23 17.851 23 11.5C23 5.148 17.851 0 11.5 0zm0 22C5.71 22 1 17.29 1 11.5S5.71 1 11.5 1 22 5.71 22 11.5 17.29 22 11.5 22zm.499-6.842V5h-1v10.149l-3.418-3.975-.758.652 4.678 5.44 4.694-5.439-.757-.653-3.439 3.984z"
                ></path>
              </svg>
            </div>
            <span>Install App</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
