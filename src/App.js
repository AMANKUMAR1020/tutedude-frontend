// import './App.css';

// function App() {
//   return (<>
//   </>);
// }

// export default App;






import { Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import Dashboard from './pages/Dashboard';

// import AuthLayout from './pages/Profile/AuthLayout';
// import Login from './pages/Profile/Login';
// import Register from './pages/Profile/Register';
// import SongList from './pages/SongList';
// import SongUpload from './pages/Profile/SongUpload';
// import Profile from './pages/Profile/Profile';
// import ArtistesPage from './pages/ArtistesPage';
// import EditProfile from './pages/Profile/EditProfile';
// import ArtistePage from './pages/Users/ArtistePage';
// import PlaylistPage from './pages/PlaylistPage';
// import CreatePlaylist from './pages/Profile/CreatePlaylist';
// import PlaylistId from './pages/Users/PlaylistId';
// import EditPlaylist from './pages/Profile/EditPlaylist';

// import Delete from './pages/Delete';
// import './App.css';
// import Navbar from './pages/Navbar';
import Signin from "./Components/Signin";
import Login from "./Components/Login";
import AuthLayout from './Components/AuthLayout.jsx';
import Dashboard from "./Components/Dashboard"

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Signin />}/>
        <Route path="/login" element={<Login />} />

        <Route path='/auth' element={<AuthLayout/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>


        {/* <Route path='/dash' element={<Dashboard/>}/>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />}/>
        </Route>

        <Route path="/profile" element={<Profile />}/>
        <Route path="/createsong" element={<SongUpload />}/>
        <Route path="/createplaylist" element={<CreatePlaylist/>}/>
        <Route path="/editplaylist/:id" element={<EditPlaylist/>}/>
        <Route path="/edit" element={<EditProfile />}/>

        <Route path='/artistes' element={<ArtistesPage />}/>
        <Route path='/artistes/:id' element={<ArtistePage />}/>
        
        <Route path='/playlist' element={<PlaylistPage/>}/>
        <Route path='/playlist/:id' element={<PlaylistId/>}/> */}

      </Routes>
    </>
  );
}
