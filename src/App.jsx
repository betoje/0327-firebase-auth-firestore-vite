import "./App.css";
// React-Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// React Context
import { UserProvider } from "./UserContext";
// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Reset from "./components/Reset";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import NavBar from "./components/NavBar";
import Alldata from "./components/AllData";
import Withdraw from "./components/Withdraw";

function App() {
  return (
    <div className="app">
      <UserProvider>
        <Router>
          {/* <NavBar></NavBar> */}
          <Routes>
            <Route exact path="/navbar" element={<NavBar />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/deposit" element={<Deposit />} />
            <Route exact path="/withdraw" element={<Withdraw />} />
            <Route exact path="/alldata" element={<Alldata />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
