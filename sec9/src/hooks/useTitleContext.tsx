import { useContext } from "react";
import { TitleColorContext } from "../context/TitleColorContext";

export const useTitleColorContext = () => {
    const context = useContext(TitleColorContext)

    if(!context){
        throw new Error("useCouterContext Error");
    }

    return context;
}