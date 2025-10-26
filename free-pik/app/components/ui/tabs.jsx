"use client";
import React, { createContext, useContext, useState } from "react";

/* -------------------------
   Tabs Context & Provider
   ------------------------- */
const TabsContext = createContext({
  activeTab: undefined,
  setActiveTab: () => {},
});

export const Tabs = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-[100%] md:max-w-5xl mx-auto">{children}</div>
    </TabsContext.Provider>
  );
};

/* -------------------------
   TabsList - simple container
   ------------------------- */
export const TabsList = ({ children, className }) => {
  return (
    <div
      className={`flex h-10 items-center justify-center rounded-md bg-card border text-gray-600 ${className || ""}`}
    >
      {children}
    </div>
  );
};
TabsList.displayName = "TabsList";

/* -------------------------
   TabsTrigger - consumes context
   ------------------------- */
export const TabsTrigger = ({ value, children, className, ...rest }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  // Do NOT forward activeTab/setActiveTab to DOM; keep only allowed props.
  return (
    <button
      type="button"
      onClick={() => setActiveTab?.(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-2 text-sm font-medium transition-all ${
        activeTab === value ? "bg-white text-black shadow-sm" : "bg-transparent text-gray-500 hover:text-black"
      } ${className || ""}`}
      {...rest} // safe to spread other allowed props like aria-* , id, etc.
    >
      {children}
    </button>
  );
};
TabsTrigger.displayName = "TabsTrigger";

/* -------------------------
   TabsContent - consumes context
   ------------------------- */
export const TabsContent = ({ value, children, className }) => {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;
  return <div className={`mt-2 rounded-md transition-all duration-300 ${className || ""}`}>{children}</div>;
};
TabsContent.displayName = "TabsContent";
