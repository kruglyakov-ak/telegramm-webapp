import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import "./App.css";

function App({ children }) {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
    console.log(tg.initData);
    console.log(tg.version);
  }, [tg]);

  return <div className="app">{children}</div>;
}

export default App;
