import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WaterState {
    current: number
    dailyGoal: number
    history: {date: string; amount: number}[]
}

const initialState: WaterState = {
    current: 0,
    dailyGoal: 2000,
    history: [],
}

const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        addWater: (state, action: PayloadAction<number>) => {
            state.current += action.payload;
            state.history.push({
                date: new Date().toISOString(),
                amount: action.payload
            })
        },
        resetDay: (state) => {
            state.current = 0;
            state.history = [];
        },
        setDailyGoal: (state, action: PayloadAction<number>) => {
            state.dailyGoal = action.payload
        }
    },
})

export const { addWater, resetDay, setDailyGoal } = waterSlice.actions;
export default waterSlice.reducer;