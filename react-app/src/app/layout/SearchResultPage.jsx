import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link, useLocation } from 'react-router-dom';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const SearchResultPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`https://localhost:7153/api/Articles/search?searchTerm=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className='h-screen'>
      <Navbar />
      <div className="bg-slate-50 text-gray-700 p-6 min-h-screen items-center">
        <div className="container mx-auto px-4 py-8">
          <div className="container py-4 mb-8 border-b border-gray-300">
            <h1 className="text-3xl font-bold mb-2 text-center">Search Results for "{searchTerm}"</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {searchResults.map(article => {
              const newDate = formatDate(article.publicationDate)
              return (
                <article key={article.articleId} className="bg-white shadow-[0.2em_0.2em_0.4em_#dfe1e2,-0.2em_-0.2em_0.4em_#fdfefe] hover:shadow-[0.6em_0.6em_0.8em_#dfe1e2,-0.6em_-0.6em_0.8em_#fdfefe] rounded-lg p-4 transition ease-in">
                  <div className="mb-2"><img src="https://picsum.photos/600/600" alt="Description" className="rounded-lg object-cover max-h-60 w-full"></img></div>
                  <h2 className="text-xl font-semibold mb-2"><Link to={`/article/${article.articleId}`}>{article.title}</Link></h2>
                  <p className="text-gray-800 mb-2">{article.content}</p>
                  <p className="text-gray-600">By {article.author} | {newDate}</p>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;