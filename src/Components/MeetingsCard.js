import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { Divider, makeStyles } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import MeetDetailsPopup from './MeetDetailsPopup'
import './MeetingCard.css'

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: 12,
    minWidth: 306,
    width:300,
    textAlign: 'center',
    margin:7,
  },
  content:{
    height:"85px",

  },
  header: {
    textAlign: 'center',
    spacing: 2,
    height:35,
  },
  list: {
    padding: '10px',
  },
  button: {
    margin: theme.spacing(0.5),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

export const MeetingsCard = React.memo(function MeetingsCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title={`${props.title?.slice(0,25)}...`} className={classes.header} />
      <Divider variant="middle" />
      <CardContent className={classes.content}>
      
     
      <Typography  variant="body2" style={{display:"flex",justifyContent:"space-between"}}>
          <span>{new Date(props.meetTimeDate?.toDate()).toLocaleDateString()}</span>
       
            <span>  {new Date(props.meetTimeDate?.toDate()).toLocaleTimeString()}</span>

          </Typography>

          <Typography className={classes.list} align="center">{props.description?.slice(0,50)}...</Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions className={classes.action}>
      
          <MeetDetailsPopup  />
      </CardActions>
    </Card>
  );
});

export default MeetingsCard