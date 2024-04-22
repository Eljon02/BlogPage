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
  const [newestArticles, setNewestArticles] = useState([]);



  useEffect(() => {
    const fetchArticle = async (id) => {
      try {
        const response = await axios.get(`https://localhost:7153/api/Articles/${id} `); //5052
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    const fetchNewestArticles = async () => {
      try {
          const response = await axios.get(`https://localhost:7153/api/Articles`);
          const sortedArticles = response.data.sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
          setNewestArticles(sortedArticles.slice(0, 3));
      } catch (error) {
          console.error('Error fetching newest articles:', error);
      }
  };

    const pathname = window.location.pathname;
    const articleId = pathname.split('/').pop();


    fetchArticle(articleId);
    fetchNewestArticles();
  }, []);

  return (
    <div className='h-screen'>
        <Navbar />
        <div className="bg-slate-50 text-gray-700 p-6 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="container py-4 mb-8 border-b border-gray-300">
                    <h1 className="text-3xl font-bold mb-2 text-center">Blog Page</h1>
                    <h2 className="text-xl text-gray-600 mb-4 text-center">Read the most interesting articles from our best experts!</h2>
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-center">{article.title}</h2>
                <div className="mb-4 flex justify-center">
                    <img src="https://picsum.photos/600/400" alt="Description" className="rounded-lg object-cover w-auto h-auto" />
                </div>
                <p className="text-gray-800 mb-4 text-center">{article.content}</p>
                <p className="text-gray-600 text-center">By {article.author} | Published on {formatDate(article.publicationDate)}</p>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Top 3 Newest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {newestArticles.map(newestArticle => (
                    <div key={newestArticle.id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">
                            <Link to={`/article/${newestArticle.id}`} className="hover:text-blue-600">{newestArticle.title}</Link>
                        </h3>
                        <div className="mb-4 flex justify-center">
                    <img src="https://picsum.photos/600/600" alt="Description" className="rounded-lg object-cover w-64 h-auto" />
                </div>
                        <p className="text-gray-800 mb-4 text-center">{newestArticle.content}</p>
                        <p className="text-gray-600 text-center">By {newestArticle.author} | Published on {formatDate(newestArticle.publicationDate)}</p>
                        <p className="text-gray-700">{newestArticle.shortDescription}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
}