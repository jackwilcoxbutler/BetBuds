import React from 'react';


export const PlusButton: React.FC = () => {
  return (
    <button
      className="bg-t-orange hover:bg-t-orange-200 text-white font-bold p-2 rounded-full shadow-lg flex items-center justify-center w-16 h-16"
      aria-label="Add"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#2D3142"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>
  );
};

export default PlusButton;