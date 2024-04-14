


import {useSelector} from 'react-redux'

import {Navigate, useLocation} from 'react-router-dom'
export const AdminPrivateRoute = ({children}) => {
  const adminIsAuth = useSelector(st=>st.authReducer.adminIsAuth);
  const location = useLocation();
  if(!adminIsAuth){
    return <Navigate state={location.pathname} to={'/admin/login'}/>
 }
 return children;
};