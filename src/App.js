import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import './App.css';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavourite';
import RemoveFavourite from './components/RemoveFavourite';

const App = () => {
  const [movies, setMovies] = useState([
    {
      "Title": "Ava",
      "Year": "2020",
      "imdbID": "tt8784956",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMTMzMTg1MjgtOWNhYy00NmZmLWExOTctMjA2OTZhZDFkNDhhXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg"
  },
  ]);
  const [favourite, setFavourite] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  // const getMovieRequest = async () => {
  //   const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=8ac642f3`

  //   const response = await fetch(url);
  //   const responseJson = await response.json();

  //  if (responseJson.Search) {
  //     setMovies(responseJson.Search);
  //  }
  // };

  useEffect(() => {

    const getMovieRequest = async () => {
      const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=8ac642f3`
  
      const response = await fetch(url);
      const responseJson = await response.json();
  
     if (responseJson.Search) {
        setMovies(responseJson.Search);
     }
    };

    getMovieRequest(searchValue);
  }, [searchValue]);


  useEffect(() => {
      const movieFavourite = JSON.parse(localStorage.getItem('react-movie-app-favourite')
      ) || [];
      setFavourite(movieFavourite);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourite', JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) => {
      const newFavouriteList = [...favourite, movie];
      setFavourite(newFavouriteList);
      //save to local list
      saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourite.filter(
        (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourite(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
}

  return (
    <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
              <MovieListHeading heading='Movies' />
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>

        <div className='row'>
            <MovieList 
                movies = {movies} 
                handleFavouriteClick={addFavouriteMovie} 
                favouriteComponent={AddFavourite}
            />
        </div>

        <div className='row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites' />
        </div>

        <div className='row'>
            <MovieList 
                movies = {favourite} 
                handleFavouriteClick={removeFavouriteMovie} 
                favouriteComponent={RemoveFavourite}
            />
        </div>
        
    </div>
  );
}

export default App;
