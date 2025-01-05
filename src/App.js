import Signin from "./Components/Signin";
import Login from "./Components/Login";
import AuthLayout from './Components/AuthLayout.jsx';
import Dashboard from "./Components/Dashboard"
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Signin />}/>
        <Route path="/login" element={<Login />} />

        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
      </Routes>
    </>
  );
}
