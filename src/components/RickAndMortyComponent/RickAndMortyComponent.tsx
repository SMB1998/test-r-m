// src/components/RickAndMortyComponent.tsx

import React from "react";
import useRickAndMorty from "../../hooks/useRickAndMorty";
import CharacterGrid from "../CharacterGrid/CharacterGrid";
import "./RickAndMortyComponent.css";

const RickAndMortyComponent: React.FC = () => {
  const {
    status,
    page,
    filters,
    displayedCharacters,
    handleNext,
    handlePrev,
    handleFilterChange,
  } = useRickAndMorty();

  return (
    <div className="rick-and-morty-grid">
      <h1>Rick and Morty test Santiago Muñoz B.</h1>

      <h1>Gender</h1>
      <select
        name="gender"
        onChange={handleFilterChange}
        value={filters.gender}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <CharacterGrid characters={displayedCharacters} status={status} />

      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Previous
        </button>
        <span className="current-page">Page {page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default RickAndMortyComponent;
