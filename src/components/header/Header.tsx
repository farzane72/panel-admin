
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import {  styled } from "@mui/material";
import { Pets } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { InputBase } from "@mui/material";

interface HeaderProps {}

const StyledToolbar = styled(Toolbar)({
  display: "flex",
 // justifyContent: "space-between",
 alignItems:"center"
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
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const Header: React.FunctionComponent<HeaderProps> = () => {
  return (
    <AppBar sx={{ bgcolor: "#25476a", boxShadow: "none", mt: "2px" }}>
      <StyledToolbar>
        <Grid container>
          <Grid item xs={2} md={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Pets sx={{ display: { xs: "block", sm: "block" } }} />
              <Typography
                variant="h6"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                LOGO
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={10} md={10}>
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
            > */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <MenuIcon />
                  <Search>
                    <InputBase
                      placeholder="Type for search..."
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
              <Grid item xs={12} md={6}>
                <Stack direction="row" justifyContent={"flex-end"} spacing={2} alignItems="center">
                  <DarkModeIcon />
                  <Badge badgeContent={4} color="primary">
                    <NotificationsIcon />
                  </Badge>

                  <LogoutIcon />
                </Stack>
              </Grid>
            </Grid>

            {/* </Stack> */}
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
