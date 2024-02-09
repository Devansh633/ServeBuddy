import React, { useState } from "react";
import Category from "../menu/category";
import Header from "../menu/header";
import { useParams } from "react-router-dom";

function Menu() {
  
  const [menu,setMenu] = useState([])

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const {id,n} = useParams()
        const response = await fetch(`/getme?id=${id}&n=${n}`);
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
    <div className="bg-[#f2f3f4]">
      <Header />
      <Category />
    </div>
  );
}

export default Menu;
