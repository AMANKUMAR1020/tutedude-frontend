import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { client } from "../api";
import { Outlet } from "react-router-dom";

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
      console.log(id, count);

      const res = await client.get("/users/mutualusers", {
        params: { id, count: parseInt(count, 10) }, // Ensure count is passed as number
      });

      setFilterUserList(res.data); // Update the state with the filtered users
      console.log(res.data);
    } catch (error) {
      setMsg(error?.response?.data?.message || "An error occurred.");
    }
  };

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
            setCount(e.target.value); // Update the count value on change
            handleFilterUser(e); // Trigger the filtering logic when changed
          }}
        >
          <option className="option" value={count} disabled>
            Select
          </option>
          {ConnectionLength.map((count, index) => (
            <option className="option" value={count} key={index}>
              {count}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filterUserList.length === 0 ? (
          "No Friends found"
        ) : (
          filterUserList.map((user) => (
            <User key={user.id} userId={user.id} username={user.username} />
          ))
        )}
      </div>
      <Outlet />
    </div>
  );
}

export function User({ username, userId }) {
  return (
    <div style={{ display: "flex" }}>
      <p>{username}</p>
    </div>
  );
}
















// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { client } from "../api";
// import { setAllUsers } from "../redux/slices/userSlice";
// import { Outlet } from "react-router-dom";

// export const ConnectionLength = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

// export default function MutualFriends() {
//   const { user, token } = useSelector((state) => state.auth);
//   const [count, setCount] = useState(1);
//   const [filterUserList, setFilterUserList] = useState([]);
//   const [msg, setMsg] = useState("");

//   // console.log(userList);

//   const handleFilterUser = async (e) => {
//     e.preventDefault();
//     try {
//       const id = user.id;
//       console.log(id,count)
//       const res = await client.get("/users/mutualusers", { params: { id, count } });
//       setFilterUserList(res.data); // Use the correct setter to update the state
//       console.log(res.data);
//     } catch (error) {
//       setMsg(error?.response?.data?.message || "An error occurred.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="error">{msg}</div>
//       <h2 className="heading">Mutual Friends</h2>
//       <div className="text">
//         Mutual friends having connection{" "}
//         <select
//           className="select"
//           value={count}
//           onChange={(e) => {
//             setCount(e.target.value);
//             handleFilterUser(e);
//           }}
//         >
//           <option className="option" value={count} disabled>
//             Select
//           </option>
//           {ConnectionLength.map((count, index) => (
//             <option className="option" value={count} key={index}>
//               {count}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         {filterUserList.length === 0 ? (
//           "No Friends found"
//         ) : (
//           filterUserList.map((user) => (
//             <User key={user.id} userId={user.id} username={user.username} />
//           ))
//         )}
//       </div>
//       <Outlet />
//     </div>
//   );
// }

// export function User({ username, userId }) {
//   return (
//     <div style={{ display: "flex" }}>
//       <p>{username}</p>
//     </div>
//   );
// }
















// import { useState,useEffect } from "react";
// import { useSelector } from "react-redux";
// import { client } from "../api";
// import { useDispatch } from "react-redux";
// import { setAllUsers } from "../redux/slices/userSlice";
// import { Outlet } from "react-router-dom";

// export const ConnectionLength = [1,2,4,6,8,10,12,14,16,18,20];

// export default function MutualFriends(){
//   const { user, token } = useSelector((state) => state.auth);
//   const { allUsers } = useSelector((state) => state.user);
// //const dispatch = useDispatch();
//   const [friends, setFriends] = useState(user.friends);
//   const [userList, setUserList] = useState(allUsers);
//   const [count, setCount] = useState(1);
//   const [filterUserList, setFilterUserList] = useState([]);
//   const [msg, setMsg] = useState("");

//   console.log(userList)

//   const handleFilterUser= async (e) =>{
//     e.preventDefault();

//     try {
//         const userId = user._id;
//       await client.get("/users/mutualusers",{userId,count})
//         .then((res) => {
//             filterUserList(res.data)
//             console.log(res.data);
//         });
//     } catch (error) {
//       setMsg(error?.response?.data?.message || "An error occurred.");
//     }
//   }

//   return (<div className="container">
//   <div className="error">{msg}</div>
//   <h2 className="heading">MutualFriends</h2>
//   <div className="text">
//     Mutual friends having connection {
//     <select
//     className="select"
//         value={count}
//         onChange={(e)=>{
//             setCount(e.target.value);
//             handleFilterUser(e);
//         }}
//     >
//         <option className="option" value={count} disabled>select</option>

//         {ConnectionLength.map((count,index)=>
//             <option className="option" value={count} key={index}>{count}</option>
//         )}
//     </select>
//     }</div>

//     <div>
//         {filterUserList.length < 1 ? filterUserList.map((user)=>
//             <User
//                 key={user._id}
//                 userId={user._id}
//                 username={user.username}
//             />
//         ):"No Friends found"}
//     </div>
//     <Outlet/>
//   </div>);
// }

// export function User({ username, userId}) {

//   return (
//     <div style={{ display: "flex" }}>
//       <p>{username}</p>
//     </div>
//   );
// }
