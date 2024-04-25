import React, { useEffect, useState } from 'react'
import Sidebar from '../../../app/layout/Sidebar'
import ArticleTable from './ArticleTable'
import axios from 'axios';

export default function ArticleDashboard() {
    const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://localhost:7153/api/Articles '); //5052
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);
  return (
    <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Sidebar />
        </div>
        <div style={{ flex: 5, margin: "50px" }}>
          <ArticleTable articles={articles} style={{ marginTop: "20px" }} />
        </div>
      </div>
  )
}
