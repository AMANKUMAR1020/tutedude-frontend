import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { client } from "../api";
import { setFriendsRequest,setUserFriends } from "../redux/slices/authSlice";

export default function UserRequest() {
  const { user, token } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const [friendsRequestList, setFriendsRequestList] = useState([]);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && allUsers) {
      const filteredRequests = allUsers.filter((userlist) => user.friendsRequest.includes(userlist.id));
      setFriendsRequestList(filteredRequests);
      // console.log(Array.isArray(user.friendsRequest),user.friendsRequest);

      // if (Array.isArray(user.friendsRequest)) {
      //   const filteredRequests = allUsers.filter((userlist) => 
      //     user.friendsRequest.includes(userlist.id)
      //   );
      //   setFriendsRequestList(filteredRequests);
      // } else {
      //   setFriendsRequestList([]); // Reset if friendsRequest is not an array
      // }
    }
  }, [user, allUsers]);

  const requestSend = async ({ e, reqId, path }) => {
    e.preventDefault();
    try {
      const myId = user.id;
      console.log(myId, reqId, path)
      const response = await client.put(`/users/${path}`,{ myId, reqId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",},
        });
        if(path === "acceptuser"){
            dispatch(setUserFriends(response.data.friends))
        }
        dispatch(setFriendsRequest(response.data.friendsRequest))

      console.log(response.data);
    } catch (error) {
      setMsg(error?.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container-left">
      <div className="error">{msg}</div>
      {friendsRequestList.length > 0 ? (
        friendsRequestList.map((friend) => (
          <FriendsRequest
            key={friend.id}
            username={friend.username}
            reqId={friend.id}
            requestSend={requestSend}
          />
        ))
      ) : (
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
      <p
        onClick={(e) => {
          requestSend({ e, reqId, path: "acceptuser" });
          setShow("none");
        }}
      >
        ✔
      </p>
      <p
        onClick={(e) => {
          requestSend({ e, reqId, path: "rejectuser" });
          setShow("none");
        }}
      >
        ❌
      </p>
    </div>
  );
}
















// import { Outlet } from "react-router-dom";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { client } from "../api";

// export default function UserRequest() {
//   const { user, token } = useSelector((state) => state.auth);
//   const { allUsers } = useSelector((state) => state.user);
//   const [msg, setMsg] = useState("");

//   const [friendsRequestList, setFriendsRequestList] = useState(
//     [allUsers.filter((userlist)=> user.friendsRequest.includes(userlist.id))]);

//   const requestSend = async ({ e, reqId, path }) => {
//     e.preventDefault();
//     try {
//       const userId = user.id;
//       await client.post(`/user/${path}`,{ userId, reqId },{
//             headers: {Authorization: `Bearer ${token}`,"Content-Type": "application/json",},
//           })
//         .then((res) => {
//           console.log(res.data);
//         });
//     } catch (error) {
//       setMsg(error?.response?.data?.message || "An error occurred.");
//     }
//   };
//   console.log("friendsRequestList",friendsRequestList)

//   return (
//     <div className="container-left">
//       <div>{msg}</div>
//       {friendsRequestList.length > 0 ? (
//         friendsRequestList.map((friend) => (
//           <FriendsRequest
//             key={friend.id}
//             username={friend.username}
//             reqId={friend.id}
//             requestSend={requestSend}
//           />
//         ))
//       ) : (
//         "No Friends found"
//       )}
//       <Outlet />
//     </div>
//   );
// }

// export function FriendsRequest({ username, reqId, requestSend }) {
//   const [show, setShow] = useState("flex");

//   return (
//     <div style={{ display: show }}>
//       <p>{username}</p>
//       <p  onClick={(e) => {
//           requestSend({ e, reqId, path: "acceptuser" });
//           setShow("none");}}
//           >✔</p>
//       <p
//         onClick={(e) => {
//         requestSend({ e, reqId, path: "rejectuser" });
//         setShow("none");
//         }}
//         >❌</p>
//     </div>
//   );
// }












// import { useState } from "react";
// import { useSelector } from "react-redux"
// import { client } from "../api";

// export default function UserRequest(){
//     const {user, token} = useSelector((state)=>state.auth);

//     const [friendsRequest,setFriendsRequest] = useState([user.friendsRequest]);
//     const [msg, setMsg] = useState("");

//     const requestSend = async ({e, reqId, path})=>{
//         e.preventdefault();
//         try {
//               const userId = user._id;
//               await client.post(`/user/${path}`,{userId,reqId,},
//                 {
//                     headers: {
//                       Authorization: `Bearer ${token}`,
//                       "Content-Type": "application/json",
//                     },
//                 }).then((res) => {
//                   console.log(res.data);
//                 });
//             } catch (error) {
//               setMsg(error?.response?.data?.message || "An error occurred.");
//             }
//     }

//     return(<>
//         <div>{msg}</div>
//         {friendsRequest.length >0 ?
//         friendsRequest.map((user)=>{
//             <FriendsRequest
//                 key={user._id}
//                 username={user.username}
//                 reqId={user._id}
//                 requestSend={requestSend}
//             />
//         })
//         :"No favirate is found"}
//     </>)
// }


// export function FriendsRequest({ username, reqId, sendRequest }){
//     const [show,setSend] = useState("flex");

//     return(<div style={{display:show}}>
//         <p>{username}</p>
//         <p onClick={(e)=>{sendRequest({e,reqId,"acceptuser"});
//                         setSend("none");
//                     }}>✔</p>
//         <p onClick={(e)=>{sendRequest({e,reqId,"rejectuser"});
//                         setSend("none");
//                     }}>❌</p>
//     </div>)
// }