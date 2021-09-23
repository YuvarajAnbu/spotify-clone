import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

function Info() {
  const { user } = useSelector((state) => state.user);

  const [userInfo] = useState({
    email: user.email,
    username: user.username,
    about:
      'Tkay Maidza burst onto the electronic music scene in 2014 with her debut EP, Switch Tape with her success leading to headliine shows across Australia.',
  });

  const [showInput, setShowInput] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    const obj = {};
    const formObj = {};
    Object.keys(userInfo).forEach((e) => {
      obj[e] = false;
      formObj[e] = userInfo[e];
    });
    setShowInput(obj);
    setForm(formObj);
  }, [userInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    const obj = {};
    Object.keys(form).forEach((e) => {
      if (form[e] !== userInfo[e]) {
        obj[e] = form[e];
      }
    });
    if (Object.keys(obj).length < 1) {
      message.info('No changes made');
    } else {
      message.success('Updated successfully');
    }

    setShowInput((prev) => {
      const reset = {};
      Object.keys(prev).forEach((e) => {
        reset[e] = false;
      });
      return reset;
    });
  };

  return (
    <div className="info">
      <form className="info__container" onSubmit={onSubmit}>
        <div className="info__container__content">
          <label htmlFor="email">Email :</label>
          {showInput.email ? (
            <input
              type="email"
              value={form.email}
              autoFocus
              spellCheck="false"
              required
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                });
              }}
            />
          ) : (
            <p>{userInfo.email}</p>
          )}

          <button
            type="button"
            onClick={(e) => {
              if (showInput.email) {
                setForm((prev) => {
                  return {
                    ...prev,
                    email: userInfo.email ? userInfo.email : '',
                  };
                });
              }
              setShowInput((prev) => {
                return {
                  ...prev,
                  email: !prev.email,
                };
              });
            }}
          >
            {showInput.email ? (
              'Cancel'
            ) : (
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
              >
                <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
              </svg>
            )}
          </button>
        </div>

        <div className="info__container__content">
          <label htmlFor="username">Username :</label>
          {showInput.username ? (
            <input
              name="username"
              type="text"
              value={form.username}
              autoFocus
              spellCheck="false"
              required
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    username: e.target.value,
                  };
                });
              }}
            />
          ) : (
            <p>{userInfo.username}</p>
          )}

          <button
            type="button"
            onClick={(e) => {
              if (showInput.username) {
                setForm((prev) => {
                  return {
                    ...prev,
                    username: userInfo.username ? userInfo.username : '',
                  };
                });
              }
              setShowInput((prev) => {
                return {
                  ...prev,
                  username: !prev.username,
                };
              });
            }}
          >
            {showInput.username ? (
              'Cancel'
            ) : (
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
              >
                <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
              </svg>
            )}
          </button>
        </div>

        <div className="info__container__content">
          <label htmlFor="about">About :</label>
          {showInput.about ? (
            <textarea
              name="about"
              value={form.about}
              autoFocus
              spellCheck="false"
              required
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    about: e.target.value,
                  };
                });
              }}
            />
          ) : (
            <p>{userInfo.about}</p>
          )}

          <button
            type="button"
            onClick={(e) => {
              if (showInput.about) {
                setForm((prev) => {
                  return {
                    ...prev,
                    about: userInfo.about ? userInfo.about : '',
                  };
                });
              }
              setShowInput((prev) => {
                return {
                  ...prev,
                  about: !prev.about,
                };
              });
            }}
          >
            {showInput.about ? (
              'Cancel'
            ) : (
              <svg
                fill="#000000"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20px"
                height="20px"
              >
                <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z" />
              </svg>
            )}
          </button>
        </div>
        {Object.values(showInput).includes(true) && (
          <button type="submit" className="info__submit">
            Make Changes
          </button>
        )}
      </form>
    </div>
  );
}

export default Info;
