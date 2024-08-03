import { useCheckAuth } from "../hooks/useCheckAuth";

const ValidAuth = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const isLoading = useCheckAuth();

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ValidAuth;
