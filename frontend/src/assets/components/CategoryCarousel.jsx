import React from 'react';
import Carousel from './ui/Carousel';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from './redux/jobSlice'; // Make sure to import the action
import { Button } from '@mui/material';

const category = [
  "Frontend Developer", 
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Backend Developer"
];

const CategoryCarousel = () => { 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchQuery(query)); // Dispatch the search query
    navigate("/browse"); // Navigate to the browse page
  }

  const items = category.map((cat, index) => ({
    id: index,
    label: cat  
  }));

  return (
    <div>
      <Carousel items={items} className='w-full max-w-xl mx-auto my-20'>
        {items.map(item => (
          <div key={item.id} className="p-4">
            <Button onClick={() => searchJobHandler(item.label)} className="text-lg font-semibold">
              {item.label}
            </Button>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
