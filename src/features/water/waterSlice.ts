import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WaterState {
    current: number
    dailyGoal: number
    history: {date: string; amount: number}[];
    lastUpdated: string | null
}

const loadState = (): WaterState => {
    try {
        const saved = localStorage.getItem("waterState");
        return saved ? JSON.parse(saved) : {current: 0, dailyGoal: 2000, history: [], lastUpdated: null}
    }
    catch {
        return {current: 0, dailyGoal: 2000, history: [], lastUpdated: null}
    }
}

const initialState: WaterState = loadState()
const isNewDay = (last: string | null) => {
    if (!last) return false;
    const lastDate = last.split("T")[0];
    const today = new Date().toISOString().split("T")[0];
    return lastDate !== today;
};
const waterSlice = createSlice({
    name: 'water',
    initialState,
    reducers: {
        addWater: (state, action: PayloadAction<number>) => {
            const today = new Date().toISOString().split("T")[0]

            if (isNewDay(state.lastUpdated)) {
                if (state.current > 0) {
                    state.history.push({
                        date: state.lastUpdated!.split("T")[0],
                        amount: state.current
                    })
                }
                state.current = 0
            }

            state.current += action.payload;
            
            const existingDay = state.history.find((d) => d.date === today);
            if (existingDay) {
                existingDay.amount = state.current;
            } else {
                state.history.push({date: today, amount: state.current})
            }
            state.lastUpdated = new Date().toISOString();
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