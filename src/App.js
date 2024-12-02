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
import ForgotPassword from './pages/ForgotPassword';
import ViewInfoUsers from './pages/ViewInfoUsers';
import Report from './admin/Report';
import ManaPost from './admin/ManaPost';
import ManaComment from './admin/ManaComment';
import SuccessReport from './pages/SuccessReport';
import ChangePassword from './pages/ChangePassword';
import ResetPassword from './pages/ResetPassword';
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
        <Route path='/viewInformation/:uid' element={<ViewInfoUsers/>}/>
        <Route path='*' element={<ErrorPage/>}/>

        {/* UI USER */}
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/mypost/:uid' element={<MyPost/>}/>
        <Route path='/myfavorite/:uid' element={<MyFavorite/>}/>
        <Route path='/profile/:uid' element={<Profile/>}/>     
        <Route path='/updateProfile/:uid' element={<UpdateProfile/>}/>
        <Route path='/follower/:uid' element={<FollowerPost/>}/>
        <Route path='/successReport' element={<SuccessReport/>}/>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />

        {/* UI ADMIN */}
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/report' element={<Report/>}/>
        <Route path='/manaAccount' element={<ManaAccount/>}/>
        <Route path='/manaCategory' element={<ManaCategory/>}/>
        <Route path='/manaPost' element={<ManaPost/>}/>
        <Route path='/manaComment' element={<ManaComment/>}/>
        <Route path='/report' element={<Report/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
