import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeActiveComponent } from '../../redux/activeComponent/activeComponentSlice';

import One from './subComponent/One';
import Two from './subComponent/Two';

import './index.css';
import Three from './subComponent/Three';
import Four from './subComponent/Four';
import Five from './subComponent/Five';
import Six from './subComponent/Six';
import Seven from './subComponent/Seven';

export const FormContext = createContext();

function Upload() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeActiveComponent('upload'));
    document.title = `Iindi - Upload`;
  }, [dispatch]);

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => prev + 1);
  };

  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const [form, setForm] = useState({
    type: '',
    songs: {
      master: {},
      components: [],
    },
  });

  const [components] = useState([
    <One {...{ next }} />,
    <Two {...{ prev, next }} />,
    <Three {...{ prev, next }} />,
    <Four {...{ prev, next }} />,
    <Five {...{ prev, next }} />,
    <Six {...{ prev, next }} />,
    <Seven {...{ prev }} />,
  ]);

  return (
    <div className="upload">
      <div className="upload__content">
        <FormContext.Provider value={{ form, setForm }}>
          {components[current]}
        </FormContext.Provider>
      </div>

      {/* <button type="button" onClick={() => next()}>
             Next{' '}
             <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M24 12l-12-9v5h-12v8h12v5l12-9z" />
            </svg>
          </button> */}
    </div>
  );
}

export default Upload;
