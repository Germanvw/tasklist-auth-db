import { FormInput } from "../../FormInputs/FormInput";
import { Link } from "react-router-dom";
import { ButtonTheme } from "../../ButtonTheme/ButtonTheme";
import { useForm } from "../../hooks/useForm";

import "./register.scss";
import { validateForms } from "../../helpers/validateForms";
import { useDispatch, useSelector } from "react-redux";

export const Register = () => {
  const registerInputs = [
    {
      name: "username",
      placeholder: "Username",
      type: "text",
    },
    {
      name: "email",
      placeholder: "Email",
      type: "email",
    },
    {
      name: "password",
      placeholder: "Password",
      type: "password",
    },
    {
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
    },
  ];

  const [value, handleChange] = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.ui);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForms(value, dispatch)) {
      console.log(value);
    } else {
      console.log(errorMsg);
    }
  };

  return (
    <div className="form-full-container">
      <div className="form-body">
        <ButtonTheme />
        <div className="form-container">
          <div className="form-header">
            <h2>Register</h2>
            <p className="subtitle">
              Register and start managing your daily tasks for free!
            </p>
          </div>
          <div className="form-main">
            <form onSubmit={handleSubmit}>
              {registerInputs.map((input) => (
                <FormInput
                  key={input.name}
                  value={value[input.name]}
                  handleChange={handleChange}
                  {...input}
                />
              ))}
              <button className="submit">Register</button>
            </form>
          </div>
          <div className="form-footer">
            <p>
              Already member?
              <Link className="link" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
