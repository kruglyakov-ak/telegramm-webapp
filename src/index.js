import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AccountList from "./components/AccountList/AccountList";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import AccountPage from "./components/AccountPage/AccountPage";
import { AppRouterPath } from "./constants";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={AppRouterPath.Main}
        element={<AccountList />}
        errorElement={<ErrorPage />}
      />
      <Route
        path={AppRouterPath.CreateAccountForm}
        element={<CreateAccountForm />}
      />
      <Route
        path={AppRouterPath.AccountRoute}
        loader={async ({ params }) => {
          return {
            id: params.id,
          };
        }}
        element={<AccountPage />}
      />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
