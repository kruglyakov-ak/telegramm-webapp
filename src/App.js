import { useEffect } from "react";
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
    <div className="App">
      <button className="button" type="button" onClick={onCloseButtonHandler}>
        Закрыть
      </button>
    </div>
  );
}

export default App;
