  
import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useStateValue } from './StateProvider';


  export default function PrivateRoute({ component: Component,...rest }) {

    const [userState] = useStateValue();  
    return (
      <Route
        {...rest}
        render={(props) => {
          return  userState.user ? <Component {...props}/> : <Redirect to="/main"/>
        }}
      />
    )
  }