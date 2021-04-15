import React from 'react'
import './UserList.css'
import SearchBar from './SearchBar.js'
import UserCard  from './UserCard'
import db from '../firebase.js'
import {Link} from 'react-router-dom'

function UserList() {

    const [users, setUsers] = React.useState([])


    React.useEffect(()=>{
         db.collection('users').onSnapshot( snapshot => ( 
                setUsers(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data()
                    }
             ) 
            ))
        ));

    },[]);
  

    return (
        <div className="userList" >
            <SearchBar/>
            <div className="userList__userCart"  >

               { users.map((user,index)=>(
                   <Link to={`/${user.id}`} key={user.id} style={{ textDecoration: 'none' }}>
                       <div >
                       <UserCard name={user.data.displayName} url={user.data.avatar} totalFine={user.data.totalFine} totalFinePaid={user.data.totalFinePaid} fineDue={user.data.fineDue} id={user.id}/>
                   </div>
                   </Link>
                    ) )
                }

            </div>
        </div>
    )
}

export default UserList
