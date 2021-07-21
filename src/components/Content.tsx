import { useContext } from "react";
import { MoviesContext } from "../MoviesContext";
import { Header } from "./Header";
import { MoviesList } from "./MoviesList";

import '../styles/content.scss';

export function Content() {
  const {movies, selectedGenre} = useContext(MoviesContext);
  
  return (
    <div className="container">
     <Header selectedGenreTitle={selectedGenre.title}/>
      <main>
       <MoviesList movies={movies}/>
      </main>
    </div>
  );
}
