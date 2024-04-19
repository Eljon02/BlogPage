import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold text-white mb-8">Welcome to My Blog</h1>
        <p className="text-lg text-white mb-12">Explore insightful articles on various topics.</p>
        <a href="/blog" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300">
            Read the Blog
        </a>
  
        <Link to="/ArticleForm" className="bg-white text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-full transition duration-300">
        edit 
        </Link>
    </div>
  )
}
