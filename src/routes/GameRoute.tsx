import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "component/pages/MainPage";

const GameRoute = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<MainPage />}></Route>
    </Routes>
  );
};

export default GameRoute;
