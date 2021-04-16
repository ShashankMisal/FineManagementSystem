import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { DialogActions, DialogContent } from '@material-ui/core';
import SelectComponent from './SelectComponent';
import TextField from '@material-ui/core/TextField';
import db from '../firebase.js'
import firebase from "firebase/app";



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
    },[id]);

    const {fineDue,totalFinePaid,displayName,avatar} = summary || ""
    

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = ()=>{
        if(id!=="" && fine!==0){
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
            >
                Add Fine
         </Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Apply Fine...
                </DialogTitle>

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

                <DialogActions>
                    <Button autoFocus onClick={handlePost} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}