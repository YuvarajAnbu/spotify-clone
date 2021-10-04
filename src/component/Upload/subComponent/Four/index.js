import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from '../..';

import './index.css';

function Four({ prev, next }) {
  const { form, setForm } = useContext(FormContext);

  // React hook form
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({
    defaultValues: {
      isrcCode: form.isrcCode ? form.isrcCode : '',
      artist: form.artist ? form.artist : '',
      releaseTitle: form.releaseTitle ? form.releaseTitle : '',
      producer: form.producer ? form.producer : '',
      publisher: form.publisher ? form.publisher : '',
      buyLink: form.buyLink ? form.buyLink : '',
      iswcCode: form.iswcCode ? form.iswcCode : '',
      releaseDate: form.releaseDate ? form.releaseDate : '',
      recordLabel: form.recordLabel ? form.recordLabel : '',
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
    <form className="four" onSubmit={handleSubmit(OnSubmit)}>
      <div className="four__container">
        <h1>Meta Data</h1>
        <p>
          Keep your original work protected. Ensure your correctly list the
          following key information, so it is recognisable as your own original
          material across our platform.
        </p>
        <div className="four__container__form">
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="isrcCode">Please include your ISRC Code</label>
            <input
              {...register('isrcCode', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.isrcCode ? errors.isrcCode.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="artist">Artist</label>
            <input
              {...register('artist', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.artist ? errors.artist.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="releaseTitle">Release Title</label>
            <input
              {...register('releaseTitle', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.releaseTitle ? errors.releaseTitle.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="producer">Composer / Producers</label>
            <input
              {...register('producer', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.producer ? errors.producer.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="publisher">publisher</label>
            <input
              {...register('publisher', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.publisher ? errors.publisher.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="buyLink">Buy Link</label>
            <input
              {...register('buyLink', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.buyLink ? errors.buyLink.message : ''}
            </p>
          </div>
          <div className="four__container__space"></div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="iswcCode">Please include your ISWC Code</label>
            <input
              {...register('iswcCode', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.iswcCode ? errors.iswcCode.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="releaseDate">Release Date</label>
            <input
              {...register('releaseDate', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.releaseDate ? errors.releaseDate.message : ''}
            </p>
          </div>
          <div className="four__container__input-container upload__input-container">
            <label htmlFor="recordLabel">Record label</label>
            <input
              {...register('recordLabel', {
                required: 'Required',
              })}
            />
            <p className="upload__input-container__error">
              {errors.recordLabel ? errors.recordLabel.message : ''}
            </p>
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
            Back <span>to " Basic Info "</span>
          </span>
        </button>
        <button type="submit">
          <span>
            Next <span>to " Licenses "</span>
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

export default Four;
