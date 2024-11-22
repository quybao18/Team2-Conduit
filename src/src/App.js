import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DetailPost from './pages/DetailPost';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:pid' element={<DetailPost/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
