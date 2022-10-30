import { useState, useRef } from 'react'
import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'
import { SearchContext } from './context/SearchContext'

function App(){
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
        e.preventDefault()
        const fetchData = async () => {
          document.title = `${term} Music`
          const response = await fetch(API_URL + term)
          const resData = await response.json()
          if (resData.results.length > 0) {
              setData(resData.results)
          } else {
              setMessage('Not Found')
          }
      }
        fetchData()
    }

    return (
      <div className='App'>
        <div>
          <div className='cDiv'>
            <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
            }}>
                <SearchBar />
            </SearchContext.Provider>
          </div>
          <div className='cDiv'>
            {message}
          </div>
          <div className='cDiv'>
          <DataContext.Provider value={data} >
                <Gallery />
            </DataContext.Provider>
          </div>
        </div>
      </div>
    )
}

export default App