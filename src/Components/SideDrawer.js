import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import clsx from 'clsx';
import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AddNewMeeting from './AddNewMeeting';
import AddNewUser from './AddNewUser';
import CalculateTotalFine from './CalculateTotalFine';
import Fine from './Fine';
import Footer from './Footer';

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  contentPage:{
    display:"flex",
    justifyContent:"center",
    alignItems:"Center",
    // height:"100vh",
    // backgroundColor:"red"
  },
  menuButton: {
    position:"absolute",
    top:"20px",
    left:"40px"
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    justifyContent: 'center',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideDrawer() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const {url,path} = useRouteMatch()
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  



  


    
      
  const linkStyle = {textDecoration:"none",
                    color:"black",
    }
    const listItemStyle = {
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    }

  return (
    <div className={classes.root}>


     
      <ClickAwayListener onClickAway={handleDrawerClose}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            >
            <MenuIcon />
          </IconButton>

            </ClickAwayListener>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div className={classes.drawerHeader} style={{backgroundColor:"rgb(7 0 32)",color:"white"}}>

          <IconButton onClick={handleDrawerClose}>
             <ChevronLeftIcon style={{color:"white"}} /> 
          </IconButton>
        </div>
        <List>
        
        <Link to={`${url}/addMeeting`} style={linkStyle}>
            <ListItem style={listItemStyle} button>
              <ListItemIcon><AddToPhotosIcon  /> </ListItemIcon>
              <ListItemText primary="Add Meetings"/>
            </ListItem>
        </Link>

        <Link to={`${url}/addNewUser`} style={linkStyle}>
          <ListItem style={listItemStyle} button >
              <ListItemIcon><PersonAddIcon  /> </ListItemIcon>
              <ListItemText primary=" Add New User"/>
            </ListItem>
        </Link>

        <Link to={`${url}/addaddfine9xvds5`} style={linkStyle}>
          <ListItem style={listItemStyle} button>
                <ListItemIcon><LocalAtmIcon/> </ListItemIcon>
                <ListItemText primary="Add Fine"/>
              </ListItem>
          </Link>

          <Link to={`${url}/totalFineCollected`} style={linkStyle}>
          <ListItem style={listItemStyle} button >
                <ListItemIcon><AccountBalanceIcon/> </ListItemIcon>
                <ListItemText primary="Calculate Total Fine"/>
              </ListItem>
          </Link>
        
        </List>
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />


        <div className={classes.contentPage}>


<Switch>
  
          
          {/* <Route path={"/forAdminOnly"}>
          <DefaultImg/>
        </Route>
      */}

        <Route path={`${path}/addMeeting`}>
          <AddNewMeeting/>
        </Route>
        
         <Route path={`${path}/addNewUser`}>
          <AddNewUser/>
        </Route>
        
        
      <Route path={`${path}/addaddfine9xvds5`}>
                <Fine />
            </Route>
            
            <Route path={`${path}/totalFineCollected`}>
              <CalculateTotalFine/>
            </Route>
            </Switch>
        {/* <Route path={`${path}/addNewUser`}>
          
        </Route> */}
        </div>
      </main>
      <Footer/>
    </div>
  );
}