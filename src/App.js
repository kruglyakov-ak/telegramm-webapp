import { useEffect } from "react";

import { Button } from "./components/Button/Button";
import "./App.css";

const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready();

    console.log(tg.initData);
  }, []);

  const onCloseButtonHandler = () => {
    tg.close();
  };

  return (
    <div className="app">
      <Button onClick={onCloseButtonHandler}>Close</Button>
    </div>
  );
}

export default App;
