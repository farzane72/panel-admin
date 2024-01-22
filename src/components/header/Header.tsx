import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";
import { Pets } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { InputBase } from "@mui/material";
import { usePanel } from "@/contexts/PanelContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChangeLang from "../change-lang/ChangeLang";
import { useTranslation } from "react-i18next";

interface HeaderProps {}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
});
const Search = styled("div")(({ theme }) => ({
  padding: "5px 20px",
  borderRadius: theme.shape.borderRadius,
  color: "red",
  width: "100%",
  ":hover ": {
    backgroundColor: "#e8eaf6",
  },
}));



const Header: React.FunctionComponent<HeaderProps> = () => {
  const { mode,dispatch,language} = usePanel();
  const {t}=useTranslation()

  //------------------------------------------------------------------------------------------------------
  function handelDrakMode(){
    console.log("dark");
    dispatch({type:"mode",payload:"dark"})
    localStorage.setItem("mode", "dark");
  
 

  }
  function handelLightMode(){
    console.log("light");
    dispatch({type:"mode",payload:"light"})
    localStorage.setItem("mode", "light");
  }
  return (
    <AppBar sx={{  bgcolor: `${mode==="dark"?"#343b47":"#25476a"}`, boxShadow: "none", mt: "2px",backgroundImage:"none" }}>
      <StyledToolbar>
        <Grid container>
          <Grid item xs={2} md={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Pets sx={{ display: { xs: "block" } }} />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", md: `${language==="en"?"block":""}` } }}
              >
                LOGO
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={10} md={10}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* <MenuIcon /> */}
                  <Search sx={{ display: { xs: "none", md: "block" } }}>
                    <InputBase
                      placeholder={t("header.search")}
                      sx={{
                        input: {
                          opacity: 1,
                          "&::placeholder": {
                            color: "#fff",
                            opacity: 1,
                          },
                          "&:hover::placeholder ": {
                            color: "#25476a",
                          },
                        },
                      }}
                    />
                  </Search>
                </Stack>
              </Grid>
              <Grid item xs={6} md={6}>
                <Stack
                  direction="row"
                  justifyContent={"flex-end"}
                  spacing={3}
                  alignItems="center"
                  sx={{margin:"1px"}}
                >
                  

                  <Badge badgeContent={4} color="primary"   >
                    <NotificationsIcon sx={{marginLeft: `${language==="fa"?"10px":0}`}}  />
                  </Badge>
                  {mode==="dark" ? 
                      <LightModeIcon onClick={()=>handelLightMode()} sx={{cursor:"pointer"}}/> :

                      <DarkModeIcon  onClick={()=>handelDrakMode()}   sx={{cursor:"pointer"}} />
                  }
                  <LogoutIcon sx={{cursor:"pointer"}} onClick={()=>{localStorage.removeItem("accessToken"),
                                                        localStorage.removeItem("refreshToken")}} />
                  <ChangeLang />
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
