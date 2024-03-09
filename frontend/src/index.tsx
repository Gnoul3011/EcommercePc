import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import React from "react";
import AuthProvider from "./Context/AuthContext";
import { Notifications } from "@mantine/notifications";
import { ShoppingContextProvider } from "./Context/ShoppingContext";
import axios from "axios";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const theme = createTheme({
  /** Put your mantine theme override here */
});

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem("accessToken")) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  }
  return config;
});

root.render(
  //<React.StrictMode>
  <AuthProvider>
    <ShoppingContextProvider>
      <MantineProvider>
        <Notifications
          style={{
            position: "fixed",
            top: "2%",
            right: "2%",
            marginBottom: "0.5rem",
            zIndex: 9999999,
          }}
        />
        <App />
      </MantineProvider>
    </ShoppingContextProvider>
  </AuthProvider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
