import { memo, useContext } from 'react';
import { MoviesContext } from '../MoviesContext';
import { Button } from './Button';

import '../styles/sidebar.scss';

function SideBarComponent() {
  const { selectNewGenre, selectedGenreId, genres } = useContext(MoviesContext);

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
            onClick={() => selectNewGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
