import React, { useState } from 'react';

const DishForm = ({ categories, onAddDish }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddDish = () => {
    if (name.trim() !== '' && price.trim() !== '' && selectedCategory.trim() !== '') {
      onAddDish({
        name,
        price: parseFloat(price),
        description,
        category: selectedCategory,
      });
      setName('');
      setPrice('');
      setDescription('');
      setSelectedCategory('');
    }
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="Dish Name"
        value={name}
        onChange={handleNameChange}
        className="mb-2 p-2 border border-gray-400"
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={handlePriceChange}
        className="mb-2 p-2 border border-gray-400"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={handleDescriptionChange}
        className="mb-2 p-2 border border-gray-400"
      />
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="mb-2 p-2 border border-gray-400"
      >
        <option value="">Select Category</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button onClick={handleAddDish} className="p-2 bg-green-500 text-white">
        Add Dish
      </button>
    </div>
  );
};

export default DishForm;
