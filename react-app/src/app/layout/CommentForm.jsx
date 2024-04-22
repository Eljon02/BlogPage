import React, { useState } from 'react';

const CommentForm = ({ onSubmit, article }) => {
  const [content, setContent] = useState(article ? article.title : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="Post your comment:" className="block text-gray-700 font-bold mb-2">Share your comment:</label>
        <input
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Submit</button>
    </form>
  );
};

export default CommentForm;
