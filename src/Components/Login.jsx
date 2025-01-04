
import { useState } from "react";
import { useDispatch } from "react-redux";
import { client } from "../api/index";
import { Outlet, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import "./Style.css";

export default function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMsg("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await client.post("/auth/login", { username, password });
      dispatch(loginUser(res.data));
      console.log(res.data);
      // Navigate to dashboard after successful login
      navigate("/auth");
    } catch (err) {
      setMsg(err?.response?.data?.message || "An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
        <text className="text1" style={{marginTop:"55px"}}>Username:</text>
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

        <button className="button" onClick={(e)=>{handleSubmit(e)}} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>

        {msg && <div className="error">{msg}</div>}

        <div className="text1">Create New account 
            <p onClick={()=>{navigate('/')}} style={{color:"blue"}}>Signin</p> 
        </div>
    </div>
  );
}