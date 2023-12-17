// React
import { createContext, useState } from "react";
// React Context
const UserContext = createContext();

export function UserProvider({ children }) {
  const [allUsers, setAllUsers] = useState([]);
  const [uid, setUid] = useState("");
  const [userC, setUserC] = useState({});

  const addUserC = (userCPar) => {
    setUserC(userCPar);
  };

  const addAllUsers = (allUsersPar) => {
    // setAllUsers((prevState) => [...prevState, { uid, name, email, password, balance }]);
    setAllUsers(allUsersPar);
  }

  return (
    <UserContext.Provider value={{userC, addUserC, allUsers, addAllUsers}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;