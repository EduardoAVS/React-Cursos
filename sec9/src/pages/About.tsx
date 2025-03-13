import { ChangeCounter } from "../context/ChangeCounter";

import { useCounterContext } from "../hooks/useCounterContext";

const About = () => {

  const { counter } = useCounterContext();
  
  return (
    <div>
      <h1>About</h1>
      <p>Valor do contador: {counter} </p>
      <ChangeCounter />
    </div>
  )
}

export default About