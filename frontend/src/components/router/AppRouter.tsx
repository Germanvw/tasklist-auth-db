import { Routes, Route, BrowserRouter } from "react-router-dom";
import { unauthRoutes, authRoutes } from "./routes";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers/rootReducer";
import "../../index";

export const AppRouter = (): any => {
  const { darkMode } = useSelector((state: RootState) => state.ui);
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
