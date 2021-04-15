import React from 'react'
import "./Fine.css"
import SelectComponent from './SelectComponent';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button  from '@material-ui/core/Button';
import UserCard from './UserCard';
import SelectFinePopup from './SelectFinePopup';

function Fine() {
    return (
        <div className="fine">
             <div className="selectIntern">
                <SelectComponent />


                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudDownloadIcon />}
                    >
                    Get Data
                </Button>
            </div> 

            <UserCard name={"Shashank"} varient2 />

            

         <SelectFinePopup/>


        </div>
    )
}

export default Fine
