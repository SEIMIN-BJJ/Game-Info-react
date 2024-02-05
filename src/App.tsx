import { BrowserRouter } from "react-router-dom";
import GameRoute from "./routes/GameRoute";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <GameRoute />
    </BrowserRouter>
  );
};

export default App;
