import { useEffect } from 'react';
import './index.css';
import ScrollToTop from '../../ScrollToTop';
import { useDispatch } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';

function Install() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveComponent('install'));
    document.title = 'Spotify - Download';
  }, [dispatch]);

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
