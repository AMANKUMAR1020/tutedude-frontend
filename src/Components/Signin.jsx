import { useState } from "react";
import { client } from "../api/index";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
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

    if (!username || !password || hobbies.length === 0) {setMsg("All fields are required.");
      return;
    }

    setLoading(true);
      try {
          const res = await client.post("/auth/register", { username, password, hobbies });
          dispatch(loginUser(res.data));
          console.log(res.data);
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
          type="password"
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
              isHobbySelected={hobbies.includes(hobby)}
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
 
        <Outlet/>
    </div>
  );
}

function HobbiesSelection({ hobby, handleHobbies, isHobbySelected }) {
  const [show, setShow] = useState("none");
  const toggleDisplay = () => { setShow(show === "none" ? "flex" : "none");};

  return (
    <span
      onClick={() => {
        handleHobbies(hobby);
        toggleDisplay();
      }}
      style={{ margin: "10px", cursor: "pointer", display:"flex" }}
    >
      {hobby}
      {isHobbySelected && <span style={{ display: show }}>❌</span>}
    </span>
  );
}