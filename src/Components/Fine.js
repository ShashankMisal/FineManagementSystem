import React from "react";
import "./Fine.css";
import SelectComponent from "./SelectComponent";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import UserCard from "./UserCard";
import SelectFinePopup from "./SelectFinePopup";
import db from "../firebase.js";
import FineTable from "./FineTable";
import Footer from "./Footer";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import girl from "./girl.svg";


function Fine() {
    const [userNames, setUserNames] = React.useState([]);
    const [id, setId] = React.useState("");
    const [summary, setSummary] = React.useState([]);
    const [showFineButton, setShowFineButton] = React.useState(false);
    const [fines, setFines] = React.useState([]);
    const [getDataFromDB, setGetDataFromDB] = React.useState(false);

    const { designation, fineDue, totalFinePaid, displayName, avatar } =
        summary || "";

    React.useEffect(() => {
        db.collection("users").onSnapshot((snapshot) =>
            setUserNames(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().displayName,
                }))
            )
        );
    }, []);


    React.useEffect(() => {

        if (getDataFromDB && id) {
            db.collection("users")
                .doc(id)
                .onSnapshot((snapshot) => {
                    setSummary(snapshot.data());
                });

            db.collection("users")
                .doc(id)
                .collection("fines")
                .onSnapshot((snapshot) => {
                    setFines(
                        snapshot.docs.map((doc) => ({
                            finesid: doc.id,
                            data: doc.data(),
                        }))
                    );
                });

            setGetDataFromDB(false)
        }

        return () => {
    }

    }, [getDataFromDB, id])


    const getData = () => {
        if (id) {
            setGetDataFromDB(true)
            setShowFineButton(true)
        } else
            setShowFineButton(false)
    };

    const imgGStyle = {
        widht: "150px",
        height: "150px",
        position: "relative",
        top: "65px",
    };

    return (
        <div className="fine">
            <img alt="img" src={girl} style={imgGStyle} />
            <div className="selectIntern">
                <SelectComponent
                    options={userNames}
                    Label={"Select User:"}
                    setId={setId}
                    setShowFineButton={setShowFineButton}
                    sort="name"
                />

                <IconButton onClick={getData}>
                    <CloudDownloadIcon
                        style={{ fontSize: "40px", color: "rgb(7 0 32)" }}
                    />
                </IconButton>
            </div>

            <div className="flex-container">
                <Collapse in={showFineButton}>
                    <div className="flex-items">
                        <UserCard
                            name={displayName}
                            url={avatar}
                            designation={designation}
                            totalFinePaid={totalFinePaid}
                            fineDue={fineDue}
                            varient2
                        />
                        <SelectFinePopup id={id} />
                    </div>

                    <div className="flex-items">
                        <FineTable fines={fines} toUpdateUserId={id} summary={summary} />
                    </div>
                </Collapse>
            </div>

            <Footer />
        </div>
    );
}

export default Fine;
