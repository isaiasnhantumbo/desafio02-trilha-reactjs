import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface MoviesProviderProps{
  children: ReactNode;
}

interface MoviesContextData {
  movies: MovieProps[];
  selectNewGenre: (id: number) => void;
  selectedGenreId: number;
  genres: GenreResponseProps[];
  selectedGenre:GenreResponseProps;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export const MoviesContext = createContext<MoviesContextData>(
  {} as MoviesContextData
);

export function MoviesProvider ({children}:MoviesProviderProps){
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function selectNewGenre(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <MoviesContext.Provider value={{movies, selectNewGenre, selectedGenreId,genres,selectedGenre}}>
      {children}
    </MoviesContext.Provider>
  )
}