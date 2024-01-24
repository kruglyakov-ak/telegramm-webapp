import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AccountList from "./components/AccountList/AccountList";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import AccountPage from "./components/AccountPage/AccountPage";
import { AppRouterPath } from "./constants";

const router = createBrowserRouter([
  {
    path: AppRouterPath.Main,
    element: <AccountList />,
    errorElement: <ErrorPage />,

  },
  {
    path: AppRouterPath.CreateAccountForm,
    element: <CreateAccountForm />,
  },
  {
    path: '/account/:id',
    element: <AccountPage/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
