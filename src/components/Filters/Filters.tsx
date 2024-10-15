// src/components/Filters.tsx

import React from "react";

interface FiltersProps {
  filters: { gender: string };
  handleFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, handleFilterChange }) => {
  return (
    <div className="filters">
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
    </div>
  );
};

export default Filters;
