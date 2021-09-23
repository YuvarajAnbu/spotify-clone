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
          <svg
            viewBox="0 0 152 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.976 6.6H12.64V57H0.976V6.6ZM22.441 6.6H34.105V57H22.441V6.6ZM66.658 17.688C71.458 17.688 75.322 19.128 78.25 22.008C81.226 24.888 82.714 29.16 82.714 34.824V57H71.482V36.552C71.482 33.48 70.81 31.2 69.466 29.712C68.122 28.176 66.178 27.408 63.634 27.408C60.802 27.408 58.546 28.296 56.866 30.072C55.186 31.8 54.346 34.392 54.346 37.848V57H43.114V18.264H53.842V22.8C55.33 21.168 57.178 19.92 59.386 19.056C61.594 18.144 64.018 17.688 66.658 17.688ZM130.613 3.576V57H119.885V52.536C117.101 55.896 113.069 57.576 107.789 57.576C104.141 57.576 100.829 56.76 97.8531 55.128C94.9251 53.496 92.6211 51.168 90.9411 48.144C89.2611 45.12 88.4211 41.616 88.4211 37.632C88.4211 33.648 89.2611 30.144 90.9411 27.12C92.6211 24.096 94.9251 21.768 97.8531 20.136C100.829 18.504 104.141 17.688 107.789 17.688C112.733 17.688 116.597 19.248 119.381 22.368V3.576H130.613ZM109.733 48.36C112.565 48.36 114.917 47.4 116.789 45.48C118.661 43.512 119.597 40.896 119.597 37.632C119.597 34.368 118.661 31.776 116.789 29.856C114.917 27.888 112.565 26.904 109.733 26.904C106.853 26.904 104.477 27.888 102.605 29.856C100.733 31.776 99.7971 34.368 99.7971 37.632C99.7971 40.896 100.733 43.512 102.605 45.48C104.477 47.4 106.853 48.36 109.733 48.36ZM138.849 18.264H150.081V57H138.849V18.264ZM144.465 12.864C142.401 12.864 140.721 12.264 139.425 11.064C138.129 9.864 137.481 8.376 137.481 6.6C137.481 4.824 138.129 3.336 139.425 2.136C140.721 0.935997 142.401 0.335996 144.465 0.335996C146.529 0.335996 148.209 0.911997 149.505 2.064C150.801 3.216 151.449 4.656 151.449 6.384C151.449 8.256 150.801 9.816 149.505 11.064C148.209 12.264 146.529 12.864 144.465 12.864Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>

      <ul className="sidebar__links">
        <li className="sidebar__links__title">IINDI HOME</li>
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
        )}

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
            <span>Liked Songs</span>
          </Link>
        </li>
      </ul>

      {isLoggedIn && user.username && (
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
      )}

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
        className={
          isLoggedIn && user.username
            ? 'sidebar__install'
            : 'sidebar__install sidebar__bottom'
        }
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
