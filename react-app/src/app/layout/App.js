import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import BlogPage from './BlogPage';
import ArticleForm from './ArticleForm';
import ArticlePage from './ArticlePage';
import CategoryComponents from './CategoryComponents';

function App() {
  return (
    <Routes>
      <Route path='/' Component={HomePage} />
      <Route path='/blog' Component={BlogPage} />
      <Route path='/ArticleForm' Component={ArticleForm} />
      <Route path="/article/:id" Component={ArticlePage} />
      <Route path="/CategoryComponents" Component={CategoryComponents} />
    </Routes>
  );
}

export default App;
