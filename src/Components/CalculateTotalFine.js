import React from "react";
import tenor from "./tenor.gif";
import db from "../firebase.js";
import "./CalculateTotalFine.css";
import moneyLoader from "./moneyLoader.gif";

export default function CalculateTotalFine() {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (total === 0) {
      db.collection("users").onSnapshot((snapshot) =>
        snapshot.docs.map((doc) =>
          setTotal((prev) => prev + doc.data().totalFinePaid)
        )
      );
    }
  }, [total]);

  return (
    <div
      className="moneyContainer"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {total !== 0 ? (
        <>
          <img alt="money" src={moneyLoader} />
          <h1>Total fine Collected : {total ? total : 0}</h1>
        </>
      ) : (
        <img alt="money" src={tenor} />
      )}
    </div>
  );
}
