import { useContext } from "react";

import { CounterContext } from "./CounterContext";

export const ChangeCounter = () => {
    const context = useContext(CounterContext);
  
    if(!context){
        return <p>Erro: CounterContext não está dentro de um Provider!</p>
    }

    const { counter, setCounter } = context;

    return(
        <div>
            <button onClick={() => setCounter(counter + 1)} >
                Incrementar
            </button>
        </div>
    )
}
