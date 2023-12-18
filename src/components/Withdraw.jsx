// Withdraw.jsx
// 16-dic

// React
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// React Context
import UserContext from "../UserContext";
// React Bootstrap
import { Button, Form, Row, Col, Container } from "react-bootstrap";
// Firebase
import { db, logout } from "../firebase";
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
// CSS
// import "./Withdraw.css";

export default function Withdraw() {
  const { userC, addUserC, allUsers, addAllUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [cUser, setCUser] = useState({});

  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [cName, setCName] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cBalance, setCBalance] = useState("");
  const [cId, setCId] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      const tUsers = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      const mUser = tUsers.filter((user) => user.uid == userC.uid)[0];
      setCName(mUser.name);
      setCEmail(mUser.email);
      setCBalance(mUser.balance);
      setCId(mUser.id);
      setCUser(mUser);
    };
    getUsers();
  }, []);

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label + " required");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    console.log(field, parseInt(field));
    if (isNaN(field)) {
      setStatus("Error: " + label + " not a number");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (field > cBalance) {
      setStatus("Error: " + label + " greater than available funds");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  const updateUser = async (id, balance) => {
    const userDoc = doc(db, "users", id);
    const newFields = { balance: balance };
    await updateDoc(userDoc, newFields);
  };

  function handleWithdraw() {
    if (!validate(withdrawAmount, "Withdraw amount")) return;
    let newBalance = cBalance - parseInt(withdrawAmount);
    updateUser(cId, newBalance);
    setCBalance(newBalance);
    setShow(false);
  }

  function clearForm() {
    setCBalance(cBalance);
    setShow(true);
  }

  // function handleDashboard() {
  //   navigate("/dashboard")
  // }

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card
              bgcolor="light"
              txtcolor="info"
              header1="Withdraw"
              header1Value=""
              header2="User: "
              header2Value={cName + " (" + cEmail + ")"}
              header3="Current balance: $ "
              header3Value={cBalance}
              status={status}
              body={
                show ? (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Amount to withdraw:</Form.Label>
                      <Form.Control
                        type="input"
                        id="withdraw-amount"
                        placeholder="Enter amount to withdraw"
                        value={withdrawAmount}
                        onChange={(e) =>
                          setWithdrawAmount(e.currentTarget.value)
                        }
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={handleWithdraw}
                      disabled={withdrawAmount === ""}
                    >
                      Perform withdraw
                    </Button>
                  </>
                ) : (
                  <>
                    <h5>Success</h5>
                    <Button
                      type="submit"
                      variant="secondary"
                      onClick={clearForm}
                    >
                      Another withdraw
                    </Button>
                    {/* {" "}
                <Button type="submit" variant="secondary" onClick={handleDashboard}>
                  Dashboard
                </Button> */}
                    <div className="mt-3">
                      <Link to="/deposit"><Button variant="secondary">Deposit</Button></Link>
                      {" or "}
                      <Link to="/dashboard"><Button variant="secondary">Dashboard</Button></Link>
                    </div>
                  </>
                )
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
