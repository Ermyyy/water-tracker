import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WaterState {
    current: number
    dailyGoal: number
    history: {date: string; amount: number}[]
}

const loadState = (): WaterState => {
    try {
        const saved = localStorage.getItem("waterState");
        return saved ? JSON.parse(saved) : {current: 0, dailyGoal: 2000, history: []}
    }
    catch {
        return {current: 0, dailyGoal: 2000, history: []}
    }
}

const initialState: WaterState = loadState()

const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        addWater: (state, action: PayloadAction<number>) => {
            const today = new Date().toISOString().split("T")[0]
            state.current += action.payload;

            const existingDay = state.history.find((d) => d.date === today);
            if (existingDay) {
                existingDay.amount += action.payload;
            } else {
                state.history.push({date: today, amount: action.payload})
            }
            localStorage.setItem("waterState", JSON.stringify(state))
        },
        resetDay: (state) => {
            state.current = 0;
            state.history = [];
            localStorage.setItem("waterState", JSON.stringify(state))
        },
        setDailyGoal: (state, action: PayloadAction<number>) => {
            state.dailyGoal = action.payload;
            localStorage.setItem("waterState", JSON.stringify(state));
        }
    },
})

export const { addWater, resetDay, setDailyGoal } = waterSlice.actions;
export default waterSlice.reducer;