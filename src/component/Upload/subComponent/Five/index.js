import React, { useContext, useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { FormContext } from '../..';

import './index.css';
import { message } from 'antd';

function Five({ prev, next }) {
  const { form, setForm } = useContext(FormContext);

  const [abbrivations] = useState({
    ccl: 'Creative Common Licenses',
    rsa: 'Royal Split Agreement',
    la: 'Leasing Aggrement',
    others: 'custom agreement',
  });
  const [items, setItems] = useState({
    ccl: [],
    rsa: [],
    la: [],
    others: [],
  });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (form.licenses) {
      const obj = {};
      let localCount = 0;
      Object.keys(form.licenses).forEach((e) => {
        const arr = [];
        form.licenses[e].forEach((k) => {
          arr.push({ count: localCount, file: k });
          localCount = localCount + 1;
        });
        obj[e] = arr;
      });
      setItems((prev) => {
        return {
          ...prev,
          ...obj,
        };
      });
      setCount(localCount);
    }
  }, []);

  const goBack = () => {
    const obj = {};
    let totalLength = 0;
    Object.keys(items).forEach((e) => {
      const arr = [];
      items[e].forEach((k) => {
        arr.push(k.file);
      });
      obj[e] = arr;
      totalLength = totalLength + arr.length;
    });

    setForm((prev) => {
      return {
        ...prev,
        licenses: obj,
      };
    });

    prev();
  };

  const OnSubmit = () => {
    const obj = {};
    let totalLength = 0;
    Object.keys(items).forEach((e) => {
      const arr = [];
      items[e].forEach((k) => {
        arr.push(k.file);
      });
      obj[e] = arr;
      totalLength = totalLength + arr.length;
    });
    if (totalLength > 0) {
      setForm((prev) => {
        return {
          ...prev,
          licenses: obj,
        };
      });

      next();
    } else {
      message.error('Upload atleast one license of any type');
    }
  };

  return (
    <div className="five">
      <div className="five__container">
        <h1>Licenses</h1>
        <p>Add or choose one of our licensing aggrements for your upload.</p>
        <div className="five__container__content">
          {Object.keys(items).map((e, i) => (
            <div
              key={i}
              className={
                e === 'others'
                  ? 'five__container__content__container add'
                  : items[e].length > 0
                  ? 'five__container__content__container active'
                  : 'five__container__content__container'
              }
            >
              <input
                type="file"
                multiple
                accept=".txt"
                onChange={(el) => {
                  const arr = [];
                  Array.from(el.target.files).forEach((k, i) => {
                    arr.push({ count: count + i, file: k });
                  });
                  setItems((prev) => {
                    return {
                      ...prev,
                      [e]: [...prev[e], ...arr],
                    };
                  });
                  setCount((prev) => prev + arr.length);
                }}
              />
              <div className="five__container__content__container__icon">
                {e === 'others' ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                  >
                    <path
                      fillRule="evenodd"
                      d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="25px"
                    height="25px"
                  >
                    <path
                      fill="var(--spotify-faded-color)"
                      d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1C393,504.1,504.1,393,504.1,256z"
                    />
                    <path
                      fill="#FFF"
                      d="M392.6,172.9c-5.8-15.1-17.7-12.7-30.6-10.1c-7.7,1.6-42,11.6-96.1,68.8c-22.5,23.7-37.3,42.6-47.1,57c-6-7.3-12.8-15.2-20-22.3C176.7,244.2,152,229,151,228.4c-10.3-6.3-23.8-3.1-30.2,7.3c-6.3,10.3-3.1,23.8,7.2,30.2c0.2,0.1,21.4,13.2,39.6,31.5c18.6,18.6,35.5,43.8,35.7,44.1c4.1,6.2,11,9.8,18.3,9.8c1.2,0,2.5-0.1,3.8-0.3c8.6-1.5,15.4-7.9,17.5-16.3c0.1-0.2,8.8-24.3,54.7-72.7c37-39.1,61.7-51.5,70.3-54.9c0.1,0,0.1,0,0.3,0c0,0,0.3-0.1,0.8-0.4c1.5-0.6,2.3-0.8,2.3-0.8c-0.4,0.1-0.6,0.1-0.6,0.1l0-0.1c4-1.7,11.4-4.9,11.5-5C393.3,196.1,397,184.1,392.6,172.9z"
                    />
                  </svg>
                )}
              </div>
              <div className="five__container__content__container__desc">
                <p>
                  {e !== 'others'
                    ? abbrivations[e]
                    : 'Upload your custom agreement'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="five__container__lists">
          {Object.keys(items).map((e, i) => {
            if (items[e].length > 0) {
              return (
                <div key={i} className="five__container__lists__container">
                  <p className="five__container__lists__container__title">
                    {abbrivations[e]}
                  </p>
                  <div className="five__container__lists__container__list">
                    {items[e].map((k, j) => (
                      <div
                        key={j}
                        className="five__container__lists__container__list__container"
                      >
                        <p>{k?.file?.name}</p>
                        <DeleteOutlined
                          onClick={() => {
                            setItems((prev) => {
                              return {
                                ...prev,
                                [e]: prev[e].filter((p) => p.count !== k.count),
                              };
                            });
                          }}
                          className="five__container__lists__container__list__container__icon"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else {
              return <div key={i}></div>;
            }
          })}
        </div>
      </div>

      <div className="upload__btns">
        <button
          className="upload__btns__prev"
          type="button"
          onClick={() => {
            goBack();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
          </svg>
          <span>
            Back <span>to " Meta Date "</span>
          </span>
        </button>
        <button
          type="button"
          onClick={() => {
            OnSubmit();
          }}
        >
          <span>
            Next <span>to " Finalising "</span>
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Five;
