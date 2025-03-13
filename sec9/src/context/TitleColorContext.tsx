import { createContext, useReducer, ReactNode, Dispatch } from "react";

type TitleColorState = {
    color: string;
}


type TitleColorAction = { type: "CHANGE_COLOR"; payload: string };

export const TitleColorContext = createContext<{
    state: TitleColorState;
    dispatch: Dispatch<TitleColorAction>;
} | null>(null);

const titleColorReducer = (state: TitleColorState, action: TitleColorAction): TitleColorState => {
    switch (action.type) {
        case "CHANGE_COLOR":
            return { ...state, color: action.payload };
        default:
            return state;
    }
};

type TitleColorProviderProps = {
    children: ReactNode;
}

export const TitleColorProvider: React.FC<TitleColorProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(titleColorReducer, { color: "purple" });

    return (
        <TitleColorContext.Provider value={{ state, dispatch }}>
            {children}
        </TitleColorContext.Provider>
    );
};


