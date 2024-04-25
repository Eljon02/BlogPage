import React, { useEffect, useState } from "react";
import Sidebar from "../../../app/layout/Sidebar";
import ArticleTable from "./ArticleTable";
import axios from "axios";

export default function ArticleDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7153/api/Articles"
        ); //5052
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleDelete = async (articleId) => {
    try {
      await axios.delete(`https://localhost:7153/api/Articles/${articleId}`);

      setArticles(articles.filter((article) => article.articleId !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };
  return (
    <div className="flex relative overflow-x-hidden">
      <div className="flex-1 min-w-[250px] w-[250px]">
        <Sidebar />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg flex-5 m-[50px]">
        <ArticleTable handleArticleDelete={handleArticleDelete} articles={articles} style={{ marginTop: "20px" }} />
      </div>
    </div>
  );
}
