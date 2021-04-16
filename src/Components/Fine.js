import React from 'react'
import "./Fine.css"
import SelectComponent from './SelectComponent';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Button  from '@material-ui/core/Button';
import UserCard from './UserCard';
import SelectFinePopup from './SelectFinePopup';
import db from '../firebase.js'
import FineTable from './FineTable'
import {Route,useParams,useRouteMatch} from 'react-router-dom'

function Fine() {

    const [userNames, setUserNames] = React.useState([])
    const [id,setId] = React.useState("")
    const [summary,setSummary] = React.useState([])
    const [showFineButton,setShowFineButton] = React.useState(false)
    const [fines,setFines] = React.useState([])
    const [updateFinesId,setUpdateFinesId] = React.useState("")
    const [paidStatus,setPaidStatus] = React.useState()
    const [updatedStatusAmount,setUpdatedStatusAmount] = React.useState(0)
    const {url,path} = useRouteMatch();

    const {designation,totalFine,fineDue,totalFinePaid,displayName,avatar} = summary || ""

    
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

    React.useEffect(()=>{
        if(updateFinesId!=="" && id!==""){
           
        const fineDoc = db.collection('users').doc(id)
        const fineDoc2 = fineDoc.collection('fines').doc(updateFinesId)
        fineDoc2.update({isPaid:!(paidStatus)}).then((res)=>{
            console.log("res:",res)
        }).catch((err)=>console.log(err)) 
 
    }
    },[updateFinesId,paidStatus]);

    React.useEffect(()=>{
        if(updateFinesId!=="" && id!==""){
      
        db.collection('users').doc(id).update({
            totalFinePaid: (paidStatus===false)
                            ?(parseInt(totalFinePaid) + parseInt(updatedStatusAmount))
                            :(parseInt(totalFinePaid) - parseInt(updatedStatusAmount))
                        })

         db.collection('users').doc(id).update({fineDue:(paidStatus===false)
                            ?(parseInt(fineDue) - parseInt(updatedStatusAmount))
                            :(parseInt(fineDue) + parseInt(updatedStatusAmount))
        })
        }
    },[paidStatus,updateFinesId]);


    // const updateDoc = ()=>{
    //     console.log("in")
      
    // }


    const getFinesId = ({updatefineId,paidStatus,updatedStatusAmount}) =>{
        setUpdateFinesId(updatefineId)
        setPaidStatus(paidStatus)
        setUpdatedStatusAmount(updatedStatusAmount)

    }
   
    const getId = (temp) => {
        setId(temp)
    }


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
                <SelectComponent options={userNames} getId={getId} />

                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudDownloadIcon />}
                    onClick={getData}
                    >
                    Get Data
                </Button>
            </div> 

        
            
           { showFineButton?(
               <>


            <div>
                <UserCard name={displayName} url={avatar} totalFine={totalFine} designation={designation} totalFinePaid={totalFinePaid} fineDue={fineDue} varient2/>
            </div>
           

            <div style={{margin:"20px",width:"90%",marginLeft:"auto",marginRight:"auto"}}>
                <FineTable fines={fines} getFinesId={getFinesId} />
            </div>
        
           

            <div className="selectFinePopup"><SelectFinePopup id={id}/></div>
            </>
            ):""
           }


        </div>
    )
}

export default Fine
