import { Stack, Typography } from "@mui/material";
interface DashboardTextProps {}

const DashboardText: React.FunctionComponent<DashboardTextProps> = () => {
  return (
    <Stack sx={{width:"50%",color:"#fff",pl:"18px",mt:"10px"}}>
      <Typography variant="h4" sx={{pb:"4px"}}>Dashboard</Typography>
      <Typography variant="h5" sx={{pb:"4px"}}>Welcome back to the Dashboard.</Typography>
      <Typography  sx={{ fontSize: "16px"}}>
        Scroll down to see quick links and overviews of your Server, To do list
        Order status or get some Help using Nifty.
        (for other pages menu) 
     
      </Typography>
    </ Stack>
  );
};

export default DashboardText;
