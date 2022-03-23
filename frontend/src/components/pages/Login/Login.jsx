import { FormInput } from "../../FormInputs/FormInput";
import { Link } from "react-router-dom";
import { ButtonTheme } from "../../ButtonTheme/ButtonTheme";
import { useForm } from "../../hooks/useForm";

export const Login = () => {
  const loginInputs = [
    {
      placeholder: "Email",
      type: "email",
      name: "email",
    },
    {
      placeholder: "Password",
      type: "password",
      name: "password",
    },
  ];

  const [value, handleChange] = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <div className="form-full-container">
      <div className="form-body form-login">
        <ButtonTheme />
        <div className="form-container">
          <div className="form-header">
            <h2>Login</h2>
            <p className="subtitle">
              Login and start managing your daily tasks for free!
            </p>
          </div>
          <div className="form-main">
            <form onSubmit={handleSubmit}>
              {loginInputs.map((input) => (
                <FormInput
                  key={input.name}
                  value={value[input.name]}
                  handleChange={handleChange}
                  {...input}
                />
              ))}
              <button className="submit">Login</button>
            </form>
          </div>
          <div className="form-footer">
            <p>
              Already member?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
