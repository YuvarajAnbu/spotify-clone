import {
  useEffect,
  useState,
  createContext,
  lazy,
  Suspense,
  Fragment,
  useRef,
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Alert, Input } from 'antd';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

const Playbar = lazy(() => import('./component/Playbar'));
const Sidebar = lazy(() => import('./component/Sidebar'));
const Header = lazy(() => import('./component/header'));
const Home = lazy(() => import('./component/Home'));
const Search = lazy(() => import('./component/Search'));
const Results = lazy(() => import('./component/Results'));
const YourPlaylist = lazy(() => import('./component/YourPlaylist'));
const LikedSongs = lazy(() => import('./component/LikedSongs'));
const Song = lazy(() => import('./component/Song'));
const Artist = lazy(() => import('./component/Artist'));
const Profile = lazy(() => import('./component/Profile'));
const Queue = lazy(() => import('./component/Queue'));
const Install = lazy(() => import('./component/Install'));

export const ActiveContext = createContext();
export const WindowSizeContext = createContext();
export const ScrollTopContext = createContext();
export const IsLoggedInContext = createContext();
export const PopupContext = createContext();
export const UserContext = createContext();
export const AudioContext = createContext();

function App() {
  const theme = 'dark-theme';
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
  const [currentAudio, setCurrentAudio] = useState(
    'https://res.cloudinary.com/xander-ecommerce/video/upload/v1631346908/No_lie_Feel_your_eyes_they_all_over_me_Sean_Paul_-_No_Lie_ft._Dua_Lipa_tdomfb.mp3'
  );
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0.5);
  const [audioMuted, setAudioMuted] = useState(false);

  //audio
  const audio = useRef(null);

  const audioPlay = () => {
    setIsAudioPlaying(true);
    audio.current.play();
  };

  const audioPause = () => {
    setIsAudioPlaying(false);
    audio.current.pause();
  };

  const audioChangeCurrentTime = (e) => {
    audio.current.currentTime = e;
  };

  const audioChangeVolume = (e) => {
    setAudioVolume(e);
    audio.current.volume = e;
  };

  const audioMute = (e) => {
    setAudioMuted(e);
    audio.current.muted = e;
  };

  useEffect(() => {
    audio.current.src = currentAudio;
  }, [currentAudio]);

  useEffect(() => {
    document.querySelector('body').className = theme;
  }, [theme]);

  useEffect(() => {
    // setTimeout(() => {
    //   console.log(1);
    //   audio.current.currentTime = 230.5;
    // }, 10000);

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
      <audio
        ref={audio}
        onTimeUpdate={(e) => {
          setAudioCurrentTime(e.target.currentTime);
        }}
        onCanPlay={(e) => {
          setAudioDuration(e.target.duration);
        }}
        onEnded={(e) => {
          audioPause();
          setAudioCurrentTime(0);
          console.log(e.target);
        }}
      />
      <Router>
        {console.log(2)}
        <Fragment>
          <ErrorBoundary>
            <Suspense fallback={<div></div>}>
              <ActiveContext.Provider
                value={{ activeComponent, setActiveComponent }}
              >
                {/* <WindowSizeContext.Provider value={windowSize}> */}
                <IsLoggedInContext.Provider
                  value={{ isLoggedIn, setIsLoggedIn }}
                >
                  <UserContext.Provider value={{ user, setUser }}>
                    <Sidebar />
                    <AudioContext.Provider
                      value={{
                        isAudioPlaying,
                        audioPause,
                        audioPlay,
                        audioDuration,
                        audioCurrentTime,
                        audioChangeCurrentTime,
                        audioVolume,
                        audioChangeVolume,
                        audioMuted,
                        setAudioMuted,
                        audioMute,
                      }}
                    >
                      <Playbar />
                    </AudioContext.Provider>
                    <div
                      className="main-view"
                      onScroll={(e) => {
                        setScollTop(e.target.scrollTop);
                      }}
                    >
                      <ScrollTopContext.Provider value={scrollTop}>
                        <PopupContext.Provider value={{ popup, setPopup }}>
                          <Header />
                        </PopupContext.Provider>
                      </ScrollTopContext.Provider>
                      <Switch>
                        <Suspense fallback={<div></div>}>
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
                        </Suspense>
                      </Switch>
                    </div>
                  </UserContext.Provider>
                </IsLoggedInContext.Provider>
                {/* </WindowSizeContext.Provider> */}
              </ActiveContext.Provider>
            </Suspense>
          </ErrorBoundary>
        </Fragment>
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
