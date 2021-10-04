import React, { useState } from 'react';

function CustomSelect({ values, value, setValue, name }) {
  const [open, setisOpen] = useState(false);

  return (
    <div>
      <div className="upload__input-container__select-container">
        <div
          className="upload__input-container__select-container__content"
          tabIndex="0"
          onBlur={() => {
            setTimeout(() => {
              setisOpen(false);
            }, 200);
          }}
          onClick={() => {
            setisOpen((prev) => !prev);
          }}
        >
          <p className="upload__input-container__select-container__content__placeholder">
            {value ? value : 'Select Genre'}
          </p>
          <div className="icon">
            <svg
              role="img"
              focusable="false"
              height="18"
              width="18"
              viewBox="0 0 24 24"
            >
              <polyline
                points="16 4 7 12 16 20"
                fill="none"
                stroke="currentColor"
              ></polyline>
            </svg>
          </div>
        </div>
        <div
          className={
            open
              ? 'upload__input-container__select-container__list-container active'
              : 'upload__input-container__select-container__list-container'
          }
        >
          <ul>
            {values.map((e, i) => (
              <li
                key={i}
                onClick={() => {
                  setValue(name, e, { shouldValidate: true });
                }}
              >
                {e}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomSelect;
