import React, { useState } from 'react';
import { DataContext } from './DataContext';

const DataContextProvider = ({ children }) => {
  const [thisSeasonId, setThisSeasonId] = useState(
    localStorage.getItem('thisSeasonId')
  );

  return (
    <DataContext.Provider value={{ thisSeasonId, setThisSeasonId }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
