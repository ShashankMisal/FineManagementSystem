import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { DialogActions, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import db from '../firebase.js'
import firebase from "firebase/app";
import Zoom from '@material-ui/core/Zoom';


export default function SelectFinePopup(props) {
    const [open, setOpen] = React.useState(false);
    const [fine,setFine] = React.useState(5)
    const [summary,setSummary] = React.useState([])


    const {id} = props

    React.useEffect(() => {
        if(id){ 
            db.collection('users').doc(id).onSnapshot(snapshot => {
                setSummary(snapshot.data())
            })
        }

        return ()=>{
            
        }

    },[id]);

    const {fineDue} = summary || ""
    

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = ()=>{
        if(id!=="" && fine>=5){
            db.collection('users').doc(id).collection('fines').add({
                fineAmount:fine,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                isPaid:false
            })
            setFine(0);

            db.collection('users').doc(id).update({fineDue:(parseInt(fineDue)+ parseInt(fine))})

            alert("Fine Added")
        }else{
            alert("fine not added")
        }      
        setOpen(false);
    }

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="default"
                startIcon={<MonetizationOnIcon />}
                style={{color:"white",fontSize:"17px",backgroundColor:"rgb(7,0,32)",margin:"8px",marginBottom:"25px"}}
            >
                Add Fine
         </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{backgroundColor:"rgb(7 0 32)",color:"#f2f0fb"}}>
                    Apply Fine...
                </DialogTitle>
                <Zoom in >
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Please Enter Fine Amount...        
                    </Typography>
                    
                    <TextField
                        id="standard-number"
                        label="Number"
                        value={fine}
                        onChange={(e) => setFine(e.target.value)}
                        type="number"
                        InputProps={{ inputProps: { min: 5, max: 150 } }}
                        margin="normal"
                        style={{width:"90%"}}
                        required
                        />


                </DialogContent>
                </Zoom>
                <DialogActions style={{backgroundColor:"rgb(7 0 32)"}}>

                    <Button autoFocus onClick={handlePost} color="primary" style={{color:"#f2f0fb"}} >
                        ADD
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}