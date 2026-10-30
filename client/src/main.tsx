import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

import QueryProvider from "./app/providers/query-provider";

import ThemeProvider from "./app/providers/theme-provider";
import NetworkStatus
  from "./components/system/NetworkStatus";
import {
  setupQueryPersistence,
} from "./lib/react-query/query-persistence";

/* ==========================================================
   Query Persistence
========================================================== */

setupQueryPersistence();

/* ==========================================================
   Application Bootstrap
========================================================== */

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )!
).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <App />
         <NetworkStatus />
        <Toaster
          position="top-right"
        />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>
);