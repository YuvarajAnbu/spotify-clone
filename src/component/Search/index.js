import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import './index.css';
import { ActiveContext } from '../../App';
import ScrollToTop from '../../ScrollToTop';

function Search() {
  const arr = [
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#27856a',
    },
  ];

  const { setActiveComponent } = useContext(ActiveContext);

  useEffect(() => {
    setActiveComponent('search');
    document.title = 'Spotify - Search';
  }, [setActiveComponent]);

  return (
    <div className="search">
      <ScrollToTop />
      <div className="search__genres">
        <h2>Browse all</h2>
        <div className="search__genres__container">
          {arr.map((el, i) => (
            <Link to="/genre" key={i}>
              <div
                className="search__genres__container__genre"
                style={{ backgroundColor: el.color }}
              >
                <h3>Podcasts</h3>
                <img src={el.img} alt="" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="search__mobile-text">
        <h1>Search for Songs, Album or Artist.</h1>
        <p>Search across more that 100,000,000 songs by various artists</p>
      </div>
      {/* <div className="search__mobile-text">
        <h3>No results found for "sun burn"</h3>
        <p>
          Please make sure your words are spelled correctly or use less or
          different keywords.
        </p>
      </div> */}

      <div className="search__results"></div>
    </div>
  );
}

export default Search;
