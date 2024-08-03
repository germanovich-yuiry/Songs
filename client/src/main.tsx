import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { ThemeProvider } from "./app/providers/ThemeProvide"

import { store } from "./app/store/store"
import "./index.css"
import { RouterProvider } from "react-router-dom"
import MainRoutes from "./mainRoutes"

const container = document.getElementById("root")

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={MainRoutes} />
        </Provider>
      </ThemeProvider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
