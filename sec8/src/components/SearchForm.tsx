import { useNavigate } from "react-router-dom"

import { useState } from "react"


const SearchForm = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState<string>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        navigate(`/search?q=${query}`);
    }

    return (
        <form onSubmit={handleSubmit} >
            <input type="text" onChange={(e) => setQuery(e.target.value)} />
            <input type="submit" value="buscar" onChange={(e) => setQuery(e.target.value)} />
        </form>

    )
}

export default SearchForm