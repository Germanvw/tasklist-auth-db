import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unauthRoutes, authRoutes } from "./routes";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RootState } from "../redux/reducers/rootReducer";
import { startAuthValidation } from "../redux/actions/authActions";

import "../../index";
import { AuthRoutes } from "./AuthRoutes";
import { UnAuthRoutes } from "./UnAuthRoutes";
export const AppRouter = (): any => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const { uid } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(startAuthValidation());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className={`global ${darkMode && "dark-theme "}`}>
        <Routes>
          <Route element={<UnAuthRoutes uid={uid} />}>
            {unauthRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
          <Route element={<AuthRoutes uid={uid} />}>
            {authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};
