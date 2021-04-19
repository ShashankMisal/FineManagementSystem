import React from 'react'
import "./Fine.css"
import SelectComponent from './SelectComponent';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button  from '@material-ui/core/Button';
import UserCard from './UserCard';
import SelectFinePopup from './SelectFinePopup';
import db from '../firebase.js'
import FineTable from './FineTable'
import Footer from './Footer'
import Collapse from '@material-ui/core/Collapse';


export const idContext = React.createContext("")

function Fine() {

    const [userNames, setUserNames] = React.useState([])
    const [id,setId] = React.useState("")
    const [summary,setSummary] = React.useState([])
    const [showFineButton,setShowFineButton] = React.useState(false)
    const [fines,setFines] = React.useState([])


    const {designation,fineDue,totalFinePaid,displayName,avatar} = summary || ""

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


   

    const getData = () =>{
       if(id){ 
            db.collection('users').doc(id).onSnapshot(snapshot => {
                setSummary(snapshot.data())
            })

            db.collection('users').doc(id).collection('fines').onSnapshot(snapshot => {
                setFines(snapshot.docs.map((doc) => ({
                    finesid:doc.id,
                    data:doc.data()
                })))
            })
            setShowFineButton(true)
        }

    }
    
    return (
        <div className="fine">
             <div className="selectIntern">
            
            <idContext.Provider value={{setId,setShowFineButton}}>
                <SelectComponent options={userNames} />
           </idContext.Provider>

                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudDownloadIcon />}
                    onClick={getData}
                    >
                    Get Data
                </Button>
            </div> 

            <Collapse in={showFineButton} >
            <div>
                    <UserCard name={displayName} url={avatar} designation={designation} totalFinePaid={totalFinePaid} fineDue={fineDue} varient2/>
            </div>
                </Collapse>

           { showFineButton?(
               <>

            <div style={{margin:"20px",width:"90%",marginLeft:"auto",marginRight:"auto"}}>
                <FineTable fines={fines} toUpdateUserId={id} summary={summary}/>
            </div>
        
           

            <div className="selectFinePopup"><SelectFinePopup id={id}/></div>
            </>
            ):""
           }
            <Footer/>

        </div>
    )
}

export default Fine
