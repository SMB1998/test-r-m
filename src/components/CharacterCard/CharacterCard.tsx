import React from "react";
import "./CharacterCard.css";
import { Character } from "../../interfaces/characters/character";

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="character-card">
      <img
        className="character-image"
        src={character.image}
        alt={character.name}
      />
      <div className="character-info">
        <h3 className="character-name">{character.name}</h3>
        <p className="character-gender">
          <strong>Gender:</strong> {character.gender}
        </p>
        <p className="character-species">
          <strong>Species:</strong> {character.species}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;
