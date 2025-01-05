import { useEffect } from "react";
import { client } from "../api";
import { Outlet, useNavigate } from "react-router-dom";
import { setAllUsers } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const AuthLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
        navigate("/");
    
      } else {
      if (!allUsers || allUsers.length < 1) {

          const fetchUsers = async () => {
          try {
              const data = await client.get("/users/allUsers");
              console.log(data.data);
              dispatch(setAllUsers(data.data));

          }catch (error) {
              console.error("Error fetching users:", error);
          }};

        fetchUsers();
      }
      navigate("/auth/dashboard");
    }
  }, [user, allUsers, navigate, dispatch]);

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;