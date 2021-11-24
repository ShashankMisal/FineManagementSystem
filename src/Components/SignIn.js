import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link1 from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth } from '../firebase.js'
import { useHistory } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { IconButton } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link1 color="inherit" href="https://github.com/ShashankMisal">
        Connet with Developer
      </Link1>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  let history = useHistory()
  const [,dispatch] = useStateValue();

  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")

  React.useEffect(()=>{
    auth.onAuthStateChanged((user) => {
        if (user) {
            dispatch({type:"SET_USER", value:user})
            history.push("/forAdminOnly/addMeeting")
            console.log("loggedin")
        }else{
          console.log("loggedout")
        }
    })
},[dispatch,history]) 
 

  const signIn = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(
        email,
        password
    ).then(user => {
        console.log(user)
        dispatch({type:"SET_USER", value:user.email})
        history.push(`forAdminOnly/addMeeting`);
    }).catch(err => {
        console.log(err)
        alert("Wrong Email-Password")
    })
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signIn}
          >
            Sign In
          </Button>

          
        </form>

          <Link to="/">
            <IconButton>
                  <HomeIcon style={{fontSize:"2.5rem"}}/>
            </IconButton>
          </Link>

      </div>
      <Box mt={1}>
        <Copyright />
      </Box>
    </Container>
  );
}