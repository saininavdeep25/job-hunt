import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR","Chandigarh", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState(''); 
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue)); 
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {filterData.map((data, index) => (
                <div key={index}>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        return (
                            <div key={itemId} className='flex items-center space-x-2 my-2'>
                                <input
                                    type="radio"
                                    id={itemId}
                                    name={data.filterType}
                                    value={item}
                                    checked={selectedValue === item} 
                                    onChange={() => changeHandler(item)} 
                                />
                                <label htmlFor={itemId}>{item}</label>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default FilterCard;
