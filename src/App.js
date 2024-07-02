import './App.css';
import React, { useState, useCallback, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-http-6b4a6.firebaseio.com/movies.json'
      );
      // const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        console.log(key);
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      /* const transformedMovies = data.results.map((item) => {
        return {
          id: item.episode_id,
          title: item.title,
          openingText: item.opening_crawl,
          releaseDate: item.release_date,
        };
      }); */

      setMovies(loadedMovies);
      // setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function AddMovieHandler(movie) {
    //need firebase account and also like up there,if you handle the error then it won't crash!
    const response = await fetch(
      'https://react-http-6b4a6.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = await response.json();
    console.log(data);
  }
  /* const AddMovieHandler = (movie) => {
    console.log(movie);
  }; */

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  /* async function fetchMoviesHandler() {
    setIsloading(true);
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    const transformedMovies = data.results.map((item) => {
      return {
        id: item.episode_id,
        title: item.title,
        openingText: item.opening_crawl,
        releaseDate: item.release_date,
      };
    });

    setMovies(transformedMovies);
    setIsloading(false);
  } */

  /* function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.results.map((item) => {
          return {
            id: item.episode_id,
            title: item.title,
            openingText: item.opening_crawl,
            releaseDate: item.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  } */

  /* const dummyMovies = [
    {
      id: 1,
      title: 'Some Dummy Movie',
      openingText: 'This is the opening text of the movie',
      releaseDate: '2021-05-18',
    },
    {
      id: 2,
      title: 'Some Dummy Movie 2',
      openingText: 'This is the second opening text of the movie',
      releaseDate: '2021-05-19',
    },
  ]; */

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={AddMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>} */}
        {/* <MoviesList movies={movies} /> */}
      </section>
    </React.Fragment>
  );
}

export default App;
