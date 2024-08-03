import {useGetCurrentQuery} from "../services/auth/authentication.api";
import {useEffect} from "react";

export const useCheckAuth = () => {
  const { isError, isLoading, refetch }  = useGetCurrentQuery('');

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if(isError) {
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('role');
    }
  }, [isError])

  return isLoading;
}