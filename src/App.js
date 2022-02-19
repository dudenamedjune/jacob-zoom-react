import React, { useEffect, useState } from 'react';
import './App.css';
import Card from './Card';
// Here is an api that allows users to search for movies
// title=the dark knight rises
//https://www.omdbapi.com/?t={title}&apikey=3fd77eec
/*
{
  "Title": "The Dark Knight Rises",
  "Year": "2012",
  "Rated": "PG-13",
  "Released": "20 Jul 2012",
  "Runtime": "164 min",
  "Genre": "Action, Adventure",
  "Director": "Christopher Nolan",
  "Writer": "Jonathan Nolan, Christopher Nolan, David S. Goyer",
  "Actors": "Christian Bale, Tom Hardy, Anne Hathaway",
  "Plot": "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.",
  "Language": "English, Arabic",
  "Country": "United Kingdom, United States",
  "Awards": "38 wins & 103 nominations total",
  "Poster": "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg",
  "Ratings": [
      {
          "Source": "Internet Movie Database",
          "Value": "8.4/10"
      },
      {
          "Source": "Metacritic",
          "Value": "78/100"
      }
  ],
  "Metascore": "78",
  "imdbRating": "8.4",
  "imdbVotes": "1,573,956",
  "imdbID": "tt1345836",
  "Type": "movie",
  "DVD": "04 Dec 2012",
  "BoxOffice": "$448,139,099",
  "Production": "Syncopy",
  "Website": "N/A",
  "Response": "True"
}
 create a UI that allows the user to search for a movie 
 display the movie if found 
 otherwise display a message. 
 You have all of the design liberty here 
*/

const inputStyle = {
  width: '50%',
  height: '100%',
  border: 'none',
  outline: 'none',
  fontSize: '1.5em',
  padding: '0.5em',
  margin: '0.5em',
  borderRadius: '0.5em',
  backgroundColor: '#f5f5f5',
  color: '#333',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  transition: 'all 0.3s ease-in-out',
  ':focus': {
    backgroundColor: '#fff',
    color: '#333',
    fontWeight: 'normal',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    transition: 'all 0.3s ease-in-out'
  }
};

const cardContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%', 
  height: '100%',
  padding: '0.5em',
  margin: '0.5em',
  borderRadius: '0.5em',
  backgroundColor: '#f5f5f5',
  color: '#333',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  transition: 'all 0.3s ease-in-out',
};


function App() {
  const [search, setSearch] = useState('');
  const [movie, setMovie] = useState({ Error: true });
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, [search]);

  const fetchMovie = async () => {
    const url = `https://www.omdbapi.com/?t=${search}&apikey=3fd77eec`;
    const response = await fetch(url);
    const data = await response.json();
    setMovie(data);
  };

  const handleInputChange = ({target: { value }}) => setSearch(value)

  return (
    <div className="App">
        <h1>Movie Search</h1>
        <input onChange={handleInputChange} style={inputStyle}/>
        {search && <div>searching for {search}</div>}
        {savedMovies.length > 0 && 
          <h2>Saved Movies</h2>
        }
              <div className='card-container' style={cardContainerStyle}>
      
      {
        !movie.Error && 
          <Card 
            title={movie.Title}
            description={movie.Plot}
            imgSrc={movie.Poster}
            onButtonClick={() => {
              setSavedMovies([...savedMovies, movie]);
            }}
            buttonText='Save'
         />
      }
      </div>
      <br/>
      <br/>
      <div className='card-container' style={cardContainerStyle}>
        {savedMovies.length > 0 && <button onClick={()=> setSavedMovies([])}>Fuck you all</button>} 
        {
          savedMovies.map(movie => (
            <Card
              title={movie.Title}
              description={movie.Plot}
              imgSrc={movie.Poster}
              onButtonClick={() => {
                setSavedMovies(savedMovies.filter(m => m.Title !== movie.Title));
              }}
              buttonText='Delete'
          />
          ))
        }
      </div>

    </div>
  );
}

export default App;
