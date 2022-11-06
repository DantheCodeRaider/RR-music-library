import  React, { useEffect, useState, Suspense, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import Spinner from './components/Spinner';
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';
import { createResource as fetchData } from './helper';

function App(){
    let searchInput = useRef('')
    let [searchTerm, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState(null)


    //const API_URL = 'https://itunes.apple.com/search?term='

    const handleSearch = (e, term) => {
      e.preventDefault()
      setData(fetchData(term, 'main'))
    }
    
  const renderGallery = () => {
        if(data){
            return (
                <Suspense fallback={<Spinner/>}>
                    <Gallery />
                </Suspense>
            )
        }
    }
  
/*     useEffect(() => {
      if (searchTerm) {
          document.title = `${searchTerm} Music`
          setData(fetchData(searchTerm))
      }
  }, [searchTerm]) */
  
  return (
      <div className='App'>
        <div>
          <div className='cDiv'>
            <h3>{message}</h3>
          </div>
          <div className='cDiv'>
            <Router>
              <Route exact path={'/'}>
                <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
                  <SearchBar />
                </SearchContext.Provider>
                <DataContext.Provider value={data}>
                    {renderGallery()}
                </DataContext.Provider>
                </Route>
                  <Route path="/album/:id">
                  <AlbumView />
                </Route>
                  <Route path="/artist/:id">
                  <ArtistView />
              </Route>
            </Router>
          </div>
        </div>
      </div>
    )
}

export default App;