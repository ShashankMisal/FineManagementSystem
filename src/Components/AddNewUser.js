import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app";
import db from '../firebase.js'
import addUser from './addUser.jpg'
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import manWalking from './manWalking.gif';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default function AddNewUser() {
  const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [designation, setDesignation] = React.useState("");
  
   
    const handleClose = (e) => {
      e.preventDefault();
      if(name!=="" && url!=="" && designation!=="")
      {
        setOpen(true)
      db.collection('users').add({
        avatar: url,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: name,
        fineDue:0,
        totalFinePaid:0,
        designation:designation
    }).then(()=>{
      alert("user added")
      setOpen(false)
    })
  
  
    
      setName("");
      setUrl("");
      }else{
        alert("Please Enter all Details")
      }
    };
  
    const textstyle = {
        margin:"10px",
        width:"95%",  
    }
  
    const btnstyle = {
      width:"100%",
      backgroundColor:"rgb(7 0 32)",
      color:"white",
      marginTop:"10px",
    }
    
  

  return (
    <div style={{height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
  <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
      <img src={manWalking} alt="loader" style={{borderRadius:"50%"}}/> 
  </Backdrop>
    <Paper elevation={11} style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"coloumn",backgroundImage:`url(${addUser})`, backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'}}>

          <form >
        <div className="textfields" >
          

        <TextField
          style={textstyle}
          id="outlined-textarea"
          label="Name"
          placeholder="Enter Name.."
          multiline
          variant="outlined"
          value={name}
          name="name"
          onChange={e => setName(e.target.value)}
          />
         <TextField
          style={textstyle}
          id="outlined-textarea"
          label="Avatar URL"
          placeholder="Enter Avatar URL.."
          multiline
          variant="outlined"
          value={url}
          name="url"
          onChange={e => setUrl(e.target.value)}
          />
          <TextField
          style={textstyle}
          id="outlined-textarea"
          label="Designation"
          placeholder="Enter Designation.."
          multiline
          variant="outlined"
          value={designation}
          name="designation"
          onChange={e => setDesignation(e.target.value)}
          />

      {/* </Slide> */}
       
          </div>
          
          <Button type="submit" autoFocus onClick={handleClose} color="primary" style={btnstyle}>
            Add
          </Button>
         </form>
          </Paper>
    
    </div>
  );
}