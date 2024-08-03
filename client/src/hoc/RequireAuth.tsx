import { useLocation, Navigate } from "react-router"
import { useAuthSuccess } from "../hooks/hooks"

const RequireAuth = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const { pathname } = useLocation()
  const index = pathname.slice(1).indexOf("/")
  const path = index !== -1 ? pathname.slice(1, index + 1) : pathname.slice(1)
  const isAuthSuccess = useAuthSuccess(path)

  if (!isAuthSuccess) {
    return <Navigate to="/" />
  } else {
    return <>{children}</>
  }
}

export default RequireAuth
