import { useEffect, useState, createContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { checkLogged, clearErrorMsg, getUser } from './redux/user/userSlice';
import SignUp from './component/Signup';
import SignIn from './component/SignIn';

const Playbar = lazy(() => import('./component/Playbar'));
const Sidebar = lazy(() => import('./component/Sidebar'));
const Header = lazy(() => import('./component/Header'));
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
const Lyrics = lazy(() => import('./component/Lyrics'));
const NoMatch = lazy(() => import('./component/404'));
const Genre = lazy(() => import('./component/Genre'));

export const ScrollTopContext = createContext();
export const PopupContext = createContext();
export const OpenSideBarContext = createContext();

function App() {
  const theme = 'dark-theme';
  const [scrollTop, setScollTop] = useState(0);
  const [popup, setPopup] = useState('');
  const [openSideBar, setOpenSideBar] = useState(false);

  const dispatch = useDispatch();
  const { isGetLoading } = useSelector((state) => state.user);

  useEffect(() => {
    document.querySelector('body').className = theme;
  }, [theme]);

  useEffect(() => {
    dispatch(checkLogged());
    dispatch(getUser());
  }, [dispatch]);

  return isGetLoading ? (
    <div></div>
  ) : (
    <div className="App">
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<div></div>}>
            <OpenSideBarContext.Provider
              value={{ openSideBar, setOpenSideBar }}
            >
              <Sidebar />
              {openSideBar && (
                <div
                  className="sidebar__close-box"
                  onClick={() => {
                    setOpenSideBar(false);
                  }}
                ></div>
              )}

              <Playbar />
              <div
                className="main-view"
                onScroll={(e) => {
                  setScollTop(e.target.scrollTop);
                }}
              >
                <ScrollTopContext.Provider value={scrollTop}>
                  <PopupContext.Provider value={{ popup, setPopup }}>
                    <Header />
                    {popup !== '' && (
                      <div className="popup">
                        <div
                          className="popup__hover-box"
                          onClick={() => {
                            dispatch(clearErrorMsg());
                            setPopup('');
                          }}
                        ></div>
                        {popup === 'login' && <SignIn />}
                        {popup === 'signup' && <SignUp />}
                      </div>
                    )}
                  </PopupContext.Provider>
                </ScrollTopContext.Provider>
                <Suspense fallback={<div></div>}>
                  <Switch>
                    <Route component={Home} path="/" exact />
                    <Route component={Search} path="/search" exact />
                    <Route component={Results} path="/search/:id" exact />
                    <Route component={YourPlaylist} path="/collection" exact />
                    <Route
                      component={LikedSongs}
                      path="/collection/tracks"
                      exact
                    />
                    <Route component={Song} path="/album/:id" exact />
                    <Route component={Artist} path="/artist/:id" exact />
                    <Route component={Profile} path="/profile/:id" exact />
                    <Route component={Queue} path="/queue" exact />
                    <Route component={Install} path="/download" exact />
                    <Route component={Lyrics} path="/lyrics" exact />
                    <Route component={Genre} path="/genre/:id" exact />
                    <Route component={NoMatch} />
                  </Switch>
                </Suspense>
              </div>
            </OpenSideBarContext.Provider>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
