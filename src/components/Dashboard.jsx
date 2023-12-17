// Dashboard.jsx

// basado en original (copy) donde si funciona el contexto
// ok 12-dic

// React
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// React Context
import UserContext from "../UserContext";
// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
// Components
import Card from "./Card";
import NavBar from "./NavBar";
// CSS
import "./Dashboard.css";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [allData, setAllData] = useState([]);
  const [balance, setBalance] = useState("");
  const { userC, addUserC, allUsers, addAllUsers } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setBalance(data.balance);
      addUserC(data);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const fetchAllData = async () => {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const usersArray = [];
      snapshot.forEach((doc) => {
        usersArray.push(doc.data());
      });
      console.log(usersArray);
      setAllData(usersArray);
      addAllUsers(usersArray);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchAllData();
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <div className="dashboard">
        <div className="dashboard__container">
          <h3>Dashboard</h3>
          Logged in as
          <div>
            <strong>{name}</strong>
          </div>
          <div>E-mail: {user?.email}</div>
          <div>Balance: USD {balance}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
          <div>
            You can make account transactions using the{" "}
            <strong>navigation bar</strong>
            <div>
              <Link to="/deposit">Deposit</Link>
              {" or "}
              <Link to="/withdraw">Withdraw</Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div>{JSON.stringify(allData)}</div> */}
    </>
  );
}

export default Dashboard;
