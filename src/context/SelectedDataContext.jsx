import React, { createContext, useContext, useState } from "react";

// Create a context
const SelectedDataContext = createContext();

// Create a provider
export const SelectedDataProvider = ({ children }) => {
  const [selectedData, setSelectedData] = useState(null);

  const handleDataSelect = (data) => {
    setSelectedData({ ...data });
  };

  return (
    <SelectedDataContext.Provider value={{ selectedData, handleDataSelect }}>
      {children}
    </SelectedDataContext.Provider>
  );
};

export const useSelectedData = () => {
  const context = useContext(SelectedDataContext);
  if (!context) {
    throw new Error(
      "useSelectedData must be used within a SelectedDataProvider"
    );
  }
  return context;
};
