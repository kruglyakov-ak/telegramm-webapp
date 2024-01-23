import { useEffect } from "react";

const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    tg.ready();
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
