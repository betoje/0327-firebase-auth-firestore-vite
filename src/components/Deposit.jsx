// Deposit.jsx
// ok 12-dic

// React
import { useState, useEffect, useContext } from "react";
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
import "./Deposit.css";

function Deposit() {
  const { userC, addUserC, allUsers, addAllUsers } = useContext(UserContext);
  const navigate = useNavigate();
  const usersCollectionRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const [cUser, setCUser] = useState({});

  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
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
    if (field <= 0) {
      setStatus("Error: " + label + " must be greater than cero");
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

  function handleDeposit() {
    if (!validate(depositAmount, "Deposit amount")) return;
    let newBalance = cBalance + parseInt(depositAmount);
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
              header1="Deposit"
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
                      <Form.Label>Amount to deposit:</Form.Label>
                      <Form.Control
                        type="input"
                        id="deposit-amount"
                        placeholder="Enter amount to deposit"
                        value={depositAmount}
                        onChange={(e) =>
                          setDepositAmount(e.currentTarget.value)
                        }
                      />
                    </Form.Group>
                    <br />
                    <Button
                      type="submit"
                      className="btn btn-secondary"
                      onClick={handleDeposit}
                      disabled={depositAmount === ""}
                    >
                      Perform deposit
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
                      Another deposit
                    </Button>
                    {/* {" "}
                    <Button
                      variant="secondary"
                      onClick={navigate("/dashboard")}
                    >
                      Dashboard
                    </Button> */}
                    <div className="mt-3">
                      <Link to="/withdraw">Withdraw</Link>
                      {" or "}
                      <Link to="/dashboard">Dashboard</Link>
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

export default Deposit;
