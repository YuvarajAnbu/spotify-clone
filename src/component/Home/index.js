function Home() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="home">
      <div className="home__top-background"></div>

      <section className="home__liked-section">
        <h2>Good evening</h2>

        <div className="home__liked-section__song">
          <div className="home__liked-section__song__desc">
            <div className="home__liked-section__song__image">
              <img src="https://misc.scdn.co/liked-songs/liked-songs-640.png" />
            </div>
            <h1>Lined songs</h1>
          </div>
          <button type="button" className="active">
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
        {arr.map(() => (
          <div className="home__liked-section__song">
            <div className="home__liked-section__song__desc">
              <div className="home__liked-section__song__image">
                <img src="https://i.scdn.co/image/ab67616d00001e02768412f6074c56d0399f112b" />
              </div>
              <h1>crazy life</h1>
            </div>
            <button type="button" className="active">
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
      </section>
    </div>
  );
}

export default Home;
