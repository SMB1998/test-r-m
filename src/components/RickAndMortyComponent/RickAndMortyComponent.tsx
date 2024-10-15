// src/components/RickAndMortyComponent.tsx

import React from "react";
import useRickAndMorty from "../../hooks/useRickAndMorty";
import CharacterGrid from "../CharacterGrid/CharacterGrid";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
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
      <Filters filters={filters} handleFilterChange={handleFilterChange} />
      <CharacterGrid characters={displayedCharacters} status={status} />
      <Pagination page={page} handleNext={handleNext} handlePrev={handlePrev} />
    </div>
  );
};

export default RickAndMortyComponent;
