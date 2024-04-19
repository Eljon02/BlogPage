import React from 'react'

export default function HomePage() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-extrabold mb-2">Welcome to My Blog</h1>
      <p className="text-lg text-gray-600 mb-12">Explore insightful articles on various topics.</p>
      <a href="/blog" className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-md transition duration-300">
          Read the Blog
      </a>
    </div>
  )
}
