import React from 'react'
import "./UserDetails.css"
import  UserCard from './UserCard';
import FineTable from './FineTable'
import {useParams} from 'react-router-dom'
import db from '../firebase.js'
import Footer from './Footer'
import Zoom from '@material-ui/core/Zoom';


function UserDetails() {

    const {userDetails} = useParams()

    const [fines,setFines] = React.useState([])
    const [summary,setSummary] = React.useState([])

    const {fineDue,totalFinePaid,displayName,avatar,designation} = summary || ""
    
    React.useEffect(()=>{
        if(userDetails){

            db.collection('users').doc(userDetails).onSnapshot(snapshot => {
                setSummary(snapshot.data())
            })
          
          db.collection('users').doc(userDetails).collection('fines').onSnapshot(snapshot => {
            setFines(snapshot.docs.map((doc) => ({
                finesid:doc.id,
                data:doc.data()
            })))
            })
        }

        return ()=>{
            
        }

    },[userDetails])



    return (
        <div className="userDetails">

            <div className="userDetials__personalInfo">
              <Zoom in>  
                <UserCard name={displayName} url={avatar} totalFinePaid={totalFinePaid} designation={designation} fineDue={fineDue} varient2/>
            </Zoom>
            </div>
            <div className="userDetails__fineTable">
            <FineTable fines={fines} />
            </div>
            <Footer/>
        </div>
    )
}

export default UserDetails
