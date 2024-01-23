import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useTelegram } from "./hooks/useTelegram";
import AccountList from "./components/AccountList/AccountList";
import "./App.css";

function App() {
  const { tg } = useTelegram();
  useEffect(() => {
    tg.ready();

    console.log(tg.initData);
  }, [tg]);

  return (
    <div className="app">
      <Routes>
        <Route index element={<AccountList />} />
      </Routes>
    </div>
  );
}

export default App;
