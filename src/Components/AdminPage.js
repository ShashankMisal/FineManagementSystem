import InputLabel from '@material-ui/core/InputLabel';
import React from 'react'
import AddNewUser from './AddNewUser'
import "./AdminPage.css"
import SelectComponent from './SelectComponent';
import Fine from './Fine';

function AdminPage() {
    return (
        <div className="adminPage">

    
            <div className="addNewUser">
            <AddNewUser />
            </div>

            <div className="fineUser">
                <span>FINE</span>
            </div>

                

        </div>
    )
}

export default AdminPage
