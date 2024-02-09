import React, { useState,useEffect } from 'react';

const Setmenu = () => {
  const [menu, setMenu] = useState([]);

  const addSection = () => {
    setMenu([...menu, { sectionName: '', dishes: [] }]);
  };

  const removeSection = (index) => {
    const updatedMenu = [...menu];
    updatedMenu.splice(index, 1);
    setMenu(updatedMenu);
  };

  const addDish = (sectionIndex) => {
    const updatedMenu = [...menu];
    updatedMenu[sectionIndex].dishes.push({ name: '', price: '', availability: true });
    setMenu(updatedMenu);
  };

  const removeDish = (sectionIndex, dishIndex) => {
    const updatedMenu = [...menu];
    updatedMenu[sectionIndex].dishes.splice(dishIndex, 1);
    setMenu(updatedMenu);
  };

  const handleSectionNameChange = (sectionIndex, newName) => {
    const updatedMenu = [...menu];
    updatedMenu[sectionIndex].sectionName = newName;
    setMenu(updatedMenu);
  };

  const handleDishChange = (sectionIndex, dishIndex, field, value) => {
    const updatedMenu = [...menu];
    updatedMenu[sectionIndex].dishes[dishIndex][field] = value;
    setMenu(updatedMenu);
  };
  const setmenu = async () => {
    try{
    let response = await fetch("/setmenu", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:localStorage.getItem('email'),
        menu:menu
      })
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log('succesfull')
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

useEffect(() => {
  const fetchMenuData = async () => {
    try {
      const response = await fetch(`/getmenu?email=${localStorage.getItem('email')}`);
      if (response.ok) {
        const responseData = await response.json();
        setMenu(responseData);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  fetchMenuData();
}, []);

  return (
    <div>
      {menu.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-4">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Section Name"
            value={section.sectionName}
            onChange={(e) => handleSectionNameChange(sectionIndex, e.target.value)}
          />
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={() => removeSection(sectionIndex)}>Remove Section</button>
          <div className="mt-2">
            {section.dishes.map((dish, dishIndex) => (
              <div key={dishIndex}>
                  <label className="input-group">
                    <input
                      type="text"
                      placeholder="Dish Name"
                      className="input input-bordered w-full max-w-xs"
                      value={dish.name}
                      onChange={(e) => handleDishChange(sectionIndex, dishIndex, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      className="input input-bordered w-full max-w-xs"
                      value={dish.price}
                      onChange={(e) => handleDishChange(sectionIndex, dishIndex, 'price', e.target.value)}
                    />
                    <label className="input-group w-[15%] ml-[4rem] rounded-none p-0 border">
                    <span className='rounded-none' >Availability</span>
                    <input
                        type="checkbox"
                        className="w-full"
                        checked={dish.availability}
                        onChange={(e) => handleDishChange(sectionIndex, dishIndex, 'availability', e.target.checked)}
                    />
                    </label>
                    <button className="btn btn-xs sm:btn-sm md:btn-md ml-[4rem]" onClick={() => removeDish(sectionIndex, dishIndex)}>Remove Dish</button>
                  </label>
                
              </div>
            ))}
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg " onClick={() => addDish(sectionIndex)}>Add Dish</button>
          </div>
        </div>
      ))}
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={addSection}>Add Section</button>
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ml-[70rem]" onClick={setmenu}>Set Menu</button>
    </div>
  );
};

export default Setmenu;
