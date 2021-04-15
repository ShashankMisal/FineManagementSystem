import React from 'react'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import AdminPage from './Components/AdminPage'
import Fine from './Components/Fine'
import './App.css';
import {Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        {/* <Intro /> */}

      <Route exact path="/">
        <UserList />
      </Route>

      <Route path="/:userDetails">
        <UserDetails />
      </Route>

        {/* <AdminPage /> */}

        {/* <Fine/> */}
    </div>
  );
}

export default App;
