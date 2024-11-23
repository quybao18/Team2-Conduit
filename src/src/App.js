import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailPost from './pages/DetailPost';
import Login from './pages/Login';
import MyPost from './pages/MyPost';
import NewPost from './pages/NewPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/mypost/:mpid' element={<MyPost/>}/>
        <Route path='/newpost' element={<NewPost/>}/>
        <Route path='/post/:pid' element={<DetailPost/>}/>
        
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
