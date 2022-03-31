import { memo, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "./router";
import AppHeader from "./components/AppHeader";
import Loading from "./components/loading";
import "./App.css";

const App = memo(function () {
  return (
    <BrowserRouter>
      <AppHeader></AppHeader>
      <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
    </BrowserRouter>
  );
});

export default App;
