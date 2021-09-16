import { Link } from 'react-router-dom';
import './index.css';

function HomeDefault(props) {
  return (
    <div className="default__songs">
      {props.arr.map((e, i) => (
        <div key={i} className={`default__songs__song ${e.type}`}>
          <div className="link__container">
            <div className="default__songs__song__image-container">
              <div className="default__songs__song__image-container__image">
                <img
                  loading="lazy"
                  draggable="false"
                  src="https://i.scdn.co/image/ab67706f000000027cda1a881997b0bb1ca0eb92"
                  alt="dua"
                  onError={(e) => {
                    if (
                      e.target.parentNode.parentNode.parentNode.classList.contains(
                        'artist'
                      )
                    ) {
                      e.target.insertAdjacentHTML(
                        'afterend',
                        `<svg
                            height="32"
                            role="img"
                            width="32"
                            viewBox="-25 -22 100 100"
                            aria-hidden="true"
                          >
                            <path
                              d="M35.711 34.619l-4.283-2.461a1.654 1.654 0 0 1-.808-1.156 1.65 1.65 0 0 1 .373-1.36l3.486-4.088a14.3 14.3 0 0 0 3.432-9.293V14.93c0-3.938-1.648-7.74-4.522-10.435C30.475 1.764 26.658.398 22.661.661c-7.486.484-13.35 6.952-13.35 14.725v.875c0 3.408 1.219 6.708 3.431 9.292l3.487 4.089a1.656 1.656 0 0 1-.436 2.516l-8.548 4.914A14.337 14.337 0 0 0 0 49.513V53.5h2v-3.987c0-4.417 2.388-8.518 6.237-10.705l8.552-4.916a3.648 3.648 0 0 0 1.783-2.549 3.643 3.643 0 0 0-.822-2.999l-3.488-4.091a12.297 12.297 0 0 1-2.951-7.993v-.875c0-6.721 5.042-12.312 11.479-12.729 3.449-.22 6.725.949 9.231 3.298a12.182 12.182 0 0 1 3.89 8.976v1.331c0 2.931-1.048 5.77-2.952 7.994l-3.487 4.089a3.653 3.653 0 0 0-.822 3 3.653 3.653 0 0 0 1.782 2.548l3.036 1.745a11.959 11.959 0 0 1 2.243-1.018zM45 25.629v15.289a7.476 7.476 0 0 0-5.501-2.418c-4.135 0-7.5 3.365-7.5 7.5s3.364 7.5 7.5 7.5 7.5-3.365 7.5-7.5V29.093l5.861 3.384 1-1.732L45 25.629zM39.499 51.5a5.506 5.506 0 0 1-5.5-5.5c0-3.033 2.467-5.5 5.5-5.5s5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5z"
                              fill="currentColor"
                              fill-rule="evenodd"
                            ></path>
                          </svg>`
                      );
                    } else {
                      e.target.insertAdjacentHTML(
                        'afterend',
                        `<svg
                      height="32"
                      role="img"
                      width="32"
                      viewBox="-20 -25 100 100"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 7.494v28.362A8.986 8.986 0 0 0 9 32.5c-4.962 0-9 4.038-9 9s4.038 9 9 9 9-4.038 9-9V9.113l30-6.378v27.031a8.983 8.983 0 0 0-7-3.356c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9s9-4.037 9-9V.266L16 7.494zM9 48.5c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7c0 3.859-3.141 7-7 7zm32-6.09c-3.86 0-7-3.14-7-7 0-3.859 3.14-7 7-7s7 3.141 7 7c0 3.861-3.141 7-7 7z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      ></path>
                    </svg>`
                      );
                    }

                    e.target.style.display = 'none';
                  }}
                />
              </div>

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
            <div className="default__songs__song__desc">
              <h3 className="one-line">Dua Lipa</h3>
              <p className="one-line">This is dua lipa</p>
            </div>
            <Link
              className="link"
              to={`/${e.type === 'artist' ? 'artist' : 'album'}/1tre1uy1r2f3i`}
            ></Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomeDefault;
