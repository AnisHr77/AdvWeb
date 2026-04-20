import React from 'react';

/**
 * StatCard Component
 * 
 * Props:
 * @param {string} value - The numeric value (e.g., '150+')
 * @param {string} label - The description (e.g., 'Global Speakers')
 */
const StatCard = ({ value, label }) => {
  return (
    <div className="bg-white rounded-xl p-7 shadow-sm text-center flex flex-col justify-center items-center min-h-[160px] border border-black/5 hover:shadow-md transition-shadow">
      <h3 className="text-4xl md:text-5xl font-bold  mb-2" style={{ color: '#0B4F6C' }}>
        {value}
      </h3>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
