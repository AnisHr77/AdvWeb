import React from 'react';

const IconFlask = ({ size = 18, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 3h6" />
    <path d="M10 3v13.4a4 4 0 1 0 4 0V3" />
    <path d="M8.5 13h7" />
  </svg>
);

export default IconFlask;
