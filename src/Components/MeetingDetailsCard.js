import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import './MeetingDetailsCard.css'
import db from '../firebase.js'

import { meetContext } from './UserList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 285,
    maxWidth: 380,
    backgroundColor: theme.palette.background.paper,
  },
  title:{
    fontWeight:800,
  },
  dateTime:{
    fontWeight:800,
  },
  chip: {
    margin: theme.spacing(0.4),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
    display:"flex",
    justifyContent:"space-between"
  },
  section3: {
    margin: theme.spacing(),
    padding:0
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function MeetingsCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const [lateJoiners, setLateJoiners] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const {title,description,meetTime,key} = React.useContext(meetContext);


  React.useEffect(()=>{
        db.collection('meetings').doc(key).collection('lateJoiners').onSnapshot(snapshot => {
            setLateJoiners(snapshot.docs.map((doc) => ({
                id:doc.id,
                data:doc.data()
            })))
        })
  },[key])




  return (
    <div className={classes.root}>

      <div className={classes.section1}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <Typography gutterBottom className={classes.title}>
              {title}
            </Typography>
          </Grid>
          
        </Grid>
        <Typography color="textSecondary" variant="body2">
         {description}
        </Typography>
      </div>

      <Divider variant="middle" />

      <div className={classes.section2}>


        
          <Typography align="left" variant="body2" className={classes.dateTime}>
          {new Date(meetTime?.toDate()).toLocaleDateString()}
          </Typography>

          <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      
          <Typography align="right" variant="body2" className={classes.dateTime}>
              {new Date(meetTime?.toDate()).toLocaleTimeString()}
          </Typography>
      </div>
     
      
     <Collapse in={expanded}>
      <div className={classes.section3}>
       
        <Typography gutterBottom variant="body1" align="center" className={classes.dateTime}>
          Late Joiners
        </Typography>
        
           { lateJoiners?.map((lateJoiner,index)=>(
                     <Chip className={classes.chip} key={index} label={`${lateJoiner.data.userId}:${lateJoiner.data.fineAmount}`} />
            ))}
         

      </div>
     </Collapse>
         
    </div>  
  );
}
