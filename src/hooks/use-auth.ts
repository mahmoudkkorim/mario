import { useState, useEffect, useRef } from "react";

// Redux
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../store/store";

const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(true);
  const isMounted = useRef<boolean>(true);

  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isMounted) {
      const token = auth.loginData?.access_token
        ? auth.loginData?.access_token
        : null;

      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setCheckStatus(false);
    }

    return () => {
      isMounted.current = true;
    };
  }, [auth.loginData, isMounted]);

  return { loggedIn, checkStatus };
};

export default useAuth;
