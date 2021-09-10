import './index.css';

function Songs() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="songs">
      <div className="songs__header">
        <div className="songs__header__index">#</div>
        <div className="songs__header__desc">TITLE</div>
        <div className="songs__header__views">VIEWS</div>
        <div className="songs__header__duration">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M7.999 3H6.999V7V8H7.999H9.999V7H7.999V3ZM7.5 0C3.358 0 0 3.358 0 7.5C0 11.642 3.358 15 7.5 15C11.642 15 15 11.642 15 7.5C15 3.358 11.642 0 7.5 0ZM7.5 14C3.916 14 1 11.084 1 7.5C1 3.916 3.916 1 7.5 1C11.084 1 14 3.916 14 7.5C14 11.084 11.084 14 7.5 14Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      {arr.map((e, i) => (
        <div className="songs__song" key={i}>
          <div className="songs__song__index">
            <p>{i + 1}</p>
            <button>
              <svg height="32" role="img" width="32" viewBox="0 0 24 24">
                <polygon
                  points="21.57 12 5.98 3 5.98 21 21.57 12"
                  fill="currentColor"
                ></polygon>
              </svg>
              {/* <svg
          height="32"
          role="img"
          width="32"
          viewBox="0 0 24 24"
        >
          <rect x="5" y="3" width="4" height="18" fill="currentColor"></rect>
          <rect x="15" y="3" width="4" height="18" fill="currentColor"></rect>
        </svg> */}
            </button>
          </div>
          <div className="songs__song__desc">
            <div className="songs__song__desc__image-container">
              <div className="songs__song__desc__image-container__image">
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
            <div className="songs__song__desc__content">
              <p className="one-line">Venom - Music From The Motion Picture</p>
              <span className="one-line">Eminem</span>
            </div>
          </div>
          <div className="songs__song__views">714,413,140</div>
          <div className="songs__song__duration">4:29</div>
        </div>
      ))}
    </div>
  );
}

export default Songs;
