import { useContext, useState } from 'react'
import { SearchContext } from '../context/SearchContext'

const SearchBar = (props) => {
    let { term, handleSearch } = useContext(SearchContext)
    let [searchTerm, setSearchTerm] = useState('')

    return (
        <form>
            <input ref={term} type="text" placeholder="Search Here" />
            <button onClick={(e) => handleSearch(e, term.current.value)}>Submit</button>
        </form>
    )

    /*     return (
            <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>
                <input type="text" placeholder="Search Here" onChange={(e) => setSearchTerm(e.target.value)} />
                <input type="submit" />
            </form>
        ) */
}

export default SearchBar
