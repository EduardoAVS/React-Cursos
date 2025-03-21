import "./Auth.css";

import { Link } from "react-router-dom";
import Message from "../../components/Message";

import  { useEffect, useState} from "react";
import { useSelector, useDispatch} from "react-redux";

import { login, reset } from "../../slices/authSlice";
import { AppDispatch } from "../../store";
import { RootState } from "../../store";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const auth = useSelector((state: RootState) => state.auth);
  const { loading, error } = auth;

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const user = {
    email, password
  }
  dispatch(login(user));

}

useEffect(() => {
  dispatch(reset());
}, [dispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email || ""}/>
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
        {!loading && <input type="submit" value="Entrar" />}
        {loading && <input type="submit" value="Aguarde..." disabled/>}
        {typeof error === "string" && <Message msg={error} type="error" />}       
      </form>
      <p>Não tem uma conta? <Link to="/register">Clique Aqui</Link ></p>
    </div>
  )
}

export default Login;