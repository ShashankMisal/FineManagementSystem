import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app";
import db from '../firebase.js'
import Slide from '@material-ui/core/Slide';
import PersonAddIcon from '@material-ui/icons/PersonAdd';



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function AddNewUser() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [designation, setDesignation] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    if(name!=="" && url!=="" && designation!=="")
    {
    db.collection('users').add({
      avatar: url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      displayName: name,
      fineDue:0,
      totalFinePaid:0,
      designation:designation
  })

  
    setName("");
    setUrl("");
    }
  };

  const style = {
      margin:"5px",
      width:"100%"
  }
  

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
            <PersonAddIcon style={{fontSize:"90px",zIndex:"20",color:"rgb(7,0,32)"}} />
        </IconButton>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{backgroundColor:"rgb(7 0 32)",color:"#f2f0fb"}}>
          Add New User...
        </DialogTitle>
        <Slide in direction="down">
        <DialogContent dividers>
          <Typography gutterBottom>
           To Add New User , Please Enter following details.
          </Typography>

        <div className="textfields">
          <TextField
          style={style}
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
          style={style}
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
          style={style}
          id="outlined-textarea"
          label="Designation"
          placeholder="Enter Designation.."
          multiline
          variant="outlined"
          value={designation}
          name="designation"
          onChange={e => setDesignation(e.target.value)}
          />
         
          </div>
        </DialogContent>
      </Slide>
        <DialogActions style={{backgroundColor:"rgb(7 0 32)"}}>
          <Button autoFocus onClick={handleClose} color="primary" style={{color:"#f2f0fb"}}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    
    </div>
  );
}