import { useState } from "react";
import { useSelector } from "react-redux";
import { HobbiesTypes } from "./Signin";
import { Outlet } from "react-router-dom";

export default function Hobbies() {
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [hobby, setHobby] = useState("Book Reading");
  const [filterUserList, setFilterUserList] = useState([]);
  const [msg, setMsg] = useState("");

  const handleFilterUser = (e) => {
    e.preventDefault();
    const filteredUsers = allUsers.filter((userlist) => userlist.hobbies.includes(hobby) && user.friends.includes(userlist.id));
    setFilterUserList(filteredUsers);
  };

  console.log(filterUserList)

  return (
    <div className="container">
      <div className="error">{msg}</div>
      <h2 className="heading">Hobbies</h2>

      <div className="text">
        Friends based on their{" "}
        <select
          className="select"
          value={hobby}
          onChange={(e) => {
            setHobby(e.target.value);
            handleFilterUser(e);
          }}
        >
          <option className="option" value={hobby}>
            Select Hobby
          </option>

          {HobbiesTypes.map((hoby, index) => (
            <option key={index} className="option" value={hoby}>
              {hoby}
            </option>)
          )}
  
        </select>
  
        <div style={{display:"flex", placeContent:"center", margin:"10px"}}>
          <text className="text">{hobby}</text>
        </div>
  
      </div>

      <div>
        {filterUserList.length > 0 ? (
          filterUserList.map((user) => (
            <User key={user._id} userId={user._id} username={user.username} />
          ))
        ) : (
          <p>No friends found</p>
        )}
      </div>
  
      <Outlet />
    </div>
  );
}

export function User({ username, userId }) {
  return (<div className="userBox">
        <div className="userBox-img">
          😀
          {/* <img src={emogi}alt={username}/> */}
        </div>      
        <div className="userBox-username-and-request">
          <text>{username}</text>
        </div>
    </div>);
}