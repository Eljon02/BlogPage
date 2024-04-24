import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const HomePage = () => {
  return (
    <div>
    <Navbar />
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex flex-col justify-center items-center">
     
      <div className="relative z-10">
        <h1 className="text-5xl font-extrabold text-white mb-8 text-center">Welcome to Blog Page</h1>
        <p className="text-lg text-white mb-12 text-center">Explore insightful articles on various topics.</p>
        <div className="flex gap-4">
          <Link to="/blog" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300">
            Read the Blog
          </Link>
          <Link to="/ArticleForm" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300">
            Add/Edit Article
          </Link>
          <Link to="/CategoryComponents" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300">
           Category
          </Link>
     
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomePage;