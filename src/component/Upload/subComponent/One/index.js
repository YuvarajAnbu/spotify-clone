import React, { useContext } from 'react';
import { FormContext } from '../..';
import { message } from 'antd';

import './index.css';

function One({ next }) {
  const { form, setForm } = useContext(FormContext);

  return (
    <div className="one">
      <div className="one__container">
        <h1>Lets Create</h1>
        <p>
          Lets get started with IINDI's Smart AI. Select from the options below
          to best catogrise your uploads
        </p>
        <div className="one__container__btns">
          <button
            type="button"
            className={form.type === 'vocals' ? 'active' : ''}
            onClick={() => {
              setForm((prev) => {
                return {
                  ...prev,
                  type: 'vocals',
                };
              });
            }}
          >
            Vocal stems
          </button>
          <button
            type="button"
            className={form.type === 'beats' ? 'active' : ''}
            onClick={() => {
              setForm((prev) => {
                return {
                  ...prev,
                  type: 'beats',
                };
              });
            }}
          >
            Beat stems
          </button>
          <button
            type="button"
            className={form.type === 'full tracks' ? 'active' : ''}
            onClick={() => {
              setForm((prev) => {
                return {
                  ...prev,
                  type: 'full tracks',
                };
              });
            }}
          >
            Full track stems
          </button>
        </div>
      </div>
      <div className="upload__btns">
        <button
          type="button"
          onClick={() => {
            if (form.type) {
              next();
            } else {
              message.error('Please provide upload type');
            }
          }}
        >
          Next to " Upload "
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default One;
