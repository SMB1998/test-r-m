import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../interfaces/characters/character";

interface RickAndMortyState {
  characters: Character[];
  status: "idle" | "loading" | "succeeded" | "failed";
  page: number;
  filters: {
    gender: string;
  };
  error: string | null;
}

const API_URL = "https://rickandmortyapi.com/api/character";

const initialState: RickAndMortyState = {
  characters: [],
  status: "idle",
  page: 1,
  filters: {
    gender: "",
  },
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  "rickAndMorty/fetchCharacters",
  async ({ page, filters }: { page: number; filters: any }) => {
    const { gender } = filters;
    const queryParams = new URLSearchParams({
      page: String(page),
      ...(gender && { gender }),
    }).toString();

    const response = await fetch(`${API_URL}?${queryParams}`);
    const data = await response.json();

    return data.results; // Retorna los resultados
  }
);

const rickAndMortySlice = createSlice({
  name: "rickAndMorty",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.filters.gender = action.payload;
    },
    persistState: (state) => {
      localStorage.setItem("rickAndMortyState", JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<Character[]>) => {
          state.status = "succeeded";
          state.characters = action.payload;
        }
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch characters";
      });
  },
});

export const { setPage, setGender, persistState } = rickAndMortySlice.actions;

export default rickAndMortySlice.reducer;
