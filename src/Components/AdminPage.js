import React from 'react'
import AddNewUser from './AddNewUser'
import "./AdminPage.css"
import {Link} from 'react-router-dom'
import db from '../firebase.js'
import Button  from '@material-ui/core/Button';
import Footer from './Footer'


function AdminPage() {

    const [total, setTotal] = React.useState(0)


    console.log("total",total)

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
                    <AddNewUser />
                </div>

                    
                    <Link to="/addaddfine9xvds5" style={{textDecoration:"none",color:"black"}}>
                        <div className="fineUser">
                            <span>FINE</span>
                        </div>
                    </Link>
            </div>

            <Button  variant="contained" color="primary" style={{color:"white",fontSize:"15px",backgroundColor:"rgb(7 0 32)",marginTop:"10px",marginBottom:"15px"}} onClick={calculateTotalFine}>
                Calculate Total Fine Collected:₹{total?total:"0"}
            </Button>

               

            <Footer/>
        </div>
    )
}

export default AdminPage
