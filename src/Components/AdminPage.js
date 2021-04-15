import React from 'react'
import AddNewUser from './AddNewUser'
import "./AdminPage.css"
import SelectComponent from './SelectComponent';
import Fine from './Fine';
import {Link,Route } from 'react-router-dom'

function AdminPage() {

    return (
        <div className="adminPage">

    
            <div className="addNewUser">
            <AddNewUser />
            </div>

                
                <Link to="/addaddfine9xvds5" style={{textDecoration:"none",color:"black"}}>
                    <div className="fineUser">
                        <span>FINE</span>
                    </div>
                </Link>


                

        </div>
    )
}

export default AdminPage
