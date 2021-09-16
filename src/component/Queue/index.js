import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';
import ScrollToTop from '../../ScrollToTop';
import Songs from '../SmallComponents/Songs';

import './index.css';

function Queue() {
  const { queue } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveComponent('queue'));
    document.title = 'Spotify - Play Queue';
  }, [dispatch]);

  return (
    <div className="queue">
      <ScrollToTop />
      {queue.length < 1 ? (
        <div className="queue__no">
          <svg
            width="46"
            height="46"
            version="1.1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g>
                <g>
                  <path d="M3,14c-0.1689453,0-0.3369141-0.0429688-0.4892578-0.1279297C2.1953125,13.6953125,2,13.3613281,2,13V5     c0-0.3613281,0.1953125-0.6953125,0.5107422-0.8720703C2.828125,3.9521484,3.2128906,3.9580078,3.5214844,4.1464844l6.5458984,4     C10.3642578,8.328125,10.5458984,8.6513672,10.5458984,9s-0.1816406,0.671875-0.4785156,0.8535156l-6.5458984,4     C3.3613281,13.9511719,3.1806641,14,3,14z M4,6.7832031v4.4335938L7.6279297,9L4,6.7832031z"></path>
                </g>
              </g>
              <g>
                <path d="M29,10H13c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h16c0.5527344,0,1,0.4472656,1,1S29.5527344,10,29,10z"></path>
              </g>
              <g>
                <path d="M29,28H5c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h24c0.5527344,0,1,0.4472656,1,1S29.5527344,28,29,28z"></path>
              </g>
              <g>
                <path d="M29,19H5c-0.5527344,0-1-0.4472656-1-1s0.4472656-1,1-1h24c0.5527344,0,1,0.4472656,1,1S29.5527344,19,29,19z"></path>
              </g>
            </g>
          </svg>
          <h1>Add to your queue</h1>
          <p>Tap "Add to queue" from a track's menu to see it here</p>
          <Link to="/search">FIND SOMETHING TO PLAY</Link>
        </div>
      ) : (
        <Songs arr={queue} />
      )}
    </div>
  );
}

export default Queue;
