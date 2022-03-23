import "./formInput.scss";

export const FormInput = (props) => {
  const { handleChange, type, ...inputProps } = props;
  return (
    <div className="form-inputs">
      <div className="input">
        <i
          className={`fa-solid ${
            type === "password"
              ? "fa-lock"
              : type === "text"
              ? "fa-user"
              : "fa-envelope"
          }`}
        ></i>
        <input type={type} {...inputProps} onChange={handleChange} />
      </div>
    </div>
  );
};
