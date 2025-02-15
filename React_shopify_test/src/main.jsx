import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css"; // Import CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: "Sắp xếp",
            showing: "{itemsCount} mục",
          },
        },
      }}
    >
      <App />
    </AppProvider>
  </React.StrictMode>
);
