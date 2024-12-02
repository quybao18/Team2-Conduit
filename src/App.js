import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailPost from './pages/DetailPost';
import Login from './pages/Login';
import MyPost from './pages/MyPost';
import NewPost from './pages/NewPost';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile';
import ErrorPage from './components/ErrorPage';
import MyFavorite from './pages/MyFavorite';
import Setting from './admin/Dashboad';
import ManaAccount from './admin/ManaAccount';
import ManaCategory from './admin/ManaCategory';
import UpdateRole from './admin/UpdateRole';
import FollowerPost from './pages/FollowerPost';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

        {/* UI COMMON */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:pid' element={<DetailPost/>}/> 
        <Route path='*' element={<ErrorPage/>}/>

        {/* UI USER */}
        <Route path='/:uid' element={<Home/>}/>
        <Route path='/mypost/:uid' element={<MyPost/>}/>
        <Route path='/myfavorite/:uid' element={<MyFavorite/>}/>
        <Route path='/profile/:uid' element={<Profile/>}/>     
        <Route path='/updateProfile/:uid' element={<UpdateProfile/>}/>
        <Route path='/follower/:uid' element={<FollowerPost/>}/>

        {/* UI ADMIN */}
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/manaAccount' element={<ManaAccount/>}/>
        <Route path='/manaCategory' element={<ManaCategory/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
