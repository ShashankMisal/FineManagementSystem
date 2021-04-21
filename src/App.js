import React from 'react'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import AdminPage from './Components/AdminPage'
import Main from './Components/Main';
import Fine from './Components/Fine'
import './App.css';
import db from './firebase.js'
import {Route,Switch} from 'react-router-dom'

export const totalM = React.createContext();
export const meetingContext = React.createContext();

function App() {
  const [totalEarned,setTotalEarned] = React.useState(0)
  const [meetings, setMeetings] = React.useState([])

  React.useEffect(()=>{
    db.collection('meetings').onSnapshot( snapshot => ( 
      setMeetings(snapshot.docs.map(doc => (
          {
              id: doc.id,
              data: doc.data()
          }
      
  )))
  ))
  })


  return (
    <div className="app">
     
<Switch>
        
     <meetingContext.Provider value={meetings}>
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
            
            
</totalM.Provider>
       </meetingContext.Provider>   
  </Switch>
  
    </div>
  );
}

export default App;
