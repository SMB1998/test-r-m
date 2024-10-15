import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store"; // Ajusta la ruta según tu estructura
import {
  fetchCharacters,
  setPage,
  setGender,
} from "../../store/slices/rickAndMortySlice";
import CharacterGrid from "../CharacterGrid/CharacterGrid";
import { Character } from "../../interfaces/characters/character";
import "./RickAndMortyComponent.css";

const RickAndMortyComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    status,
    page,
    filters: storefilters,
  } = useSelector((state: RootState) => state.rickAndMorty);

  const [filters, setFilters] = useState({
    gender: "",
  });
  const [displayedCharacters, setDisplayedCharacters] = useState<Character[]>(
    []
  );
  const [allCharacters, setAllCharacters] = useState<
    Record<string, Character[]>
  >({});
  const [isLoaded, setIsLoaded] = useState(false);

  const getQueryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const genderParam = urlParams.get("gender");
    return {
      page: pageParam ? parseInt(pageParam) : 1,
      gender: genderParam || "",
    };
  };

  useEffect(() => {
    const loadState = async () => {
      const { page, gender } = getQueryParams();
      dispatch(setPage(page));
      dispatch(setGender(gender));
      setFilters({ gender });
      setIsLoaded(true);
    };

    loadState();
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded) {
      const _filters = { ...filters, ...storefilters };
      setFilters(_filters);

      const cacheKey = `${page}-${_filters.gender}`;

      if (allCharacters[cacheKey]) {
        setDisplayedCharacters(allCharacters[cacheKey]);
      } else {
        dispatch(fetchCharacters({ page, filters: _filters })).then(
          (response: any) => {
            const fetchedCharacters = response.payload.slice(0, 9);
            setDisplayedCharacters(fetchedCharacters);
            setAllCharacters((prev) => ({
              ...prev,
              [cacheKey]: fetchedCharacters,
            }));
          }
        );
      }
    }
  }, [dispatch, isLoaded, page, storefilters, allCharacters]);

  const handleNext = () => {
    dispatch(setPage(page + 1));
    window.history.replaceState(
      {},
      "",
      `?page=${page + 1}&gender=${filters.gender}`
    );
  };

  const handlePrev = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
      window.history.replaceState(
        {},
        "",
        `?page=${page - 1}&gender=${filters.gender}`
      );
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    dispatch(setPage(1));
    dispatch(setGender(value));
    setFilters((prev) => ({ ...prev, [name]: value }));
    window.history.replaceState({}, "", `?page=1&gender=${value}`);
  };

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
