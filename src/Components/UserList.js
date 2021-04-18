import React from 'react'
import './UserList.css'
import SearchBar from './SearchBar.js'
import UserCard  from './UserCard'
import db from '../firebase.js'
import {Link} from 'react-router-dom'
import Grow from '@material-ui/core/Grow';
import Footer from './Footer'


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

        users.sort((a,b)=>{
        return a.data.displayName.localeCompare(b.data.displayName);
    })
  

    return (
        <div className="userList" >
            <SearchBar/>
            <div className="userList__userCart" >

               { 
               users.map((user,index)=>(
                   <Link to={`/t/${user.id}`} key={user.id} style={{ textDecoration: 'none' }}>

                       <div >
                       <Grow>
                       <UserCard name={user.data.displayName} url={user.data.avatar} totalFinePaid={user.data.totalFinePaid} designation={user.data.designation} fineDue={user.data.fineDue} id={user.id}/>
                        </Grow>
                   </div>
                   </Link>
                    ) )
                }

            </div>
            
            <Footer/>

        </div>
    )
}

export default UserList
