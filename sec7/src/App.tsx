import "./App.css";
import { useState } from "react";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:5000/products";

type Product = {
  id: number;
  name: string;
  price: number;
}; 

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const { data: items, httpConfig, loading, error } = useFetch<Product[]>(url);
  
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const product = { name, price: Number(price) };
    httpConfig(product, "POST");
    setName("");
    setPrice("");
  };

  const handleRemove = (id: number) => {
    httpConfig(id, "DELETE");
  };

  return (
    <div className="App">
      <h1>Lista de produtos</h1>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      <ul>
        {items &&
          items.map((product) => (
            <li key={product.id}>
              {product.name} - R$: {product.price}
              <button onClick={() => handleRemove(product.id)}>Excluir</button>
            </li>
          ))}
      </ul>

      <div className="add-product">
        <p>Adicionar produto:</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          {loading ? <p>Aguarde!</p> : <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;