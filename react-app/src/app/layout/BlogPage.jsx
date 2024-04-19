import React, { useEffect, useState } from 'react';
import axios from 'axios';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function BlogPage() {
  const [articles, setArticles] = useState([]);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5052/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);



    
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map(article => {
                  const newDate = formatDate(article.publicationDate)
                  return (
                      <div key={article.articleId} className="bg-white rounded-lg shadow-md p-6">
                          <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                          <p className="text-gray-600 mb-2">By {article.author} on {newDate}</p>
                          <p className="text-gray-800">{article.content}</p>
                      </div>
                  )
              })}
              
      </div>
      
    </div>
  )
}
