
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { closeModal } from "../features/ui/uiSlice";
import { Controller, useForm } from "react-hook-form";
import { addWater } from "../features/water/waterSlice";

interface FormData {
  amount: number;
}


export default function AddWaterModal() {
    const dispatch = useDispatch();
    const open = useSelector((state: RootState) => state.ui.modalOpen);
    const {handleSubmit, control, reset, formState: { errors },} = useForm<FormData>({
        defaultValues: {amount: 0},
    });

    const onSubmit = (data:FormData) => {
        dispatch(addWater(Number(data.amount)))
        dispatch(closeModal());
        reset()
    }
    return (
        <Dialog open={open} onClose={() => dispatch(closeModal())}>
            <DialogTitle>Добавить воду 💧</DialogTitle>
            <DialogContent>
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller name="amount" control={control} 
                            rules={{
                                required: "Введите количество воды", 
                                min: { value: 10, message: "Минимум 10 мл" },
                                max: { value: 2000, message: "Максимум 2000 мл" },
                            }}
                            render={({field}) => (
                                <TextField {...field} autoFocus margin="dense" label="Количество (мл)"
                                type="number" fullWidth variant="outlined" error={!!errors.amount} helperText={errors.amount?.message}
                                />
                            )}
                            />
                            <DialogActions>
                                <Button onClick={() => dispatch(closeModal())}>Отмена</Button>
                                <Button type="submit" variant="contained">Добавить</Button>
                            </DialogActions> 
                        </form>
                    </DialogContent>
            </DialogContent>
        </Dialog>
    )
}