import React from 'react'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import AdminPage from './Components/AdminPage'
import Main from './Components/Main';
import Fine from './Components/Fine'
import './App.css';
import {Route,Switch} from 'react-router-dom'

export const totalM = React.createContext();

function App() {
  const [totalEarned,setTotalEarned] = React.useState(0)
  return (
    <div className="app">
     
<Switch>
        
      <Route exact path="/">
        <Main />
      </Route>

    <Route path="/main">
        <UserList />
      </Route>

      <Route path="/t/:userDetails">
        <UserDetails />
      </Route>

<totalM.Provider value={{totalEarned:totalEarned,updateTotalM:setTotalEarned}}>

      <Route path="/forAdminOnly">
        <AdminPage />
      </Route>

      <Route exact path="/addaddfine9xvds5">
                <Fine />
            </Route>
        {/* <Fine/> */}
</totalM.Provider>
  </Switch>
  
    </div>
  );
}

export default App;
