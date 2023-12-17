// AllData.jsx 12-dic

// React
import { useState, useEffect, useContext } from "react";
// React Context
import UserContext from "../UserContext";
// React Bootstrap
import { Button, Form, Row, Col, Container } from "react-bootstrap";
// Firebase
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// Components
import Card from "./Card";
import NavBar from "./NavBar";

export default function AllData() {
  const { userC, addUserC, allUsers, addAllUsers } = useContext(UserContext);
  const usersCollectionRef = collection(db, "users");
  const [cUsers, setCUsers] = useState([]);
  const [cUser, setCUser] = useState({});
 
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [depositAmount, setDepositAmount] = useState("");

  // const [cName, setCName] = useState("");
  // const [cBalance, setCBalance] = useState("");
  // const [cId, setCId] = useState("");
  // const [cEMail, setCEMail] = useState("");
  // const [cPassword, setCPassword] = useState("");
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const tUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const mUser = tUsers.filter((user) => user.uid == userC.uid)[0];
      setCUsers(tUsers);
      setCUser(mUser);
      // setCName(mUser.name);
      // setCBalance(mUser.balance);
      // setCId(mUser.id);
      // setCEMail(mUser.email);
      // setCPassword("********");
    };
    getUsers();
  }, []);

  const usersRows = cUsers.map((user, index) => (
    <tr key={index}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{"********"}</td>
      <td>$ {user.balance}</td>
    </tr>
  ));
  const cUserRow = (
    <tr>
      <td>{cUser.name}</td>
      <td>{cUser.email}</td>
      <td>{"********"}</td>
      <td>$ {cUser.balance}</td>
    </tr>
  );

  return (
    <>
      <NavBar></NavBar>
      <h5 className="dataHeader text-info">Users Information</h5>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col" className="tableCell">
              Name
            </th>
            <th scope="col" className="tableCell">
              Email
            </th>
            <th scope="col" className="tableCell">
              Password
            </th>
            <th scope="col" className="tableCell">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>{usersRows}</tbody>
      </table>

      <h5 className="dataHeader text-info">Loged-In User</h5>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th scope="col" className="tableCell">
              Name
            </th>
            <th scope="col" className="tableCell">
              Email
            </th>
            <th scope="col" className="tableCell">
              Password
            </th>
            <th scope="col" className="tableCell">
              Balance
            </th>
          </tr>
        </thead>
        <tbody>{cUserRow}</tbody>
      </table>
      {/* {JSON.stringify(cUser)} */}
      <br />
    </>
  );
}