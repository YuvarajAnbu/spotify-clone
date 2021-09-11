import { useEffect, useContext } from 'react';
import './index.css';
import { ActiveContext } from '../../App';
import ScrollToTop from '../../ScrollToTop';

function Install() {
  const { setActiveComponent } = useContext(ActiveContext);

  useEffect(() => {
    setActiveComponent('install');
    document.title = 'Spotify - Download';
  }, [setActiveComponent]);

  return (
    <div className="install">
      <ScrollToTop />
      <img
        src="https://open.scdn.co/cdn/images/devices/mac.5f2975e9.png"
        alt=""
      />
      <h1>Get our free app</h1>
      <h2>
        Seamlessly listen to music you love. Download the Spotify app for your
        computer.
      </h2>
      <a
        href="/download"
        // target="__black"
      >
        DOWNLOAD APP
      </a>
    </div>
  );
}

export default Install;
