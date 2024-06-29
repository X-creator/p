import Box from "@mui/material/Box";
import AuthForm from "widgets/auth-form";
import video from "shared/assets/video.mp4";

export const Auth = () => (
  <Box
    component="main"
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100dvh",
      minWidth: 320,
    }}
  >
    <Box
      component="video"
      src={video}
      autoPlay
      muted
      playsInline
      loop
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100dvh",
        objectFit: "cover",
      }}
    />
    <AuthForm />
  </Box>
);
