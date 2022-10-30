import { useEffect, useState } from 'react'
import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    useEffect(() => {
      if(search) {
        const fetchData = async () => {
            document.title = `${search} Music`
            const response = await fetch(API_URL + search)
            const resData = await response.json()
            if (resData.results.length > 0) {
                setData(resData.results)
            } else {
                setMessage('Not Found')
            }
        }
        fetchData()
      }
    }, [search])

    return (
      <div className='App'>
        <div>
          <div className='cDiv'>
          <SearchBar handleSearch = {handleSearch} />
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
