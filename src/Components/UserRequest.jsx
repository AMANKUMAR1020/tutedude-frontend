import { client } from "../api";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserRequest() {
  const { allUsers } = useSelector((state) => state.user);
  const { user, token } = useSelector((state) => state.auth);
  const [friendsRequestList, setFriendsRequestList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (user.friendsRequest !== null && allUsers) {
      const filteredRequests = allUsers.filter((userlist) => user.friendsRequest.includes(userlist.id));
      setFriendsRequestList(filteredRequests);
    }
  }, [user, allUsers]);

  const requestSend = async ({ e, reqId, path }) => {
    e.preventDefault();
      try {
          const myId = user.id;
          // console.log(myId, reqId, path)
          const response = await client.put(`/users/${path}`,{ myId, reqId },{headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json",},});
          console.log(response.data);
      } catch (error) {
          setMsg(error?.response?.data?.message || "An error occurred.");
      }
  };

  return (
    <div className="container-left">
      <div className="error">{msg}</div>

      {user.friendsRequest > 0 && friendsRequestList.length > 0 ? (
        friendsRequestList.map((friend) => (
          <FriendsRequest
            key={friend.id}
            username={friend.username}
            reqId={friend.id}
            requestSend={requestSend}
          />))) : (
        "No Friend Requests Found"
      )}
      <Outlet />
    </div>
  );
}

export function FriendsRequest({ username, reqId, requestSend }) {
  const [show, setShow] = useState("flex");

  return (
    <div className="userBox-flat" style={{ display: show }}>
        <p>{username}</p>
        
        <p  onClick={(e) => {
            requestSend({ e, reqId, path: "acceptuser" });
            setShow("none");
          }}
        >
          ✔
        </p>
        
        <p onClick={(e) => {
            requestSend({ e, reqId, path: "rejectuser" });
            setShow("none");
          }}
        >
          ❌
        </p>
    </div>
  );
}