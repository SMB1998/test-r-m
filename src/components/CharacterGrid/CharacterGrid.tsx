import React from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import "./CharacterGrid.css";
import { Character } from "../../interfaces/characters/character";

interface CharacterGridProps {
  characters: Character[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  status,
}) => {
  const limitedCharacters = characters;

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        Loading...
      </div>
    );
  }

  if (status === "failed") {
    return <p>Failed to load characters</p>;
  }

  if (limitedCharacters.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen h-[75vh]">
        <p className="text-4xl font-bold text-gray-800 text-center">
          No characters to show
        </p>
      </div>
    );
  }
  return (
    <div className="grid-container">
      {limitedCharacters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};

export default CharacterGrid;
