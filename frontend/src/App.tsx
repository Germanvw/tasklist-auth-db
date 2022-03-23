import { store } from "./components/redux/store";
import { AppRouter } from "./components/router/AppRouter";
import { Provider } from "react-redux";
import "./global.scss";
import "./theme/variables.scss";
export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
