import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

type Product = {
  id: number,
  name: string,
  price: number,
}

const Product = () => {

const { id } = useParams<{ id: string }>();

const url = `http://localhost:5000/products/${id}`;

const {data: product, loading, error} = useFetch<Product>(url);


console.log(product);

  return (
    <>
      <p>ID do produto: {id} </p>
      {error && <p>Ocorreu um erro!</p>}
      {loading && <p>Carregando...</p>}
      {product && (
        <div>
          <h1>{product.name} </h1>
          <p>{product.price} </p>

          {/*Nested Routes*/}
          <Link to={`/products/${id}/info`} >Mais Informações</Link>
        </div>
      )}
    </>
  )
}

export default Product