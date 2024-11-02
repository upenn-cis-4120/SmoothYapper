import { Children, createContext, useContext, useState } from "react";

const TabContext = createContext<{ 
    activeTab: string; 
    setActiveTab: React.Dispatch<React.SetStateAction<string>> }
| undefined>(undefined);

import { ReactNode } from "react";

export const TabProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState("index");
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
        {children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => useContext(TabContext);