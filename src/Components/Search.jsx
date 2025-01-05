import { useEffect, useState } from "react";
import { client } from "../api";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../redux/slices/userSlice";

export default function Search() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [findUser, setFindUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [filterUserList, setFilterUserList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (userList.length < 1) {
        const fetchUsers = async () => {
          const data = await client.get("/users/allUsers");
          console.log(data.data);
          dispatch(setAllUsers(data.data));
          setUserList(data.data);
        };
      fetchUsers();
    }
    setMsg("")
  }, [userList, dispatch]);

  useEffect(() => {
    if (findUser.trim() !== "") {
      const filteredUsers = userList.filter((u) => 
        u.username.toLowerCase().includes(findUser.toLowerCase()) && !user.friends.includes(u.id));
      setFilterUserList(filteredUsers);
    }
  }, [findUser, userList]);
  
  console.log(filterUserList)

  const sendRequest = async ({ e, reqId }) => {
    e.preventDefault();
    try {
      const myId = user.id;
//      console.log(myId,user.username," and ", reqId);
          await client.post("/users/requestuser",{myId,reqId},{headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},})
          .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      setMsg(error?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <div className="error">{msg}</div>
      <h2 className="heading">Search</h2>

      <input
        className="search"
        type="text"
        value={findUser}
        onChange={(e) => setFindUser(e.target.value)}
        placeholder="Search users"
      />

      <div>
        {filterUserList.map((user) => (
          <User
            key={user.id}
            username={user.username}
            reqId={user.id}
            sendRequest={sendRequest}
          />))}
      </div>

      <Outlet/>
    </div>
  );
}

export function User({ username, reqId, sendRequest }) {
  const [send, setSend] = useState("flex");

  return (
    <div className="userBox">
      
      <div className="userBox-img">
        😀
        {/* <img src={emogi}alt={username}/> */}
      </div>
      
      <div className="userBox-username-and-request">
        <text>{username}</text>
          <p
            onClick={(e) => { sendRequest({ e, reqId });
            setSend("none");}}
            style={{ display: send }}>
            ✔
          </p>
      </div>
    </div>
  );
}