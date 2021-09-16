import { useContext, useState } from 'react';
import { Alert, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorMsg, logIn } from '../../redux/user/userSlice';
import { PopupContext } from '../../App';

function SignIn() {
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.user);

  const { setPopup } = useContext(PopupContext);

  const [login, setLogin] = useState({ username: '', password: '' });

  const onSubmitLogin = (e) => {
    e.preventDefault();

    dispatch(logIn(login)).then((a) => {
      if (a.type !== 'user/logIn/rejected') {
        dispatch(clearErrorMsg());
        setPopup('');
      }
    });
  };

  return (
    <div className="popup__container">
      <h1>Log in to Spotify</h1>

      {errorMsg !== '' && (
        <Alert
          role="alert"
          message={errorMsg}
          type="error"
          showIcon
          closable
          onClose={() => {
            dispatch(clearErrorMsg());
          }}
        />
      )}
      <form onSubmit={onSubmitLogin}>
        <div className="popup__container__input-container">
          <label>
            UserName <span>*</span>
          </label>
          <Input
            name="username"
            placeholder="username"
            required
            value={login.username}
            onChange={(e) => {
              setLogin((prev) => ({
                ...prev,
                username: e.target.value,
              }));
            }}
          />
        </div>
        <div className="popup__container__input-container">
          <label>
            Password <span>*</span>
          </label>
          <Input.Password
            name="password"
            placeholder="password"
            required
            value={login.password}
            onChange={(e) => {
              setLogin((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
        </div>
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default SignIn;
