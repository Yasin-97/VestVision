import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={Sepolia}>
      <Router>
        <App />
        {/* <h2 className="text-red-200">hello</h2> */}
      </Router>
    </ThirdwebProvider>
  </React.StrictMode>
);
