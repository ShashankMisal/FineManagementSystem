import React from 'react'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import AdminPage from './Components/AdminPage'
import Fine from './Components/Fine'
import './App.css';
import {Route , Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        {/* <Intro /> */}

    <Switch>

      <Route exact path="/">
        <UserList />
      </Route>


      <Route path="/t/:userDetails">
        <UserDetails />
      </Route>

      <Route path="/forAdminOnly">
        <AdminPage />
      </Route>

      <Route exact path="/addaddfine9xvds5">
                <Fine />
            </Route>
        {/* <Fine/> */}
    </Switch>
    </div>
  );
}

export default App;
