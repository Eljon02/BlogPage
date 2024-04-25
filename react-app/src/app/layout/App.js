import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import BlogPage from './BlogPage';
// import ArticleForm from './ArticleForm';
import ArticlePage from './ArticlePage';
import CategoryComponents from './CategoryComponents';
import AdminPage from '../admin/AdminPage';
import ArticleDashboard from '../../features/articles/dashboard/ArticleDashboard';
import ArticleFormNew from "../../features/articles/form/ArticleFormNew.jsx";
import SearchResultPage from './SearchResultPage';
import SignInForm from './SignInForm';
import LogInForm from './LogInForm';
import Navbar from './Navbar';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      {/* <Route path="/ArticleForm" Component={ArticleForm} /> */}
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/admin/articles" element={<ArticleDashboard />} />
      <Route path="/admin/articles/add" element={<ArticleFormNew />} />
      <Route path="/admin/articles/edit/:articleId" element={<ArticleFormNew />} />
      <Route path="/CategoryComponents" element={<CategoryComponents />} />
      <Route path="/search" element={<SearchResultPage />} />
      <Route path="/SignInForm" element={<SignInForm />} />
      <Route path="/LogInForm" element={<LogInForm />} />
      {/* Pass history prop to Navbar */}
      <Route path="*" element={<Navbar />} />
    </Routes>
  );
}

export default App;