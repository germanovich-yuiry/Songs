import { Outlet } from "react-router-dom"
import UserHeader from "../../widgets/UserHeader/UserHeader"

const UserPageLayout = () => {
  return (
    <div>
      <UserHeader />
      <Outlet />
    </div>
  )
}

export default UserPageLayout
