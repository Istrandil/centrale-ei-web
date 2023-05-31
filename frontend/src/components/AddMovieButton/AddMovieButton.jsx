import { useState } from 'react';
import axios from 'axios';
import './AddMovieButton.css';

const DEFAULT_FORM_VALUES = {
  id: null,
  title: '',
  release_date: '',
  overview: '',
  poster_path: '',
  vote_average: null,
  vote_count: null,
};

function FormOfMovie(movie) {
  const outputForm = {};
  outputForm['id'] = movie['id'];
  outputForm['Title'] = movie['title'];
  outputForm['Date'] = movie['release_date'];
  outputForm['Overview'] = movie['overview'];
  outputForm['Path'] = movie['poster_path'];
  outputForm['Vavg'] = movie['vote_average'];
  outputForm['Vcount'] = movie['vote_count'];

  return outputForm;
}

function AddMovieButton({ onSuccessfulMovieCreation }) {
  const [MovieCreationError, setMovieCreationError] = useState(null);
  const [MovieCreationSuccess, setMovieCreationSuccess] = useState(null);
  const [moviesArray, setMovies] = useState([]);
  const displayCreationSuccessMessage = () => {
    setMovieCreationSuccess('New movie created successfully');
    setTimeout(() => {
      setMovieCreationSuccess(null);
    }, 3000);
  };

  const saveMovie = (event) => {
    event.preventDefault();
    setMovieCreationError(null);

    for (let PageNum = 1; PageNum < 100; PageNum++) {
      let str = '';
      str =
        'https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&page=';
      str = str.concat(PageNum.toString());
      axios
        .get(str)
        .then((response) => {
          // Do something if call succeeded
          let array = response.data.results;
          array = response.data.results;
          setMovies(array);
        })
        .catch((error) => {
          // Do something if call failed
          console.log(error);
        });

      for (const ind in moviesArray) {
        const movieForm = FormOfMovie(moviesArray[ind]);
        console.log(movieForm);

        axios
          .post(`${import.meta.env.VITE_BACKEND_URL}/movies/new`, movieForm)
          .then(() => {
            displayCreationSuccessMessage();
            onSuccessfulMovieCreation();
          })
          .catch((error) => {
            setMovieCreationError('An error occured while creating new movie.');
            console.error(error);
          });
      }
    }
  };

  return (
    <div>
      <button onClick={saveMovie}> Add Movie </button>
    </div>
  );
}

export default AddMovieButton;
