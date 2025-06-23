// Input.js
import React from 'react';

const Input = ({ id, type = 'text', placeholder, className, ...props }) => {
    return (
        <input 
            id={id} 
            type={type} 
            placeholder={placeholder} 
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm ${className}`} 
            {...props} 
        />
    );
};

export default Input;
