import { Link } from 'react-router-dom';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';

function Sidebar() {
  const { active: activeComponent } = useSelector(
    (state) => state.activeComponent
  );
  const dispatch = useDispatch();

  const setActiveComponent = (value) => {
    dispatch(changeActiveComponent(value));
  };

  return (
    <div className="sidebar">
      <Link className="sidebar__logo" to="/">
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

      <ul className="sidebar__links">
        <li
          className={
            activeComponent === 'home'
              ? 'sidebar__links__link sidebar__links__link--active'
              : 'sidebar__links__link'
          }
          onClick={() => {
            if (activeComponent !== 'home') {
              setActiveComponent('home');
            }
          }}
        >
          <Link to="/">
            <div className="icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 256.274 60.84 L 84.324 166.237 L 84.324 443.063 L 193.27 443.063 L 193.27 293.73 L 320.228 293.73 L 320.228 443.063 L 428.222 443.063 L 428.222 165.476 L 256.274 60.84 Z M 256.274 35.95 L 448.452 149.145 L 448.452 464.395 L 300 464.395 L 300 315.062 L 213.499 315.062 L 213.499 464.395 L 64.095 464.395 L 64.095 150.161 L 256.274 35.95 Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div className="active-icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M448 463.746h-149.333v-149.333h-85.334v149.333h-149.333v-315.428l192-111.746 192 110.984v316.19z"
                  fill="currentColor"
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
            }
          }}
        >
          <Link to="/search">
            <div className="icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="active-icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M357.079 341.334l94.476 110.73-32.508 27.683-94.222-110.476q-45.714 30.476-100.826 30.476-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 23.365-5.841 45.714t-16.635 41.651-25.778 35.555zM224 357.079q28.19 0 53.841-11.048t44.19-29.587 29.587-44.19 11.048-53.841-11.048-53.841-29.587-44.191-44.19-29.587-53.841-11.047-53.841 11.047-44.191 29.588-29.587 44.19-11.047 53.841 11.047 53.841 29.588 44.19 44.19 29.587 53.841 11.048z"
                  fill="currentColor"
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
            }
          }}
        >
          <Link to="/collection">
            <div className="icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M291.301 81.778l166.349 373.587-19.301 8.635-166.349-373.587zM64 463.746v-384h21.334v384h-21.334zM192 463.746v-384h21.334v384h-21.334z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="active-icon">
              <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M311.873 77.46l166.349 373.587-39.111 17.27-166.349-373.587zM64 463.746v-384h42.666v384h-42.666zM170.667 463.746v-384h42.667v384h-42.666z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span>Your Library</span>
          </Link>
        </li>
        <li
          className={
            activeComponent === 'install'
              ? 'sidebar__links__link mobile sidebar__links__link--active'
              : 'sidebar__links__link mobile'
          }
          onClick={() => {
            if (activeComponent !== 'install') {
              setActiveComponent('install');
            }
          }}
        >
          <Link to="/download">
            <div className="default-icon">
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
            </div>
            <span>Get App</span>
          </Link>
        </li>
      </ul>
      <ul className="sidebar__playlists">
        <li
          className={
            activeComponent === 'liked'
              ? 'sidebar__playlists__link sidebar__playlists__link--active'
              : 'sidebar__playlists__link'
          }
          onClick={() => {
            if (activeComponent !== 'liked') {
              setActiveComponent('liked');
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
      </ul>

      <ul className="sidebar__install">
        <li
          className={
            activeComponent === 'install'
              ? 'sidebar__install__link sidebar__install__link--active'
              : 'sidebar__install__link'
          }
          onClick={() => {
            if (activeComponent !== 'install') {
              setActiveComponent('install');
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
