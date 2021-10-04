import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from '../..';
import CustomSelect from '../SmallComponents/CustomSelect';

import './index.css';

function Three({ prev, next }) {
  const { form, setForm } = useContext(FormContext);

  // React hook form
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      producerName: form.producerName ? form.producerName : '',
      title: form.title ? form.title : '',
      genre: form.genre ? form.genre : '',
      bpm: form.bpm ? form.bpm : '',
      key: form.key ? form.key : '',
      desc: form.desc ? form.desc : '',
    },
  });

  const goBack = () => {
    setForm((prev) => {
      return {
        ...prev,
        ...getValues(),
      };
    });
    prev();
  };

  const OnSubmit = (data) => {
    setForm((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
    next();
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className="three">
      <div className="three__container">
        <h1>Basic Info</h1>
        <p>
          Let's add the key information for your Beat including bpm, genre key
          and contributing Producers / composers.
        </p>
        <div className="three__container__form">
          <div className="three__container__input-container upload__input-container">
            <label htmlFor="type">Upload Type</label>
            <input name="type" disabled value={form.type} />
            <p className="upload__input-container__error"></p>
          </div>
          <div className="three__container__input-container upload__input-container">
            <label htmlFor="producerName">Producer / Composers name</label>
            <input
              {...register('producerName', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.producerName ? errors.producerName.message : ''}
            </p>
          </div>
          <div className="three__container__input-container upload__input-container">
            <label htmlFor="title">Beat Title</label>
            <input
              {...register('title', {
                required: 'Required',
              })}
            />

            <p className="upload__input-container__error">
              {errors.title ? errors.title.message : ''}
            </p>
          </div>

          <div className="three__container__input-container upload__input-container">
            <label htmlFor="genre">Genre</label>
            <input
              {...register('genre', {
                required: 'Required',
              })}
              style={{ display: 'none' }}
            />
            <CustomSelect
              {...{
                values: ['1', '2', '3', '4'],
                value: watch('genre'),
                name: 'genre',
                setValue,
              }}
            />
            <p className="upload__input-container__error">
              {errors.genre ? errors.genre.message : ''}
            </p>
          </div>

          <div className="three__container__input-container upload__input-container">
            <label htmlFor="bpm">Bpm</label>
            <input
              {...register('bpm', {
                required: 'Required',
              })}
              style={{ display: 'none' }}
            />
            <CustomSelect
              {...{
                values: ['1', '2', '3', '4'],
                value: watch('bpm'),
                name: 'bpm',
                setValue,
              }}
            />
            <p className="upload__input-container__error">
              {errors.bpm ? errors.bpm.message : ''}
            </p>
          </div>

          <div className="three__container__input-container upload__input-container">
            <label htmlFor="key">Key</label>
            <input
              {...register('key', {
                required: 'Required',
              })}
              style={{ display: 'none' }}
            />
            <CustomSelect
              {...{
                values: ['1', '2', '3', '4'],
                value: watch('key'),
                name: 'key',
                setValue,
              }}
            />
            <p className="upload__input-container__error">
              {errors.key ? errors.key.message : ''}
            </p>
          </div>
          <div className="three__container__input-container three__container__select-container upload__input-container">
            <label htmlFor="desc">
              Description <span>( Optional )</span>
            </label>
            <textarea {...register('desc')} />
          </div>
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
            Back{' '}
            <span>
              to " {form?.type?.[0].toUpperCase()}
              {form?.type.slice(1, -1)} Stems "
            </span>
          </span>
        </button>
        <button type="submit">
          <span>
            Next <span>to " Meta Data "</span>
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
    </form>
  );
}

export default Three;
