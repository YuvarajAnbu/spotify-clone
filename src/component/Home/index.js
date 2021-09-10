import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActiveContext } from '../../App.js';
import HomeDefault from '../SmallComponents/HomeDefault/index.js';
import './index.css';

function Home() {
  const arr = [
    {
      type: 'artist',
    },
    { type: 'song' },
    {
      type: 'artist',
    },
    { type: 'song' },
    {
      type: 'artist',
    },
    { type: 'song' },
    {
      type: 'artist',
    },
    { type: 'song' },
    {
      type: 'artist',
    },
  ];

  const { setActiveComponent } = useContext(ActiveContext);

  useEffect(() => {
    setActiveComponent('home');
    document.title = 'Spotify - Web Player';
  }, [setActiveComponent]);

  const arr1 = arr;
  const arr2 = arr;

  return (
    <div className="home">
      <div className="home__top-background"></div>

      <div className="home__section">
        <section className="home__section__top-section">
          <h2>Good evening</h2>

          <div className="home__section__top-section__songs">
            <div
              className="home__section__top-section__songs__song"
              draggable="false"
            >
              <Link to="/collection/tracks" draggable="false">
                <div className="home__section__top-section__songs__song__desc">
                  <div className="home__section__top-section__songs__song__desc__image-container">
                    <div className="home__section__top-section__songs__song__desc__image-container__image">
                      <img
                        loading="lazy"
                        draggable="false"
                        src="https://misc.scdn.co/liked-songs/liked-songs-640.png"
                        alt="dua"
                        onError={(e) => {
                          e.target.insertAdjacentHTML(
                            'afterend',
                            `<svg
                            role="img"
                            height="24"
                            width="24"
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 6.159v10.899A3.485 3.485 0 006.5 16C4.57 16 3 17.57 3 19.5S4.57 23 6.5 23s3.5-1.57 3.5-3.5V6.969L21 4.63v10.178a3.485 3.485 0 00-2.5-1.058c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5V3.395L9 6.159zM6.5 22C5.122 22 4 20.878 4 19.5S5.122 17 6.5 17 9 18.122 9 19.5 7.878 22 6.5 22zm12-2.25a2.503 2.503 0 01-2.5-2.5c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path>
                          </svg>`
                          );
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <p className="one-line">Liked songs</p>
                </div>
              </Link>
              <button
                type="button"
                // className="active"
              >
                {/* <svg
                  height="16"
                  role="img"
                  width="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <polygon
                    points="21.57 12 5.98 3 5.98 21 21.57 12"
                    fill="currentColor"
                  ></polygon>
                </svg> */}
                <svg
                  height="16"
                  role="img"
                  width="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect
                    x="5"
                    y="3"
                    width="4"
                    height="18"
                    fill="currentColor"
                  ></rect>
                  <rect
                    x="15"
                    y="3"
                    width="4"
                    height="18"
                    fill="currentColor"
                  ></rect>
                </svg>
              </button>
            </div>
            {arr1.map((e, i) => (
              <div key={i} className="home__section__top-section__songs__song">
                <Link to="/album/1qweqwe1d32" draggable="false">
                  <div className="home__section__top-section__songs__song__desc">
                    <div className="home__section__top-section__songs__song__desc__image-container">
                      <div className="home__section__top-section__songs__song__desc__image-container__image">
                        <img
                          loading="lazy"
                          draggable="false"
                          src="https://i.scdn.co/image/ab67706f000000027cda1a881997b0bb1ca0eb92"
                          alt="dua"
                          onError={(e) => {
                            e.target.insertAdjacentHTML(
                              'afterend',
                              '<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" class="Svg-sc-1bi12j5-0 gSLhUO"><path d="M9 6.159v10.899A3.485 3.485 0 006.5 16C4.57 16 3 17.57 3 19.5S4.57 23 6.5 23s3.5-1.57 3.5-3.5V6.969L21 4.63v10.178a3.485 3.485 0 00-2.5-1.058c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5V3.395L9 6.159zM6.5 22C5.122 22 4 20.878 4 19.5S5.122 17 6.5 17 9 18.122 9 19.5 7.878 22 6.5 22zm12-2.25a2.503 2.503 0 01-2.5-2.5c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"></path></svg>'
                            );
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                    <p className="one-line">Ariana Grande - all songs</p>
                  </div>
                </Link>
                <button type="button">
                  <svg
                    height="16"
                    role="img"
                    width="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <polygon
                      points="21.57 12 5.98 3 5.98 21 21.57 12"
                      fill="currentColor"
                    ></polygon>
                  </svg>
                  {/* <svg
                    height="16"
                    role="img"
                    width="16"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect
                      x="5"
                      y="3"
                      width="4"
                      height="18"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="15"
                      y="3"
                      width="4"
                      height="18"
                      fill="currentColor"
                    ></rect>
                  </svg> */}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="home__section__default-section">
          <div className="home__section__default-section__title">
            <h2>
              <Link to="/album/dcig">Recently played</Link>
            </h2>
            <span>
              <Link to="/album/dcig">SEE ALL</Link>
            </span>
          </div>
          <HomeDefault arr={arr2} />
        </section>

        <section className="home__section__default-section">
          <div className="home__section__default-section__title">
            <h2>
              <Link to="/album/dcig">Recently played</Link>
            </h2>
            <span>
              <Link to="/album/dcig">SEE ALL</Link>
            </span>
          </div>
          <HomeDefault arr={arr2} />
        </section>

        <section className="home__section__default-section">
          <div className="home__section__default-section__title">
            <h2>
              <Link to="/genre/recently-played">Recently played</Link>
            </h2>
            <span>
              <Link to="/genre/recently-played">SEE ALL</Link>
            </span>
          </div>
          <HomeDefault arr={arr2} />
        </section>
      </div>
    </div>
  );
}

export default Home;
