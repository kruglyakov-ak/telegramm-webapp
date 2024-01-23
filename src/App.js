import { useEffect } from "react";
import "./App.css";

const tg = window.Telegram.WebApp;
function App() {
  useEffect(() => {
    try {
      tg.ready();
      tg.showAlert(`Init data: ${tg.initData}`, onCloseButtonHandler );

    } catch (e) {
      tg.showAlert(`Ошибка: ${e.message}`);
    }
    
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
