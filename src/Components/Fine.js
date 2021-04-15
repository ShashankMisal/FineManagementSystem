import React from 'react'
import "./Fine.css"
import SelectComponent from './SelectComponent';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button  from '@material-ui/core/Button';
import UserCard from './UserCard';
import SelectFinePopup from './SelectFinePopup';
import db from '../firebase.js'

function Fine() {

    const [userNames, setUserNames] = React.useState([])
    const [id,setId] = React.useState("")
    const [summary,setSummary] = React.useState([])
    const [showFineButton,setShowFineButton] = React.useState(false)

    const {totalFine,fineDue,totalFinePaid,displayName,avatar} = summary || ""

    React.useEffect(()=>{
         db.collection('users').onSnapshot( snapshot => ( 
                setUserNames(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        name: doc.data().displayName
                    }
             ) 
            ))
        ));

    },[]);


    const getId = (temp) => {
        setId(temp)
    }

    const getData = () =>{
       if(id){ 
            db.collection('users').doc(id).onSnapshot(snapshot => {
                setSummary(snapshot.data())
            })

            setShowFineButton(true);
        }else
        setShowFineButton(false);
    }
    


    return (
        <div className="fine">
             <div className="selectIntern">
                <SelectComponent options={userNames} getId={getId}/>

                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudDownloadIcon />}
                    onClick={getData}
                    >
                    Get Data
                </Button>
            </div> 

        
            
           { showFineButton
            ?(
            <UserCard name={displayName} url={avatar} totalFine={totalFine} totalFinePaid={totalFinePaid} fineDue={fineDue} varient2/>
            ):""
            }      
    
            {
                showFineButton?<SelectFinePopup/>:"" 
            } 


            



        </div>
    )
}

export default Fine
