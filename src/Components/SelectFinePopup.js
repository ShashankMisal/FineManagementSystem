import React from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { DialogActions, DialogContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import db from "../firebase.js";
import Zoom from "@material-ui/core/Zoom";
import SelectComponent from "./SelectComponent.js";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default function SelectFinePopup(props) {
    const [open, setOpen] = React.useState(false);
    const [fine, setFine] = React.useState(5);
    const [summary, setSummary] = React.useState([]);
    const [meetingIds, setMeetingIds] = React.useState([]);
    const [updateMeetIds, setUpdateMeetIds] = React.useState("");

    const { id } = props;

    React.useEffect(() => {
        if (id) {
            db.collection("users")
                .doc(id)
                .onSnapshot((snapshot) => {
                    setSummary(snapshot.data());
                });
        }

        return () => { };
    }, [id]);

    React.useEffect(() => {
        db.collection("meetings").onSnapshot((snapshot) =>
            setMeetingIds(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().Title,
                    createdAt: doc.data().meetTimeDate,
                }))
            )
        );

        return () => { };
    }, []);

    const { displayName, fineDue } = summary || "";

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = () => {
        if (id !== "" && fine >= 5 && updateMeetIds!=="") {
            const updateMeetIdDateTime = meetingIds.find((meet) => {
                return meet.id === updateMeetIds;
            });

            db.collection("users")
                .doc(id)
                .collection("fines")
                .add({
                    fineAmount: fine,
                    createdAt: updateMeetIdDateTime.createdAt,
                    isPaid: false,
                    meetingId: updateMeetIds,
                })
                .then((res) => {
                    db.collection("meetings")
                        .doc(updateMeetIds)
                        .collection("lateJoiners")
                        .add({
                            userId: displayName,
                            fineAmount: fine,
                        });
                })
                .catch();

            console.log(updateMeetIdDateTime);

            setFine(0);

            db.collection("users")
                .doc(id)
                .update({ fineDue: parseInt(fineDue) + parseInt(fine) });

            alert("Fine Added");
        } else {
            alert("fine not added");
        }
        setOpen(false);
    };

    return (
        <div>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                color="default"
                fullWidth
                startIcon={<MonetizationOnIcon />}
                style={{
                    color: "white",
                    fontSize: "17px",
                    backgroundColor: "rgb(7,0,32)",
                    marginBottom: "25px",
                }}
            >
                Add Fine
      </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    style={{ backgroundColor: "rgb(7 0 32)", color: "#f2f0fb" }}
                >
                    Apply Fine...
        </DialogTitle>
                <Zoom in>
                    <DialogContent dividers>
                        <Typography gutterBottom>Please Enter Fine Amount...</Typography>

                        <TextField
                            id="standard-number"
                            label="FineAmount"
                            value={fine}
                            onChange={(e) => setFine(e.target.value)}
                            type="number"
                            InputProps={{ inputProps: { min: 5, max: 150 } }}
                            margin="normal"
                            style={{ width: "90%" }}
                            required
                        />

                        <div>
                            <AttachFileIcon />
                            <SelectComponent
                                options={meetingIds}
                                Label={"Link Meeting :"}
                                setId={setUpdateMeetIds}
                            />
                        </div>
                    </DialogContent>
                </Zoom>
                <DialogActions style={{ backgroundColor: "rgb(7 0 32)" }}>
                    <Button
                        onClick={handlePost}
                        color="primary"
                        style={{ color: "#f2f0fb" }}
                    >
                        ADD
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
