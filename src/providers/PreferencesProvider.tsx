import React, { createContext, useState, useContext, useEffect } from "react";
import { ColumnType } from "../homepage/components/Column";
import { CardType } from "../homepage/components/Card";

// Define the types for Grouping and Ordering
interface PreferencesContextType {
  grouping: string;
  setGrouping: (value: string) => void;
  ordering: string;
  setOrdering: (value: string) => void;
}

// Create the context
const PreferencesContext = createContext<PreferencesContextType | undefined>(
  undefined
);

// Provider Component
export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Retrieve values from localStorage or set defaults

  const [grouping, setGrouping] = useState<string>(
    localStorage.getItem("grouping") || "status"
  );
  const [ordering, setOrdering] = useState<string>(
    localStorage.getItem("ordering") || "priority"
  );

  // Persist values to localStorage when they change
  useEffect(() => {
    localStorage.setItem("grouping", grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("ordering", ordering);
  }, [ordering]);

  return (
    <PreferencesContext.Provider
      value={{
        grouping,
        setGrouping,
        ordering,
        setOrdering,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

// Custom hook to use Preferences context
export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
