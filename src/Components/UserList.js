import React from "react";
import "./UserList.css";
import SearchBar from "./SearchBar.js";
import UserCard from "./UserCard";
import db from "../firebase.js";
import { Link } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import Footer from "./Footer";
import ChooseBtn from "./ChooseBtn";
import MeetingsCard from "./MeetingsCard";
// import DoughnutChart from "./DoughnutChart";
import BarGraph from "./BarGraph";
import Paper from "@material-ui/core/Paper";

export const meetContext = React.createContext("");

function UserList() {
    const [users, setUsers] = React.useState([]);
    const [meetings, setMeetings] = React.useState([]);
    const [chooseIndex, setChooseIndex] = React.useState(0);
    const userNames = users.map((user, index) => {
        return user.data.displayName;
    });

    const totalFinePaidAmounts = users.map((user, index) => {
        return user.data.totalFinePaid;
    });

    React.useEffect(() => {
        db.collection("users").onSnapshot((snapshot) =>
            setUsers(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        db.collection("meetings").onSnapshot((snapshot) =>
            setMeetings(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );
    }, []);

    users.sort((a, b) => {
        return a.data.displayName.localeCompare(b.data.displayName);
    });

    meetings.sort(
        (a, b) => b.data?.meetTimeDate?.toDate() - a.data?.meetTimeDate?.toDate()
    );

    return (
        <div className="userList">
            <SearchBar />

            <div className="chooseBtn">
                <ChooseBtn setChooseIndex={setChooseIndex} />
            </div>

            {chooseIndex === 0 ? (
                <>
                    <div className="userList__userCart">
                        {users.map((user, index) => (
                            <Link
                                to={`/t/${user?.id}`}
                                key={user?.id}
                                style={{ textDecoration: "none" }}
                            >
                                <Grow
                                    in
                                    style={{ transitionDelay: index % 2 !== 0 ? "50ms" : "0ms" }}
                                >
                                    <div>
                                        <UserCard
                                            name={user?.data.displayName}
                                            url={user?.data.avatar}
                                            totalFinePaid={user?.data.totalFinePaid}
                                            designation={user?.data.designation}
                                            fineDue={user?.data.fineDue}
                                            id={user?.id}
                                        />
                                    </div>
                                </Grow>
                            </Link>
                        ))}
                    </div>
                    <div className="charts">
                        <Paper
                            elevation={2}
                            style={{
                                backgroundImage:
                                   "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
                                width: "80%",
                                height: "100%",
                                padding: "15px",
                            }}
                        >
                            <BarGraph
                                userNames={userNames}
                                totalFinePaidAmounts={totalFinePaidAmounts}
                            />
                        </Paper>
                    </div>
                    {/* <Paper elevation={0} style={{width:"30%",padding:"15px"}} >
            <DoughnutChart userNames={userNames}  totalFinePaidAmounts={totalFinePaidAmounts} />
            </Paper>  */}
                </>
            ) : (
                <div className="userList__userCart">
                    {meetings.map((meeting, index) => (
                        <div key={index}>
                            {/* <Grow in style={{ transitionDelay: index%2!==0 ? '50ms' : '0ms' }} > */}
                            <meetContext.Provider
                                value={{
                                    title: meeting?.data.Title,
                                    description: meeting?.data.Description,
                                    meetTime: meeting?.data.meetTimeDate,
                                    key: meeting?.id,
                                }}
                            >
                                <MeetingsCard
                                    title={meeting?.data?.Title}
                                    description={meeting?.data?.Description}
                                    meetTimeDate={meeting?.data?.meetTimeDate}
                                    key={meeting.id}
                                />
                            </meetContext.Provider>
                            {/* </Grow> */}
                        </div>
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
}

export default UserList;
