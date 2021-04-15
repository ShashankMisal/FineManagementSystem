import React from 'react'
import "./UserDetails.css"
import  UserCard from './UserCard';
import FineTable from './FineTable'
import {useParams} from 'react-router-dom'
import db from '../firebase.js'


function UserDetails() {

    const {userDetails} = useParams()

    const [fines,setFines] = React.useState([])
    const [summary,setSummary] = React.useState([])

    const {totalFine,fineDue,totalFinePaid,displayName,avatar} = summary || ""
    
    React.useEffect(()=>{
        if(userDetails){

            db.collection('users').doc(userDetails).onSnapshot(snapshot => {
                setSummary(snapshot.data())
            })
          
          db.collection('users').doc(userDetails).collection('fines').onSnapshot(snapshot => {
                setFines(snapshot.docs.map((doc) => doc.data()))
            })
        }
    },[])



    return (
        <div className="userDetails">
            <div className="userDetials__personalInfo">
                <UserCard name={displayName} url={avatar} totalFine={totalFine} totalFinePaid={totalFinePaid} fineDue={fineDue} varient2/>
            </div>
            <div className="userDetails__fineTable">
            <FineTable fines={fines} />
            </div>
        </div>
    )
}

export default UserDetails
