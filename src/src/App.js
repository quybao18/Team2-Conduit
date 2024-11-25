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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/mypost/:mpid' element={<MyPost/>}/>
        <Route path='/post/:pid' element={<DetailPost/>}/>   
        <Route path='/favorite/:uid' element={<MyFavorite/>}/>
        <Route path='/profile/:uid' element={<Profile/>}/>     
        <Route path='/updateProfile/:uid' element={<UpdateProfile/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
