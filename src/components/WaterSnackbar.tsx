import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

export default function WaterShackbar() {
    const current = useSelector((state: RootState) => state.water.current);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (current > 0) {
            setOpen(true)
        }
    }, [current]);

    return (
        <Snackbar open={open} autoHideDuration={1500} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "bottom", horizontal: "center"}}>
            <Alert onClose={() => setOpen(false)} severity="info" sx={{ width: "100%" }}>
                Вода добавлена! 💧
            </Alert>
        </Snackbar>
    )
}