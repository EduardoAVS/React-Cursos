import { createContext, useState, ReactNode } from "react";

export const CounterContext = createContext<{
    counter: number;
    setCounter: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const CounterContextProvider = ({ children }: { children: ReactNode }) => {
    const [counter, setCounter] = useState<number>(5);

    return (
        <CounterContext.Provider value={{ counter, setCounter }}>
            {children}
        </CounterContext.Provider>
    );
};
