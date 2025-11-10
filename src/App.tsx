import { AppBar, Container, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "./app/store"
import { toggleTheme } from "./features/ui/uiSlice"
import SettingsPage from "./pages/Settings";
import { Brightness4, Brightness7, Settings } from "@mui/icons-material"
import { Route, Routes, Link } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import AddWaterModal from "./components/AddWaterModal";


function App() {
  const dispatch = useDispatch()
  const themeMode = useSelector((state: RootState) => state.ui.themeMode)
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }} component={Link} to="/">
            💧 Глоточек
          </Typography>
          <IconButton color="inherit" onClick={() => dispatch(toggleTheme())} sx={{ mr: 1 }}>
            {themeMode === 'light' ? <Brightness4/> : <Brightness7/>}
          </IconButton>
          <IconButton color="inherit" component={Link} to="/settings">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
        </Routes>
      </Container>
      <AddWaterModal/>
    </>
  )
}

export default App
