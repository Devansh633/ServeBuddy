import React, { useState } from 'react';

const CategoryForm = ({ onAddCategory }) => {
  const [category, setCategory] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (category.trim() !== '') {
      onAddCategory(category);
      setCategory('');
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Enter category"
        value={category}
        onChange={handleCategoryChange}
        className="mr-2 p-2 border border-gray-400"
      />
      <button onClick={handleAddCategory} className="p-2 bg-blue-500 text-white">
        Add Category
      </button>
    </div>
  );
};

export default CategoryForm;
