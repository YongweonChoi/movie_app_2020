import React from 'react';
import './App.css';
import Movie from './Movie';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    try {
      const response = await fetch(
        'https://yts.mx/api/v2/list_movies.json?sort_by=rating'
      );
      const json = await response.json();
      const movies = json?.data?.movies || [];
      this.setState({ movies: movies, isLoading: false });
    } catch (error) {
      // If API is not available, use mock data
      const mockMovies = [
        {
          id: 1,
          year: 2019,
          title: 'Avengers: Endgame',
          summary: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
          medium_cover_image: 'https://via.placeholder.com/150x220/4A90E2/ffffff?text=Avengers+Endgame',
          genres: ['Action', 'Adventure', 'Sci-Fi']
        },
        {
          id: 2,
          year: 2020,
          title: 'Tenet',
          summary: 'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
          medium_cover_image: 'https://via.placeholder.com/150x220/E24A4A/ffffff?text=Tenet',
          genres: ['Action', 'Sci-Fi', 'Thriller']
        },
        {
          id: 3,
          year: 2019,
          title: 'Joker',
          summary: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.',
          medium_cover_image: 'https://via.placeholder.com/150x220/E2C44A/ffffff?text=Joker',
          genres: ['Crime', 'Drama', 'Thriller']
        },
        {
          id: 4,
          year: 2019,
          title: 'Parasite',
          summary: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
          medium_cover_image: 'https://via.placeholder.com/150x220/4AE28C/ffffff?text=Parasite',
          genres: ['Comedy', 'Drama', 'Thriller']
        }
      ];
      setTimeout(() => {
        this.setState({ movies: mockMovies, isLoading: false });
      }, 1000);
    }
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
