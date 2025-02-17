import { useSelector } from 'react-redux';

import { Navigate, useLocation } from 'react-router-dom';
export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(st => st.authReducer.isAuth);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate state={location.pathname} to={'/user/login'} />;
  }
  return children;
};
