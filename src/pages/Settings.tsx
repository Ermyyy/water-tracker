import { Container, Typography } from "@mui/material"


const Settings = () => {
  return (
    <Container sx={{ mt: 10 }}>
        <Typography variant="h5" gutterBottom>
            ⚙️ Настройки
        </Typography>
        <Typography>Здесь будут цели и тема</Typography>
    </Container>
  )
}

export default Settings
