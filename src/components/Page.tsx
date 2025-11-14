import { Container } from "@mui/material";

export default function Page({children}: {children: React.ReactNode}) {
    return (
        <Container sx={{
            pt: 12,
            pb: 4,
            minHeight: "100vh",
            width: "100%",
            maxWidth: "450px",
            mx: "auto",
            }}>
            {children}
        </Container>
    )
}