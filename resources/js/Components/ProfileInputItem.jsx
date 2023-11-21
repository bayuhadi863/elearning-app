import React from 'react';

const ProfileInputItem = ({ label, type, valueContent }) => {
  return (
    <div class="grid grid-cols-3">
      <label htmlFor="" className="col-span-1">
        {label}
      </label>
      <input
        type={type}
        id="user-info-email"
        class="rounded-lg flex-1 col-span-2 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        value={valueContent ? valueContent : ''}
      />
    </div>
  );
};

export default ProfileInputItem;
