import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./HomePage";
import BlogPage from "./BlogPage";
// import ArticleForm from './ArticleForm';
import ArticlePage from "./ArticlePage";
import CategoryComponents from "./CategoryComponents";
import ArticleDashboard from "../../features/articles/dashboard/ArticleDashboard";
import ArticleFormNew from "../../features/articles/form/ArticleFormNew.jsx";
import CommentDashboard from "../../features/comments/dashboard/CommentDashboard.jsx";
import CommentForm from "../../features/comments/form/CommentForm.jsx";
import SearchResultPage from "./SearchResultPage";
import SignInForm from "./SignInForm";
import LogInForm from "./LogInForm";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setUser } from "../slices/userSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      axios
        .get("https://localhost:7153/api/authentication")
        .then((res) => {
          console.log(res);
          dispatch(setUser(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      {/* <Route path="/ArticleForm" Component={ArticleForm} /> */}
      <Route path="/article/:id" Component={ArticlePage} />
      <Route path="/admin/articles" Component={ArticleDashboard} />
      <Route path="/admin/articles/add" Component={ArticleFormNew} />
      <Route
        path="/admin/articles/edit/:articleId"
        Component={ArticleFormNew}
      />
      <Route path="/admin/comments" Component={CommentDashboard} />
      <Route path="/admin/comments/add" Component={CommentForm} />
      <Route path="/admin/comments/edit/:commentId" Component={CommentForm} />
      <Route path="/CategoryComponents" Component={CategoryComponents} />
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
