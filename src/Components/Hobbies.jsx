import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { client } from "../api";
import { setAllUsers } from "../redux/slices/userSlice";
import { HobbiesTypes } from "./Signin";
import { Outlet } from "react-router-dom";

export default function Hobbies() {
  const { user, token } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [friends, setFriends] = useState(user.friends);
  const [userList, setUserList] = useState(allUsers);
  const [hobby, setHobby] = useState("Book Reading");
  const [filterUserList, setFilterUserList] = useState([]);
  const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   if (allUsers.length > 0) {
  //     setUserList(allUsers);
  //   }else {
  //     const fetchUsers = async () => {
  //       try {
  //         const data = await client.get("/users/allUsers", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           }});
  //         dispatch(setAllUsers(data.data)); // Dispatching the data to Redux
  //         setUserList(data.data); // Optionally set it to local state as well
  //       } catch (error) {
  //         console.error("Error fetching users:", error);
  //         setMsg("Failed to load users");
  //       }
  //     };
  //     fetchUsers();
  //   }
  // }, [user, allUsers, dispatch, token]);

  const handleFilterUser = (e) => {
    e.preventDefault();

    // Ensure hobby is not undefined and filter properly
    const filteredUsers = userList.filter((userlist) =>
      userlist.hobbies.includes(hobby) && user.friends.includes(userlist.id)
    );
    setFilterUserList(filteredUsers);
  };

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
            <option className="option" value={hoby} key={index}>
              {hoby}
            </option>
          ))}
        </select>
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
  return (
    <div style={{ display: "flex" }}>
      <p>{username}</p>
    </div>
  );
}














// import { useState,useEffect } from "react";
// import { useSelector } from "react-redux";
// import { client } from "../api";
// import { useDispatch } from "react-redux";
// import { setAllUsers } from "../redux/slices/userSlice";
// import { HobbiesTypes } from "./Signin";
// import { Outlet } from "react-router-dom";

// export default function Hobbies(){
//   const { user, token } = useSelector((state) => state.auth);
//   const { allUsers } = useSelector((state) => state.user);
// //   const dispatch = useDispatch();
//   const [friends, setFriends] = useState(user.friends);
//   const [userList, setUserList] = useState(allUsers);
//   const [hobby, setHobby] = useState("Book Reading");
//   const [filterUserList, setFilterUserList] = useState([]);
//   const [msg, setMsg] = useState("");

//   console.log(userList)

//   const handleFilterUser=(e)=>{
//     e.preventDefault();
//     setFilterUserList([...userList.map((userlist)=>
//         userlist.hobbies.includes(hobby) && user.friends.find(userlist._id)
//     )])
//   }

//   return (<div className="container">
//     <div className="error">{msg}</div>
//   <h2 className="heading">Hobbies</h2>
//   <div className="text">
//     Friends based on their 
//     {
//     <select
//       className="select"
//         value={hobby}
//         onChange={(e)=>{
//             setHobby(e.target.value);
//             handleFilterUser(e);
//         }}
//     >
//         <option className="option" value={hobby} disabled >select</option>
//         {HobbiesTypes.map((hoby,index)=>
//             <option className="option" value={hoby} key={index}>{hoby}</option>
//         )}
//     </select>
//     } hobbies</div>

//     <div>
//         {filterUserList < 1 ? filterUserList.map((user)=>
//             <User
//                 key={user._id}
//                 userId={user._id}
//                 username={user.username}
//             />
//         ) : "No friends found"}
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
