import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css';
import ScrollToTop from '../../ScrollToTop';
import { useDispatch } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';

function Search() {
  const dispatch = useDispatch();
  const arr = [
    {
      img: 'https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5',
      color: '#27856a',
      title: 'podcast',
    },
    {
      img: 'https://t.scdn.co/images/ea364e99656e46a096ea1df50f581efe',
      color: '#1e3264',
      title: 'made for you',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba',
      color: '#8d67ab',
      title: 'mood',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
      color: '#e8115b',
      title: 'new releases',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f000000029249b35f23fb596b6f006a15',
      color: '#777777',
      title: 'workout',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002ec9d60059aa215a7ba364695',
      color: '#477d95',
      title: 'at home',
    },
    {
      img: 'https://i.scdn.co/image/ab67706f00000002aa93fe4e8c2d24fc62556cba',
      color: '#477d95',
      title: 'chill',
    },
  ];

  useEffect(() => {
    dispatch(changeActiveComponent('search'));
    document.title = 'Spotify - Search';
  }, [dispatch]);

  return (
    <div className="search">
      <ScrollToTop />
      <div className="search__genres">
        <h2>Browse all</h2>
        <div className="search__genres__container">
          {arr.map((el, i) => (
            <Link
              to={`/genre/${el.title}?c=${el.color.replace('#', '')}`}
              key={i}
            >
              <div
                className="search__genres__container__genre"
                style={{ backgroundColor: el.color }}
              >
                <h3>{el.title}</h3>
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
