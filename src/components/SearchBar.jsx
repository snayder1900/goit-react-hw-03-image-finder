
export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.elements.query.value;
    onSubmit(query);
  };

  return (
    <header className="searchbar">
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="search-form__button">
          <span className="search-form__button-label">Buscar</span>
        </button>
        <input
          name="query"
          className="search-form__input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Buscar imágenes y fotos"
        />
      </form>
    </header>
  );
};