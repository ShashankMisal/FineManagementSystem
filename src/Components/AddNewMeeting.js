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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';
import db from '../firebase.js'
import Slide from '@material-ui/core/Slide';
import DateTimeUIPickers from './DateTimeUIPickers';



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

export default function AddNewMeeting() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [meetTimeDate, setMeetTimeDate] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    if(title!=="" && description!=="" && meetTimeDate!=="")
    {
    db.collection('meetings').add({
      Description: description,
      Title: title,
      meetTimeDate:meetTimeDate,
  })

  
    setTitle("");
    setDescription("");
    setMeetTimeDate("");
    }
  };

  const style = {
      margin:"5px",
      width:"100%"
  }

  

  return (
    <div>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
            <AddCircleIcon style={{fontSize:"90px",zIndex:"20",color:"rgb(7,0,32)"}} />
        </IconButton>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{backgroundColor:"rgb(7 0 32)",color:"#f2f0fb"}}>
          Add New Meeting...
        </DialogTitle>
        <Slide in direction="down">


        <DialogContent dividers>
          <Typography gutterBottom>
           To Add New Meeting , Please Enter following details.
          </Typography>

        <div className="textfields">
          <TextField
          style={style}
          id="outlined-textarea"
          label="Title"
          placeholder="Enter Title of Meeting.."
          multiline
          variant="outlined"
          value={title}
          name="title"
          onChange={e => setTitle(e.target.value)}
          />
         <TextField
          style={style}
          id="outlined-textarea"
          label="Description"
          placeholder="Enter Short Description..."
          multiline
          variant="outlined"
          value={description}
          name="desricption"
          onChange={e => setDescription(e.target.value)}
          />

        <DateTimeUIPickers setMeetTimeDate={setMeetTimeDate}/>
         
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