import { Outlet, useNavigate } from "react-router-dom";
import { setAllUsers } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { client } from "../api";

const AuthLayout = () => {
  const { user } = useSelector((state) => state.auth); // Ensure user state is correctly managed
  const { allUsers } = useSelector((state) => state.user); // Extract allUsers from Redux state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Log the user to check if it's available
  console.log(user);

  useEffect(() => {
    if (!user) {
      // If user is not logged in, redirect to the home page
      navigate("/");
    } else {
      if (!allUsers || allUsers.length < 1) {
        // If allUsers is undefined or has no data, fetch the users
        const fetchUsers = async () => {
          try {
            const data = await client.get("/users/allUsers");
            console.log(data.data);
            dispatch(setAllUsers(data.data)); // Dispatch action to store users
          } catch (error) {
            console.error("Error fetching users:", error);
          }
        };
        fetchUsers();
      }
      navigate("/auth/dashboard"); // Navigate to dashboard if the user is logged in
    }
  }, [user, allUsers, navigate, dispatch]); // Dependency array includes all required dependencies

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AuthLayout;












// import { Outlet, useNavigate } from "react-router-dom";
// import { setAllUsers } from "../redux/slices/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { client } from "../api";
// const AuthLayout = () => {
//   const { user } = useSelector((state) => state.auth); // Ensure user state is correctly managed
//   const { allUsers } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   console.log(user)

//   useEffect(() => {
//   }, []);
  

//   useEffect(() => {
//     if (user) {
//           if (allUsers.length < 1) {
//             const fetchUsers = async () => {
//             const data = await client.get("/users/allUsers");
//            console.log(data.data);
//             dispatch(setAllUsers(data.data));
//           };
//           fetchUsers();
//         }
//       navigate("/auth/dashboard"); // Redirect to home or login if user is not authenticated
//     }else{
// 		navigate("/")
// 	}
//   }, [user, navigate]); // Ensure navigate is updated on user changes

//   return (
//     <main>
//       <Outlet />
//     </main>
//   );
// };

// export default AuthLayout;















// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// const AuthLayout = () => {
// 	const { user } = useSelector((state) => state.auth);
// 	const navigate = useNavigate();

// 	// useEffect(() => {
// 	// 	window.scrollTo(0, 0);
// 	// }, [pathname]);

// 	useEffect(() => {
// 		if (!user) {
// 			navigate("/");
// 			console.log("login done ",`${user.username}`)
// 		}
// 	}, [user]);
	
// 	return (
// 		<main>
//             <Outlet />
// 			{/* {currentTrack && <MusicPlayer />} */}
// 		</main>
// 	);
// };

// export default AuthLayout;
