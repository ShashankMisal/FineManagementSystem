import React from 'react'
import AddNewUser from './AddNewUser'
import "./AdminPage.css"
import {Link} from 'react-router-dom'
import db from '../firebase.js'
import Button  from '@material-ui/core/Button';
import Footer from './Footer'
import Grow from '@material-ui/core/Grow';
import AddNewMeeting from './AddNewMeeting';


function AdminPage() {

    const [total, setTotal] = React.useState(0)


    const calculateTotalFine = ()=>{
        if(total===0){
        db.collection('users').onSnapshot( snapshot => ( 
            snapshot.docs.map(doc => (
                  setTotal( prev => (prev + doc.data().totalFinePaid) )
            ))))
        }
    }


           
           return (
               <div className="adminPage">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                       <path fill="rgb(7,0,32)" fillOpacity="1" d="M0,32L1440,160L1440,0L0,0Z">
                           </path>
                    </svg>

            <div className="adminActions">

                <div className="addNewUser">
                <Grow in >
                    <AddNewUser />
                </Grow>
                </div>

                    <Link to="/addaddfine9xvds5" style={{textDecoration:"none",color:"black"}}>
                    <Grow in style={{transitionDelay:"100ms"}}>
                        <div className="fineUser">
                            <span>FINE</span>
                        </div>
                    </Grow>
                    </Link>

            </div>


                
                    <Grow in style={{transitionDelay:"100ms"}}>
                        
                            <AddNewMeeting/>
                    </Grow>
                    

            <Grow in style={{transitionDelay:"100ms"}}>
                <Button  variant="contained" color="primary" className="calculateBtn" onClick={calculateTotalFine}>
                    Calculate Total Fine Collected:₹{total?total:"0"}
                </Button>
            </Grow>
               

            <Footer/>
        </div>
    )
}

export default AdminPage
