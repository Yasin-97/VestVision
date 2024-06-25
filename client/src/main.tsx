import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter as Router } from "react-router-dom";
import { StateContextProvider } from "./context";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="257c831e0333ec4dfe1d9c701b36487c"
    >
      <StateContextProvider>
        <Router>
          <App />
          <ToastContainer />
        </Router>
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
