// src/hooks/useRickAndMorty.ts

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchCharacters,
  setPage,
  setGender,
} from "../store/slices/rickAndMortySlice";
import { Character } from "../interfaces/characters/character";

const useRickAndMorty = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    status,
    page,
    filters: storefilters,
  } = useSelector((state: RootState) => state.rickAndMorty);

  const [filters, setFilters] = useState({ gender: "" });
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
        dispatch(fetchCharacters({ page, filters: _filters }))
          .then((response: any) => {
            const fetchedCharacters = response.payload.slice(0, 9);
            setDisplayedCharacters(fetchedCharacters);
            setAllCharacters((prev) => ({
              ...prev,
              [cacheKey]: fetchedCharacters,
            }));
          })
          .catch((error) => {
            console.error("Error fetching characters:", error);
            setDisplayedCharacters([]); // Aquí manejas el error
          });
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

  return {
    status,
    page,
    filters,
    displayedCharacters,
    handleNext,
    handlePrev,
    handleFilterChange,
  };
};

export default useRickAndMorty;
