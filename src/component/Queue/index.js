import { useContext, useEffect } from 'react';
import { ActiveContext } from '../../App';
import Songs from '../SmallComponents/Songs';

import './index.css';

function Queue() {
  const { setActiveComponent } = useContext(ActiveContext);

  useEffect(() => {
    setActiveComponent('queue');
    document.title = 'Spotify - Play Queue';
  }, []);

  return (
    <div className="queue">
      {/* <div className="queue__no">
        <h1>No songs on Queue</h1>
        <p>Add songs or play song to add it in Queue.</p>
      </div> */}

      <Songs />
    </div>
  );
}

export default Queue;