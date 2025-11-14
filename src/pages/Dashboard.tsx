import { Button, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/ui/uiSlice";
import type { RootState } from "../app/store";
import { addWater } from "../features/water/waterSlice";
import WeeklyChart from "../components/WeeklyChart";
import Page from "../components/Page";
import { motion } from "framer-motion";

export default function Dashboard() {
    const dispatch = useDispatch();
    const {current, dailyGoal} = useSelector((state: RootState) => state.water);

    const progress = Math.min((current / dailyGoal) * 100, 100)

    const quickAdd = (amount: number) => {
        dispatch(addWater(amount))
    }
    return (
        <Page>
            <motion.div initial={{opacity: 0, y: 20}} animate={{opacity:1, y: 0}} transition={{duration: 0.5}}>
                <Container sx={{ mt: 10, textAlign: "center" }}>
                    <Typography variant="h5" gutterBottom>
                        Сегодня 💧
                    </Typography>
                    <Typography variant="h3" color="primary" gutterBottom>
                        {current} мл
                    </Typography>
                    <LinearProgress variant="determinate" value={progress} sx={{
                        height: 10,
                        borderRadius: 5,
                        mb: 3,
                        "& .MuiLinearProgress-bar": {backgroundColor: progress >= 100 ? "#00c853" : "#2196f3",},}}
                    />

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Цель: {dailyGoal} мл ({progress.toFixed(0)}%)
                    </Typography>

                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                        {[100, 250, 500].map((amount) => (
                            <Button key={amount} variant="contained" color="primary" onClick={() => quickAdd(amount)}>+ {amount} мл</Button>
                        ))
                        
                        }
                    </Stack>

                    <Button variant="outlined" onClick={() => dispatch(openModal())}>
                        Ввести своё количество
                    </Button>
                    <WeeklyChart/>
                </Container>
            </motion.div>
        </Page>
    )
}