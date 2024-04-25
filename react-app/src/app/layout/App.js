import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import BlogPage from './BlogPage';
// import ArticleForm from './ArticleForm';
import ArticlePage from './ArticlePage';
import AdminPage from '../admin/AdminPage';
import ArticleDashboard from '../../features/articles/dashboard/ArticleDashboard';
import ArticleFormNew from "../../features/articles/form/ArticleFormNew.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />
      <Route path="/blog" Component={BlogPage} />
      {/* <Route path="/ArticleForm" Component={ArticleForm} /> */}
      <Route path="/article/:id" Component={ArticlePage} />
      <Route path="/admin/articles" Component={ArticleDashboard} />
      <Route path="/admin/articles/add" Component={ArticleFormNew} />
      <Route path="/admin/articles/edit/:articleId" Component={ArticleFormNew} />
    </Routes>
  );
}

export default App;
