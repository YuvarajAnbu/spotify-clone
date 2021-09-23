import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';
import ScrollToTop from '../../ScrollToTop';
import { Tabs } from 'antd';

import './index.css';
import Info from './subComponents/Info';
import Socials from './subComponents/Socials';
import Membership from './subComponents/Membership';

function Profile(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const { user, isLoggedIn } = useSelector((state) => state.user);

  //changing document.title
  const res = {
    img: 'https://i.scdn.co/image/ab676186000010160c8f491d3027f3313929333e',
    // img: 'https://free4kwallpapers.com/uploads/originals/2020/05/09/dj-headphones-by-mikael-kristenson-wallpaper.jpg',
    type: 'profile',
    color: '#524d49',
    name: user.username,
  };

  useEffect(() => {
    dispatch(changeActiveComponent('profile'));
    document.title = `Spotify - ${res.name}`;
  }, [res.name, dispatch]);

  //handling tabs
  const [tabs] = useState(['info', 'artistshub', 'social', 'membership']);

  const [defaultTab, setDefautTab] = useState(1);

  useEffect(() => {
    const index = tabs.findIndex((e) => e === id);
    if (index >= 0) {
      setDefautTab(index + 1);
    } else {
      history.push('/profile/info');
    }
  }, [history, id, tabs]);

  const { TabPane } = Tabs;

  const tabChanged = (key) => {
    history.push(`/profile/${tabs[key - 1]}`);
  };

  return isLoggedIn && user.username ? (
    <div className="profile">
      <ScrollToTop />
      <div className="profile__info">
        <div
          className="profile__info__background"
          style={{
            backgroundImage: `url(${res.img})`,
          }}
        ></div>

        <div className="profile__info__background-noise"></div>

        <div className="profile__info__desc">
          <p className="profile__info__desc__title">WELCOME TO IINDI</p>
          <div className="profile__info__desc__name">
            <span className="profile__info__desc__name__container">
              <h1>
                {/* {res.name} */}
                TKAY MAIDZA
              </h1>
            </span>
            <span
              className="profile__info__desc__name__container__verified"
              title="Verified"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z"
                  fill="#2E77D0"
                ></path>
                <path
                  d="M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z"
                  fill="#fff"
                ></path>
              </svg>
            </span>
          </div>
          <p className="profile__info__desc__about">
            Tkay Maidza burst onto the electronic music scene in 2014 with her
            debut EP, Switch Tape with her success leading to headliine shows
            across Australia.
          </p>
          <div className="profile__info__desc__btns">
            <button className="profile__info__desc__btns__followers">
              2.7k Followers
            </button>
          </div>
        </div>
      </div>

      <div
        className="profile__background"
        style={{ backgroundColor: res.color }}
      ></div>

      <div className="profile__content">
        <Tabs activeKey={`${defaultTab}`} onChange={tabChanged}>
          <TabPane tab="INFO" key="1">
            <Info />
          </TabPane>
          <TabPane tab="ARTISTS HUB" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="SOCIALS" key="3">
            <Socials />
          </TabPane>
          <TabPane tab="MEMBERSHIP" key="4">
            <Membership />
          </TabPane>
        </Tabs>
        {/* <ul className="profile__content__tabs">
          <li className="active">INFO</li>
          <li>ARTISTS HUB</li>
          <li>SOCIALS</li>
          <li>MEMBERSHIP</li>
        </ul> */}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Profile;
