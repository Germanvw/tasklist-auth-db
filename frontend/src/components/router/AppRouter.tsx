import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unauthRoutes, authRoutes } from "./routes";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RootState } from "../redux/reducers/rootReducer";
import { startAuthValidation } from "../redux/actions/authActions";

import "../../index";
export const AppRouter = (): any => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    console.log("correr");
    dispatch(startAuthValidation());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className={`global ${darkMode && "dark-theme "}`}>
        <Routes>
          {unauthRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
};
