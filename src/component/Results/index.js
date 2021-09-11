import React from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from '../../ScrollToTop.js';
import HomeDefault from '../SmallComponents/HomeDefault/index.js';
import './index.css';

function Results() {
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

  return (
    <div className="results">
      <ScrollToTop />
      <div className="results__section">
        {/* <div className="results__section__no-results">
          <h1>No results found for "dfgdfgdfgseefsdfsd"</h1>
          <p>
            Please make sure your words are spelled correctly or use less or
            different keywords.
          </p>
        </div> */}

        <section className="results__section__default-section">
          <div className="results__section__default-section__title">
            <h2>
              <Link to="/album/dcig">Albums</Link>
            </h2>
            <span>
              <Link to="/album/dcig">SEE ALL</Link>
            </span>
          </div>
          <HomeDefault arr={arr} />
        </section>

        <section className="results__section__default-section">
          <div className="results__section__default-section__title">
            <h2>
              <Link to="/album/dcig">Albums</Link>
            </h2>
            <span>
              <Link to="/album/dcig">SEE ALL</Link>
            </span>
          </div>
          <HomeDefault arr={arr} />
        </section>
      </div>
    </div>
  );
}

export default Results;
