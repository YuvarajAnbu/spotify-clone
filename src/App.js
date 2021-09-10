import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import { Alert, Input } from 'antd';
import './App.css';
import Playbar from './component/Playbar';
import Sidebar from './component/Sidebar';
import Header from './component/header';
import Home from './component/Home';
import Search from './component/Search';
import Results from './component/Results';
import YourPlaylist from './component/YourPlaylist';
import LikedSongs from './component/LikedSongs';
import Song from './component/Song';
import Artist from './component/Artist';
import Profile from './component/Profile';
import Queue from './component/Queue';
import Install from './component/Install';

export const ActiveContext = createContext();
export const WindowSizeContext = createContext();
export const ScrollTopContext = createContext();
export const IsLoggedInContext = createContext();
export const PopupContext = createContext();
export const UserContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark-theme');
  // const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [scrollTop, setScollTop] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');
  const [popup, setPopup] = useState('');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [signup, setSignup] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState('');

  useEffect(() => {
    document.querySelector('body').className = theme;
  }, [theme]);

  // useLayoutEffect(() => {
  //   function updateSize() {
  //     setWindowSize(window.innerWidth);
  //   }
  //   window.addEventListener('resize', updateSize);
  //   updateSize();
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);

  useEffect(() => {
    const userArr = localStorage.getItem('user');
    const isLogged = localStorage.getItem('isLogged');
    if (!isLogged) {
      localStorage.setItem('isLogged', JSON.stringify(false));
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(JSON.parse(localStorage.getItem('isLogged')));
    }
    if (userArr) {
      const userObj = JSON.parse(userArr);
      setUser(userObj[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLogged', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const onSubmitSignup = (e) => {
    e.preventDefault();
    const userArr = localStorage.getItem('user');
    if (userArr) {
      localStorage.setItem(
        'user',
        JSON.stringify([signup, ...JSON.parse(localStorage.getItem('user'))])
      );
    } else {
      localStorage.setItem('user', JSON.stringify([signup]));
    }
    setUser(signup);
    setIsLoggedIn(true);
    setPopup('');
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const userArr = localStorage.getItem('user');

    if (userArr) {
      const userObj = JSON.parse(userArr).find(
        (e) => e.username === login.username && e.password === login.password
      );
      if (userObj) {
        localStorage.setItem(
          'user',
          JSON.stringify([userObj, ...JSON.parse(localStorage.getItem('user'))])
        );
        setUser(userObj);
        setIsLoggedIn(true);
        setPopup('');
      } else {
        setAlert('Incorrect username or password');
      }
    }
  };

  return (
    <div className="App">
      <Router>
        <ActiveContext.Provider value={{ activeComponent, setActiveComponent }}>
          {/* <WindowSizeContext.Provider value={windowSize}> */}
          <ScrollTopContext.Provider value={scrollTop}>
            <IsLoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
              <PopupContext.Provider value={{ popup, setPopup }}>
                <UserContext.Provider value={{ user, setUser }}>
                  <Sidebar />
                  <Playbar />
                  <div
                    className="main-view"
                    onScroll={(e) => {
                      setScollTop(e.target.scrollTop);
                    }}
                  >
                    <Header />
                    <Switch>
                      <Route component={Home} path="/" exact />
                      <Route component={Search} path="/search" exact />
                      <Route component={Results} path="/search/:id" exact />
                      <Route
                        component={YourPlaylist}
                        path="/collection"
                        exact
                      />
                      <Route
                        component={LikedSongs}
                        path="/collection/tracks"
                        exact
                      />
                      <Route component={Song} path="/album/:id" exact />
                      <Route component={Artist} path="/artist/:id" exact />
                      <Route component={Profile} path="/user/:id" exact />
                      <Route component={Queue} path="/queue" exact />
                      <Route component={Install} path="/download" exact />
                    </Switch>
                  </div>
                </UserContext.Provider>
              </PopupContext.Provider>
            </IsLoggedInContext.Provider>
          </ScrollTopContext.Provider>
          {/* </WindowSizeContext.Provider> */}
        </ActiveContext.Provider>
      </Router>

      {popup !== '' && (
        <div className="popup">
          <div
            className="popup__hover-box"
            onClick={() => {
              setPopup('');
            }}
          ></div>
          {popup === 'login' && (
            <div className="popup__container">
              <h1>Log in to Spotify</h1>

              {alert !== '' && (
                <Alert
                  role="alert"
                  message={alert}
                  type="error"
                  showIcon
                  closable
                  onClose={() => {
                    setAlert('');
                  }}
                />
              )}
              <form onSubmit={onSubmitLogin}>
                <div className="popup__container__input-container">
                  <label>
                    UserName <span>*</span>
                  </label>
                  <Input
                    name="username"
                    placeholder="username"
                    required
                    value={login.username}
                    onChange={(e) => {
                      setLogin((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="popup__container__input-container">
                  <label>
                    Password <span>*</span>
                  </label>
                  <Input.Password
                    name="password"
                    placeholder="password"
                    required
                    value={login.password}
                    onChange={(e) => {
                      setLogin((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
                <button className="btn" type="submit">
                  submit
                </button>
              </form>
            </div>
          )}
          {popup === 'signup' && (
            <div className="popup__container">
              <h1>Signup to Spotify</h1>
              <form onSubmit={onSubmitSignup}>
                <div className="popup__container__input-container">
                  <label>
                    Email <span>*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={signup.email}
                    onChange={(e) => {
                      setSignup((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    required
                  />
                </div>
                <div className="popup__container__input-container">
                  <label>
                    UserName <span>*</span>
                  </label>
                  <Input
                    name="username"
                    placeholder="username"
                    required
                    value={signup.username}
                    onChange={(e) => {
                      setSignup((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div className="popup__container__input-container">
                  <label>
                    Password <span>*</span>
                  </label>
                  <Input.Password
                    name="password"
                    placeholder="password"
                    required
                    value={signup.password}
                    onChange={(e) => {
                      setSignup((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                </div>
                <button className="btn" type="submit">
                  submit
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
