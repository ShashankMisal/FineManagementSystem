import React from 'react'
import UserList from './Components/UserList'
import UserDetails from './Components/UserDetails'
import Main from './Components/Main';
import './App.css';
import db from './firebase.js'
import {Route,Switch} from 'react-router-dom'
import SideDrawer from './Components/SideDrawer'
import SignIn from './Components/SignIn'
import PrivateRoute from './Components/PrivateRoute';


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
  },[])


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

      <Route path="/admin">
        <SignIn />
      </Route>

      <PrivateRoute path="/forAdminOnly" component={SideDrawer} />

    {/* <Route path="/forAdminOnly">
        <SideDrawer />
    </Route> */}


            
            
</totalM.Provider>
       </meetingContext.Provider>   
  </Switch>
  
    </div>
  );
}

export default App;
