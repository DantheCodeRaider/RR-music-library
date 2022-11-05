import { useEffect, useState, Suspense } from 'react'
import { createResource as fetchData } from './helper'
import './App.css';
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import Spinner from './components/Spinner';

function App(){
    let [searchTerm, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState(null)


    //const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

/*     useEffect(() => {
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
    }, [search]) */
    
      const renderGallery = () => {
        if(data){
            return (
                <Suspense fallback={<Spinner/>}>
                    <Gallery data={data} />
                </Suspense>
            )
        }
    }
  
    useEffect(() => {
      if (searchTerm) {
          document.title = `${searchTerm} Music`
          setData(fetchData(searchTerm))
      }
  }, [searchTerm])
  
    return (
      <div className='App'>
        <div>
          <div>
          <SearchBar handleSearch = {handleSearch} />
          </div>
          <div>
            {message}
          </div>
          <div>
            {renderGallery()}
          </div>
        </div>
      </div>
    )
}

export default App