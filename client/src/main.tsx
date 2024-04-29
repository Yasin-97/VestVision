import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter as Router } from "react-router-dom";
import { StateContextProvider } from "./context";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia}>
      <StateContextProvider>
        <Router>
          <App />
        </Router>
      </StateContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
