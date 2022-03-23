import { RootState } from "../redux/reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import "./buttonTheme.scss";
import { uiChangeTheme } from "../redux/actions/uiActions";

export const ButtonTheme = () => {
  const { darkMode } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(uiChangeTheme());
  };

  return (
    <button
      className={darkMode ? "btn btn-dark" : "btn btn-light"}
      onClick={handleTheme}
    >
      Dark Mode
    </button>
  );
};
