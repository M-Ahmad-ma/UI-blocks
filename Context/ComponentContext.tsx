"use client";

import React, { createContext, useContext, useState } from "react";

interface ComponentContextType {
  selected: string | null;
  setSelected: (id: string) => void;
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

export const ComponentProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ComponentContext.Provider value={{ selected, setSelected }}>
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponentContext = () => {
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error("useComponentContext must be used within ComponentProvider");
  }
  return context;
};
