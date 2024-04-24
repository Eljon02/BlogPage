import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryComponents = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`https://localhost:7153/Api/Category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`https://localhost:7153/Api/Category`, { name });
      setName('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };


  const handleUpdate = async (id, updatedName) => {
    try {
      await axios.put(`https://localhost:7153/Api/Category/${id}`, { name: updatedName });
      fetchCategories();
      setEditId(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7153/Api/Category/${id}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.CategoryId} className="mb-2">
            {editId === category.CategoryId ? (
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border rounded py-2 px-3 mb-2 mr-2"
                placeholder="Category Name"
              />
            ) : (
              <span>{category.CategoryName}</span>
            )}
            {editId === category.CategoryId ? (
              <button
                onClick={() => handleUpdate(category.CategoryId, name)}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Update
              </button>
            ) : (
              <>
                <button
                  onClick={() => setEditId(category.CategoryId)}
                  className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.CategoryId)}
                  className="bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h2 className="text-2xl font-bold mt-8 mb-4">Create Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border rounded py-2 px-3 mb-2 mr-2"
          placeholder="Category Name"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Create</button>
      </form>
    </div>
  );
};

export default CategoryComponents;
