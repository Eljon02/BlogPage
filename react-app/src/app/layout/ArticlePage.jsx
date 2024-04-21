import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export default function ArticlePage() {
  const [article, setArticle] = useState([]);


  useEffect(() => {
    const fetchArticle = async (id) => {
      try {
        const response = await axios.get(`https://localhost:7153/api/Articles/${id} `); //5052
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const pathname = window.location.pathname;
    const articleId = pathname.split('/').pop();

    fetchArticle(articleId);
  }, []);

  return (
    <div className='h-screen'>
      <Navbar/>
      <div className="bg-slate-50 text-gray-700 p-6 min-h-screen items-center">
        <div className="container mx-auto px-4 py-8">
          <div className="container py-4 mb-8 border-b border-gray-300">
            <h1 className="text-3xl font-bold mb-2 text-center">Blog Page</h1>
            <h2 className="text-xl text-gray-600 mb-4 text-center">Read the most interesting articles from our best experst!</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            <div className="mb-2"><img src="https://picsum.photos/600/600" alt="Description" className="rounded-lg object-cover max-h-60 w-full"></img></div>
            <h2 className="text-xl font-semibold mb-2"><Link to={`/article/${article.articleId}`}>{article.title}</Link></h2>
            <p className="text-gray-800 mb-2">{article.content}</p>
            <p className="text-gray-600">By {article.author} | </p>
          </div>
        </div>
      </div>
    </div>
  )
}
