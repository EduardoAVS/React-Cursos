import { ChangeCounter } from "../context/ChangeCounter";

import { useCounterContext } from "../hooks/useCounterContext";

import { useTitleColorContext } from "../hooks/useTitleContext";

const Home = () => {

  const { counter } = useCounterContext();

  const { state  }  = useTitleColorContext();

  const { dispatch } = useTitleColorContext();

  const setTitleColor = (color: string) => {
    dispatch({ type: "CHANGE_COLOR" ,payload: color });
  };  
  return (
    <div>
      <h1 style={{color: state.color}} >Home</h1>
      <p>Valor do contador: {counter} </p>
      <ChangeCounter />
      <div>
        <button onClick={() => setTitleColor("PURPLE")} >cor</button>
      </div>
    </div>
  )
}

export default Home