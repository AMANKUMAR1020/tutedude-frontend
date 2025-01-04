import { useDispatch, useSelector } from "react-redux";
import Search from "./Search.jsx";
import MutaulFriends from "./MutualFriends";
import Hobbies from "./Hobbies";
import UserRequest from "./UserRequest.jsx";
import { logoutUser } from "../redux/slices/authSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)

  return (
    <div>
      <Navbar />
      <div className="center">
        {user && 
        <div>
          <Search />
          <MutaulFriends />
          <Hobbies />
        </div>}
      </div>
    </div>
  );
};

export default Dashboard;

export function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [inbox, setInbox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  const toggleInbox = () => {
    setInbox((prevInbox) => !prevInbox);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div className="img">
            😊 {/* You can add an image here if needed */}
            <text className="text">{user?.username || "Guest"}</text>
          </div>
          <div onClick={handleLogout} className="logout">
            <text>♦</text>
            <text>Logout</text>
          </div>
        </div>

        <div>
          <text onClick={toggleInbox} className="img">
            📥
          </text>
          {inbox && <UserRequest />} {/* Render UserRequest only when inbox is true */}
        </div>
      </div>

      <Outlet />
    </>
  );
}

















// import { useDispatch, useSelector } from "react-redux";
// import Search from "./Search.jsx";
// import MutaulFriends from "./MutualFriends";
// import Hobbies from "./Hobbies";
// import UserRequest from "./UserRequest.jsx";
// import { logoutUser } from "../redux/slices/authSlice";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Dashboard = () => {
//     return (
//         <div>
//             <Navbar />
//             <div className="center">
//                 <div>
//                     <Search />
//                     {/* <MutaulFriends /> */}
//                     <Hobbies />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// export function Navbar() {
//     const { user } = useSelector((state) => state.auth);
//     const [inbox, setInbox] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = (e) => {
//         e.preventDefault();
//         dispatch(logoutUser());
//         navigate('/');
//     };

//     const toggleInbox = () => {
//         setInbox(prevInbox => !prevInbox);
//     };

//     return (
//         <>
//             <div className="navbar">
//                 <div className="navbar-left">
//                     <div className="img">
//                         😊{/* You can add an image here if needed */}
//                         <text className="text">{user?.username}</text>
//                     </div>
//                     <div onClick={handleLogout} className="logout">
//                         <text>♦</text>
//                         <text>Logout</text>
//                     </div>
//                 </div>

//                 <div>
//                     <text
//                         onClick={toggleInbox}
//                         className="img"
//                     >
//                         📥
//                     </text>
//                     {inbox && <UserRequest />}
//                 </div>
//             </div>

//             <Outlet />
//         </>
//     );
// }












// import { useDispatch, useSelector } from "react-redux";
// import Search from "./Search.jsx";
// import MutaulFriends from "./MutualFriends";
// import Hobbies from "./Hobbies";
// import UserRequest from "./UserRequest.jsx";
// import { logoutUser } from "../redux/slices/authSlice";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Dashboard = () => {
            
//     return (<div>
//             <Navbar />
//             <div className="center">
//                 <div>
//                     <Search />
//                     <MutaulFriends />
//                     <Hobbies />
//                 </div>
//             </div>
//     </div>);
// };

// export default Dashboard; 


// export function Navbar() {
//   const { user } = useSelector((state) => state.auth);
//   const [inbox,setInbox] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = (e) => {
//     e.preventDefault();
    
//     dispatch(logoutUser());
//     navigate('/');
//   };

//   return (
//     <>
//       <div className="navbar">
//         <div className="navbar-left">
//             <div className="img">
//                 😊{/* <img src={emogi}alt={username}/> */}
//                 <text className="text">{user?.username}</text>
//             </div>
//             <div onClick={(e)=>{handleLogout(e)}} className="logout">
//                 <text>♦</text>
//                 <text>Logout</text>
//             </div>
//         </div>
//         <div>
//             <text 
//                 onClick={()=>{setInbox((inbox)=>!inbox)}} 
//                 className="img">📥</text>
//             {inbox && <UserRequest/>}
//         </div>

//       </div>
//       <Outlet />
//     </>
//   );
// }











// import { useDispatch, useSelector } from "react-redux";
// import Search from "./Search";
// import MutaulFriends from "./MutualFriends";
// import Hobbies from "./Hobbies";
// import { logoutUser } from "../redux/slices/authSlice";
// import { Outlet, useNavigate } from "react-router-dom";

// export default function DashBoard(){
//     return(<>
//         {/* <Navbar/> */}
//         <Search/>
//         <MutaulFriends/>
//         <Hobbies/>
//     </>)
// }

// // export function Navbar(){
// //     const { user } = useSelector((state) => state.auth);
// //     const dispatch = useDispatch();
// //     const navigate = useNavigate();

// //     const handleLogout = (e)=>{
// //         e.preventDefault();
// //         dispatch(logoutUser());
// //         navigate('/');
// //     }
// //     return(<>
// //             <div>
// //                 <p>😊</p>
// //                 <strong>{user.username}</strong>
// //                 <p onClick={()=>{handleLogout()}}>Logout</p>
// //             </div>
// //         <Outlet/>
// //     </>)
// // }