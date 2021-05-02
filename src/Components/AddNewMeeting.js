import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import db from "../firebase.js";
import DateTimeUIPickers from "./DateTimeUIPickers";
import meetings from "./meetings.jpeg";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import moneyLoader from "./moneyLoader.gif";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function AddNewMeeting() {
  const classes = useStyles();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [meetingTimeDate, setMeetTimeDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [putIntoDb, setPutIntoDb] = React.useState(false)



  const handleClose = React.useCallback((e) => {
    e.preventDefault()
    if (title !== "" && description !== "") {
      setPutIntoDb(true)
    } else {
      alert("Please Enter all Details")
    }

  }, [title, description])

  React.useEffect(() => {

    if (putIntoDb) {
      setOpen(true);
      db.collection("meetings")
        .add({
          Description: description,
          Title: title,
          meetTimeDate: meetingTimeDate,
        })
        .then((res) => {
          setOpen(false);
          setPutIntoDb(false)
          alert("meetingAdded");
          setTitle("");
          setDescription("");
          setMeetTimeDate("");
        })
        .catch((err) => {
          alert("Error in adding meet");
          setOpen(false);
        });
    }

    return () => {
      window.removeEventListener('onClick', handleClose)
    }

  }, [putIntoDb, title, description, meetingTimeDate, handleClose])



  const textstyle = {
    margin: "10px",
    width: "95%",
  };

  const btnstyle = {
    width: "100%",
    backgroundColor: "rgb(7 0 32)",
    color: "white",
    marginTop: "10px",
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <img
          alt="money"
          src={moneyLoader}
          style={{ borderRadius: "50%", border: "2px solid black" }}
        />
      </Backdrop>
      <Paper
        elevation={14}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "coloumn",
          backgroundImage: `url(${meetings})`,
          backgroundPosition: "right",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <form>
          <div className="textfields">
            <TextField
              style={textstyle}
              id="outlined-textarea"
              label="Title"
              placeholder="Enter Title of Meeting.."
              multiline
              variant="outlined"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              style={textstyle}
              id="outlined-textarea"
              label="Description"
              placeholder="Enter Short Description..."
              multiline
              variant="outlined"
              value={description}
              name="desricption"
              onChange={(e) => setDescription(e.target.value)}
            />

            <DateTimeUIPickers setMeetTimeDate={setMeetTimeDate} />
            {/* </Slide> */}
          </div>

          <Button
            type="submit"
            onClick={handleClose}
            color="primary"
            style={btnstyle}
          >
            Add
          </Button>
        </form>
      </Paper>
    </div>
  );
}


export default React.memo(AddNewMeeting)