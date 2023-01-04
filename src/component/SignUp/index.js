import { Input } from "antd";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { PopupContext } from "../../App";
import { clearErrorMsg, signUp } from "../../redux/user/userSlice";

function SignUp() {
  const [signup, setSignup] = useState({
    email: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { setPopup } = useContext(PopupContext);

  const onSubmitSignup = (e) => {
    e.preventDefault();
    dispatch(signUp(signup));
    dispatch(clearErrorMsg());
    setPopup("");
  };

  return (
    <div className="popup__container">
      <h1>Signup to Spotify</h1>
      <form onSubmit={onSubmitSignup}>
        <div className="popup__container__input-container">
          <label>
            Email <span>*</span>
          </label>
          <Input
            type="email"
            name="email"
            placeholder="email"
            value={signup.email}
            onChange={(e) => {
              setSignup((prev) => ({ ...prev, email: e.target.value }));
            }}
            required
          />
        </div>
        <div className="popup__container__input-container">
          <label>
            UserName <span>*</span>
          </label>
          <Input
            name="username"
            placeholder="username"
            required
            value={signup.username}
            onChange={(e) => {
              setSignup((prev) => ({
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
            value={signup.password}
            onChange={(e) => {
              setSignup((prev) => ({
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

export default SignUp;
