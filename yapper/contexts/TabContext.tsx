import { Children, createContext, useContext, useState } from "react";

const TabContext = createContext<{ 
    activeTab: string; 
    setActiveTab: React.Dispatch<React.SetStateAction<string>>;
    pageAParams: Record<string, any> | null;
    setPageAParams: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
} | undefined>(undefined);

import { ReactNode } from "react";

export const TabProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState("index");
    const [pageAParams, setPageAParams] = useState<Record<string, any> | null>(null);
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab, pageAParams, setPageAParams }}>
        {children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTabContext must be used within a TabProvider");
    }
    return context;
};