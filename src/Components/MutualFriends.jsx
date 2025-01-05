import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { client } from "../api";

export const ConnectionLength = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

export default function MutualFriends() {
  const { user } = useSelector((state) => state.auth);
  const [count, setCount] = useState(1);
  const [filterUserList, setFilterUserList] = useState([]);
  const [msg, setMsg] = useState("");

  const handleFilterUser = async (e) => {
    e.preventDefault();
    try {
      const id = user.id;
//    console.log(id, count);
      const res = await client.get("/users/mutualusers", {params: { id, count: parseInt(count, 10) },});
      setFilterUserList(res.data.user);
      console.log(res.data);
    } catch (error) {
      setMsg(error?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(()=>{

  },[filterUserList,setFilterUserList])

  return (
    <div className="container">
      <div className="error">{msg}</div>
      <h2 className="heading">Mutual Friends</h2>
      <div className="text">
        Mutual friends having connection{" "}
        <select
          className="select"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
            handleFilterUser(e);
          }}
        >
          <option className="option" value={count} disabled>
            Select
          </option>

          {ConnectionLength.map((count, index) => (
            <option className="option" value={count} key={index}>
              {count}
            </option>)
          )}

        </select>

      </div>

      <div style={{display:"flex", placeContent:"center", margin:"10px"}}>
          <text className="text">{count}</text>
      </div>

      <div>
        {filterUserList.length === 0 ? (  "No Friends found"
        ) : (
        filterUserList.map((user) => (
          <User key={user.id} userId={user.id} username={user.username} />))
        )}

      </div>
      <Outlet />
    </div>
  );
}

export function User({ username, userId }) {
  return (
    <div className="userBox">
      <div className="userBox-img">
        😀
        {/* <img src={emogi}alt={username}/> */}
      </div>      
      <div className="userBox-username-and-request">
        <text>{username}</text>
      </div>
    </div>
  );
}
