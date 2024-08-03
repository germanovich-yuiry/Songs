import { createBrowserRouter, Route, Routes } from "react-router-dom"
import RegistrationForm from "./widgets/Registration"

import SignInPageLayout from "./layout/SignInPageLayout/SignInPageLayout"
import AdminPageLayout from "./layout/AdminPageLayout/AdminPageLayout"

import App from "./app/App"

import { SignUpPageLayout } from "./layout/SignUpPageLayout/SignUpPageLayout"
import { Navigate } from "react-router-dom"
import UserPageLayout from "./layout/UserPageLayout/UserPageLayout"

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,
        element: <Navigate to="/user" />,
      },

      {
        path: "sign-in/*",
        element: (
          <SignInPageLayout>
            <h1>SignPage</h1>
          </SignInPageLayout>
        ),
      },
      {
        path: "sign-up/*",
        element: (
          <SignUpPageLayout>
            <RegistrationForm />
          </SignUpPageLayout>
        ),
      },
      {
        path: "user/*",
        element: (
          // <RequireAuth>
          <UserPageLayout>
            <Routes>
              <Route index element={<h1>Header</h1>} />
              <Route path="songs" element={<h2>Songs</h2>} />
            </Routes>
          </UserPageLayout>
          // </RequireAuth>
        ),
      },
      {
        path: "admin/*",

        element: (
          // <RequireAuth>
          <AdminPageLayout>
            <Routes>
              <Route index element={<h1>AdminHeader</h1>} />
            </Routes>
          </AdminPageLayout>
          // </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
])

export default MainRoutes
