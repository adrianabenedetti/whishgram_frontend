import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route path='/Signup' element={<Signup/>} />
      <Route path='/Login' element={<Login/>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
