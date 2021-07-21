import { useContext } from 'react';
import { MoviesContext } from '../MoviesContext';
import { Button } from './Button';

import '../styles/sidebar.scss';

export function SideBar() {
  const { selectNewGenre, selectedGenreId, genres } = useContext(MoviesContext);

  function handleClickButton(id: number) {
    selectNewGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
