import { Outlet } from "react-router-dom"

const AdminPageLayout = () => {
  return (
    <div>
      <h1>AdminPage</h1>
      <Outlet />
    </div>
  )
}

export default AdminPageLayout
