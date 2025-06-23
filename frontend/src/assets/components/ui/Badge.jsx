import React from 'react';
import { Bell } from 'lucide-react'; // Import a Lucide icon

const Badge = ({ text, icon: Icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center px-1 py-1 text-sm font-medium rounded-full ${className}`}>
      {Icon && <Icon className="mr-1" />}
      {text}
    </div>
  );
};

export default Badge;
