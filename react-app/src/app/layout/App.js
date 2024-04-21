import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import BlogPage from './BlogPage';
import ArticleForm from './ArticleForm';
import Navbar from './Navbar';
import ArticlePage from './ArticlePage';

function App() {
  return (
    <Routes>
      <Route path='/' Component={HomePage} />
      <Route path='/blog' Component={BlogPage} />
      <Route path='/ArticleForm' Component={ArticleForm} />
      <Route path="/article/:id" Component={ArticlePage} />
    </Routes>
  );
}

export default App;
