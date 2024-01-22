import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Loading() {
  return (
    <Box sx={{ display: "flex",margin:"20px" }}>
      <CircularProgress />
    </Box>
    
  );
}

export default Loading;
