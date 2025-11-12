import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Paper, Typography } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

export default function WeeklyChart() {
    const history = useSelector((state: RootState) => state.water.history);
    const dailyGoal = useSelector((state: RootState) => state.water.dailyGoal);

    const today = new Date();
    const data = Array.from({length: 7}).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - i))
        const dateStr = date.toISOString().split("T")[0]
        const dayRecord = history.find((d) => d.date === dateStr);
        return {
            day: date.toLocaleDateString("ru-RU", { weekday: "short" }),
            amount: dayRecord ? dayRecord.amount : 0,
        }
    })
    return (
        <Paper sx={{ mt: 5, p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Статистика за неделю
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(val) => `${val} мл`} />
                        <Bar dataKey="amount" fill="#2196f3" radius={[5, 5, 0, 0]}/>
                </BarChart>
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                >
                <Typography
                variant="body1"
                align="center"
                sx={{
                    mt: 6,
                    p: 1.5,
                    display: "inline-block",
                    borderRadius: 2,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    color: "primary.main",
                    background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)"
                        : "linear-gradient(90deg, #0d47a1 0%, #1565c0 100%)",
                    boxShadow: 1,
                }}
                >
                🎯 Цель: <span style={{ color: "#1976d2" }}>{dailyGoal} мл</span> в день
                </Typography>
                </motion.div>
            </ResponsiveContainer>
        </Paper>
    )
}