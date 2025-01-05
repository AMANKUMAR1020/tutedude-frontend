import { useState, useEffect } from "react";
import Hobbies from "./Hobbies";
import Search from "./Search.jsx";
import MutaulFriends from "./MutualFriends";
import UserRequest from "./UserRequest.jsx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/authSlice";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)

  return (<div>
            <Navbar />
            <div className="center">
              {user && 
                <div>
                  <Search />
                  <Hobbies />
                  <MutaulFriends />
                </div>
              }
            </div>
    </div>);
};

export default Dashboard;






export function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [inbox, setInbox] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {navigate("/");}
  }, [user, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    navigate("/");
  };

  const toggleInbox = () => { setInbox((prevInbox) => !prevInbox);};

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <div className="img">
            😊 {/* You can add an image here if needed */}
            <text className="text">{user?.username || "Guest"}</text>
          </div>
          <div onClick={handleLogout} className="logout">
            <text>⛩</text>
            <text>Logout</text>
          </div>
        </div>
        <div>
          <text onClick={toggleInbox} className="img">
            📥
          </text>
          {inbox && <UserRequest />}
        </div>
      </div>
      <Outlet />
    </>
  );
}