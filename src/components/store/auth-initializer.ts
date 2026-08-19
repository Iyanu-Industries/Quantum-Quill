import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./authSlice";
import { AppDispatch, RootState } from "./store";

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (token && !isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
  }, [token, isAuthenticated, dispatch]);
  return null;
};

export default AuthInitializer;
