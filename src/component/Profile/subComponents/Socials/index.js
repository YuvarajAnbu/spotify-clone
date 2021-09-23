import { message } from 'antd';
import { useEffect, useState } from 'react';
import './index.css';

function Socials() {
  const [userSocial] = useState({
    facebook: 'https://www.facebook.com/xander',
  });

  const [social] = useState({
    facebook: {
      icon: (
        <svg
          fill="#039be5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="25px"
          height="25px"
        >
          <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z" />
        </svg>
      ),
      defaultLink: 'https://www.facebook.com/',
    },
    twitter: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="25px"
          height="25px"
        >
          <path
            fill="#03A9F4"
            d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
          />
        </svg>
      ),
      defaultLink: 'https://www.twitter.com/',
    },
    spotify: {
      icon: (
        <svg
          width="25px"
          height="25px"
          style={{ padding: '3px' }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1333.33 1333.3"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path
            d="M666.66 0C298.48 0 0 298.47 0 666.65c0 368.19 298.48 666.65 666.66 666.65 368.22 0 666.67-298.45 666.67-666.65C1333.33 298.49 1034.88.03 666.65.03l.01-.04zm305.73 961.51c-11.94 19.58-37.57 25.8-57.16 13.77-156.52-95.61-353.57-117.26-585.63-64.24-22.36 5.09-44.65-8.92-49.75-31.29-5.12-22.37 8.84-44.66 31.26-49.75 253.95-58.02 471.78-33.04 647.51 74.35 19.59 12.02 25.8 37.57 13.77 57.16zm81.6-181.52c-15.05 24.45-47.05 32.17-71.49 17.13-179.2-110.15-452.35-142.05-664.31-77.7-27.49 8.3-56.52-7.19-64.86-34.63-8.28-27.49 7.22-56.46 34.66-64.82 242.11-73.46 543.1-37.88 748.89 88.58 24.44 15.05 32.16 47.05 17.12 71.46V780zm7.01-189.02c-214.87-127.62-569.36-139.35-774.5-77.09-32.94 9.99-67.78-8.6-77.76-41.55-9.98-32.96 8.6-67.77 41.56-77.78 235.49-71.49 626.96-57.68 874.34 89.18 29.69 17.59 39.41 55.85 21.81 85.44-17.52 29.63-55.89 39.4-85.42 21.8h-.03z"
            fill="#1ed760"
            fillRule="nonzero"
          />
        </svg>
      ),
      defaultLink: 'https://www.spotify.com/',
    },
  });

  const [showInput, setShowInput] = useState({});
  const [form, setForm] = useState({});

  useEffect(() => {
    const obj = {};
    const formObj = {};
    Object.keys(social).forEach((e) => {
      obj[e] = false;
      formObj[e] = userSocial[e] ? userSocial[e] : social[e].defaultLink;
    });
    setShowInput(obj);
    setForm(formObj);
  }, [social, userSocial]);

  const onSubmit = () => {
    const obj = {};
    Object.keys(form).forEach((e) => {
      if (form[e] !== social[e].defaultLink) {
        obj[e] = form[e];
      } else {
        if (userSocial[e]) {
          if (form[e] !== userSocial[e]) {
            obj[e] = '';
          }
        }
      }
    });
    setShowInput((prev) => {
      const reset = {};
      Object.keys(prev).forEach((e) => {
        reset[e] = false;
      });
      return reset;
    });
    message.success('Links updated successfully');
    console.log(obj);
  };

  return (
    <div className="socials">
      <h1>Linked accounts</h1>
      {Object.keys(social).map((el, i) => (
        <div key={i} className="socials__social">
          {social[el].icon}
          <p className="socials__social__index">{i + 1}</p>
          {showInput[el] ? (
            <input
              className="socials__social__input"
              type="text"
              value={form[el]}
              autoFocus
              spellCheck="false"
              required
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    [el]: e.target.value,
                  };
                });
              }}
            />
          ) : userSocial[el] ? (
            userSocial[el] !== social[el].defaultLink ? (
              <a
                className="socials__social__link"
                target="_blank"
                rel="noreferrer"
                href={userSocial[el]}
              >
                {userSocial[el]}
              </a>
            ) : (
              <p className="socials__social__link">{form[el]}</p>
            )
          ) : (
            <p className="socials__social__link">{form[el]}</p>
          )}

          <button
            type="button"
            onClick={(e) => {
              if (showInput[el]) {
                setForm((prev) => {
                  return {
                    ...prev,
                    [el]: userSocial[el]
                      ? userSocial[el]
                      : social[el].defaultLink,
                  };
                });
              }
              setShowInput((prev) => {
                return {
                  ...prev,
                  [el]: !prev[el],
                };
              });
            }}
          >
            {showInput[el] ? (
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
      ))}
      {Object.values(showInput).includes(true) && (
        <button className="socials__submit" type="button" onClick={onSubmit}>
          UPLOAD
        </button>
      )}
    </div>
  );
}

export default Socials;
