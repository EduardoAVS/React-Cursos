import { useSearchParams, Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

type Product = {
    id: number,
    name: string,
    price: number,
  }

const Search = () => {
    const [searchParams] = useSearchParams();
    const url = `http://localhost:5000/products?${searchParams}`;

    const {data: items, loading, error} = useFetch<Product[]>(url);



  return (
    <div>
        <h1>Resultados: </h1>
        {error && <p>{error}</p>}
        <ul className="products">
            {items && items.map((item) => (
            <li key={item.id}>
                <h2>{item.name}</h2>
                <p>R$: {item.price} </p>
                <Link to={`/products/${item.id}`} > Detalhes </Link>
            </li>
            ))}
        </ul>
    </div>
  )
}

export default Search