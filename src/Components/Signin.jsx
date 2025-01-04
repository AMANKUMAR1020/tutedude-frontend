import { useState } from "react";
import { useDispatch } from "react-redux";
import { client } from "../api/index";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import "./Style.css";

export const HobbiesTypes = ["Book Reading", "Swimming", "Football", "Music", "Singing", "Dancing"];

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHobbies = (hobby) => {
    const isHobbySelected = hobbies.includes(hobby);
    if (isHobbySelected) {
      setHobbies(hobbies.filter((h) => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
    console.log(hobbies);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || hobbies.length === 0) {
      setMsg("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await client.post("/auth/register", { username, password, hobbies });
      dispatch(loginUser(res.data));
      console.log(res.data);
      // Navigate to dashboard after successful login
      navigate("/auth/dashboard");
    } catch (err) {
      setMsg(err?.response?.data?.message || "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="heading">Signin</h2>
        <text className="text1">Username:</text>
        <input
          className="input1"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <text className="text1">Password:</text>
        <input
          className="input1"
          type="password" // Changed to "password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <text className="text1">Choose you hobbies</text>
        <div className="container-left-horizontal">
          {HobbiesTypes.map((hobby, index) => (
            <HobbiesSelection
              key={index}
              hobby={hobby}
              handleHobbies={handleHobbies}
              isHobbySelected={hobbies.includes(hobby)} // Pass hobby selected state
            />
          ))}
        </div>

        <button onClick={(e)=>{handleSubmit(e)}} className="button" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>

        <text className="text1">Already have account 
            <p onClick={()=>{navigate('/login')}} style={{color:"blue"}}>Login</p> 
        </text>
        {msg && <div>{msg}</div>}
    </div>
  );
}

function HobbiesSelection({ hobby, handleHobbies, isHobbySelected }) {
  const [show, setShow] = useState("none"); // Default hidden

  const toggleDisplay = () => {
    setShow(show === "none" ? "flex" : "none"); // Toggle visibility of "X"
  };

  return (
    <span
      onClick={() => {
        handleHobbies(hobby); // Update hobbies list
        toggleDisplay(); // Toggle "X" visibility
      }}
      style={{ margin: "10px", cursor: "pointer", display:"flex" }}
    >
      {hobby}
      {isHobbySelected && <span style={{ display: show }}>❌</span>} {/* Show "X" if hobby is selected */}
    </span>
  );
}

















// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { client } from "../api/index";
// import { Outlet, useNavigate } from "react-router-dom";
// import { loginUser } from "../redux/slices/authSlice";
// import "./Style.css";


// const Hobbies = ["Book Reading", "Swimming", "Football", "Music", "Singing", "Dancing"];

// export default function Signin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [hobbies, setHobbies] = useState([]);
//   const [loading,setLoading] = useState("");
//   const [msg,setMsg] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleHobbies = (hobby) => {
//     const isHobbySelected = hobbies.includes(hobby);
    
//     if (isHobbySelected) {
//       setHobbies(hobbies.filter((h) => h !== hobby));
//     } else {
//       setHobbies([...hobbies, hobby]);
//     }
//     console.log(hobbies)
//   };

//   const handleSubmit = async (e) =>{
//     e.preventDefault();

//     console.log(username,password,hobbies)

//     if(!username || !password || !hobbies){
//         setMsg("All Feild are required");
//     }

//     setLoading(true);
//     try {
//       const res = await client.post("/users/register", {username,password,hobbies});
//       dispatch(loginUser(res.data));
//       console.log(res.data);
// //      navigate("/dashboard");
//     } catch (err) {
//       setMsg(err?.response?.data?.message);
//     }
//     setLoading(false);
//   }

//   return (
//     <div id="login-form">
//       <h1>Signin</h1>
//       <form>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//           type="current-password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <div>
//           {Hobbies.map((hobby, index) => (
//             <HobbiesSelection
//               key={index}
//               hobby={hobby}
//               handleHobbies={handleHobbies}
//               isHobbySelected={hobbies.includes(hobby)} // Pass hobby selected state
//             />
//           ))}
//         </div>

//         <button onSubmit={()=>{handleSubmit()}}>{loading ? "Loading" : "Submit"} </button>

//         <div>{msg}</div>
//       </form>
//     </div>
//   );
// }

// function HobbiesSelection({ hobby, handleHobbies, isHobbySelected }) {
//   const [show, setShow] = useState("none"); // Default hidden

//   const toggleDisplay = () => {
//     setShow(show === "none" ? "flex" : "none"); // Toggle visibility of "X"
//   };

//   return (
//     <span
//       onClick={() => {
//         handleHobbies(hobby); // Update hobbies list
//         toggleDisplay(); // Toggle "X" visibility
//       }}
//       style={{ margin: "10px", cursor: "pointer" }}
//     >
//       {hobby}
//       {isHobbySelected && <span style={{ display: show }}>X</span>} {/* Show "X" if hobby is selected */}
//     </span>
//   );
// }















// import { useState } from "react";
// import "./Style.css";

// const Hobbies = ["Book Reading", "Swiming", "Football", "Music", "Singing", "Dancing"];
// export default function Signin(){
    
//     const [username,setUsername] = useState("");
//     const [password,setPassword] = useState("");
//     const [hobbies,setHobbies] = useState([]);

//     return(
//     <div id="login-form">
//       <h1>Signin</h1>
//       <form>
//         <label htmlFor="username">Username:</label>
//         <input
//             type="text"
//             value={username}
//             onChange={(e)=>{setUsername(e.target.value)}}
//             required="true"
//         />

//         <label htmlFor="password">Password:</label>
//         <input
//             type="password"
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)}}
//             required="true"
//         />

//         <HobbiesSelection
//             Hobbies={Hobbies}
//             hobbies={hobbies}
//             setHobbies={setHobbies}
//         />
//         <input type="submit" value="Submit" />
//       </form>
//     </div>)
// }



// export function HobbiesSelection({Hobbies,hobbies,setHobbies}){

//     const [show,setShow] = useState("flex")

//     const handleHobbies = ({e,hobby})=>{
//         e.preventDefault();
//         const isHobbies = hobbies.includes(hobby);

//         if(isHobbies){
//             setHobbies([...hobbies.filter((hoby) => hoby !== hobby)])
//             setShow("none")
//         }
//     }

//     return (<div>
//         {Hobbies.map((hobby,index)=>{
//             <span 
//             key={index} 
//             onClick={(e)=>handleHobbies({e,hobby})}>
//                 {}
//             </span>
//         })}
//     </div>)
// }