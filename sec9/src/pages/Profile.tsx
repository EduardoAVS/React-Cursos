import { ChangeCounter } from "../context/ChangeCounter";

import { useCounterContext } from "../hooks/useCounterContext";

const Profile = () => {

  const { counter } = useCounterContext();
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Valor do contador: {counter} </p>
      <ChangeCounter />
    </div>
  )
}

export default Profile