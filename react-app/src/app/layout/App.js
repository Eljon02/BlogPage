import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import BlogPage from './BlogPage';
import Navbar from './Navbar';

function App() {
  return (
    <Routes>
      <Route path='/' Component={HomePage} />
      <Route path='/blog' Component={BlogPage} />
    </Routes>
  );
}

export default App;
