import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  themeMode: "light" | "dark";
  modalOpen: boolean;
}

const initialState: UiState = {
  themeMode: "light",
  modalOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.themeMode = state.themeMode === "light" ? "dark" : "light";
        },
        openModal: (state) => {
            state.modalOpen = true;
        },
        closeModal: (state) => {
            state.modalOpen = false;
        },
    }
})

export const { toggleTheme, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;