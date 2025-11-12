import { Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Controller, useForm } from "react-hook-form";
import { resetDay, setDailyGoal } from "../features/water/waterSlice";

interface FormData {
  goal: number;
}
const Settings = () => {
  const dispatch = useDispatch();
  const dailyGoal = useSelector((state: RootState) => state.water.dailyGoal)
  const {handleSubmit, control, reset, formState: { errors }} = useForm<FormData>({
    defaultValues: {goal: dailyGoal}
  });
  const onSubmit = (data: FormData) => {
    dispatch(setDailyGoal(data.goal))
    reset({goal: data.goal})
  }
  return (
    <Container sx={{ mt: 10,  textAlign: "center"}}>
        <Typography variant="h5" gutterBottom>
            ⚙️ Настройки
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack>
            <Controller name="goal" control={control} rules={{
              required: 'Введите цель',
              min: { value: 500, message: "Минимум 500 мл" },
              max: { value: 5000, message: "Максимум 5000 мл" },
            }} render={({field}) => (
              <TextField {...field} onChange={(e) => field.onChange(+e.target.value)} label='Дневная цель (мл)' type="number" fullWidth variant="outlined" 
              error={!!errors.goal} helperText={errors.goal?.message}
              />
            )}/>
            <Button type="submit" variant="contained">
              Сохранить день
            </Button>
            <Button variant="outlined" color="error" onClick={() => dispatch(resetDay())}>
              Сбросить день
            </Button>
          </Stack>
        </form>
    </Container>
  )
}

export default Settings
