import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./hooks/useTelegram";
import { Button } from "./components/Button/Button";
import AccountList from "./components/AccountList/AccountList";
import "./App.css";

function App() {
  const { tg, onClose } = useTelegram();
  useEffect(() => {
    tg.ready();

    console.log(tg.initData);
  }, [tg]);

  const onCloseButtonHandler = () => {
    onClose();
  };

  return (
    <div className="app">
      <Button onClick={onCloseButtonHandler}>Close</Button>

      <Routes>
        <Route index element={<AccountList />} />
      </Routes>
    </div>
  );
}

export default App;
