import { Outlet } from "react-router-dom";
import { useNavigation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Loading from "@/components/loading/loading";
import Sidebar from "@/components/sidebar/Sidebar";
import DashboardText from "@/components/dashboard/DashboardText";
import Header from "@/components/header/Header";
import { useEffect } from "react";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { usePanel } from "@/contexts/PanelContext";


interface DashboardLayoutProps {}



const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = () => {

  const {mode}=usePanel()
  const navigation = useNavigation();
  const navigate = useNavigate();
  console.log(navigation);
  const isLoading = navigation.state === "loading";
  const token = localStorage.getItem("accessToken");

  const darkTheme = createTheme({
    palette: {
      mode:(mode==="dark")? "dark":"light",
    },
  });


  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div >
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <>
          <Stack
            sx={{
              width: "100%",
              bgcolor:`${mode==="dark"?"#343b47":"#e8eaf6"}` ,
              height: "200vh",
              //backgroundAttachment: "fixed",
            }}
          >
            <Stack
              sx={{
                width: "100%",
                //bgcolor: "#1a237e",
                bgcolor: `${mode==="dark"?"#343b47":"#25476a"}`,
                height: "400px",
                borderRadius: "0 0 5% 5%",
              }}
            >
              {isLoading && <Loading />}
              <Stack direction="column">
                <Header />
                {/* <Stack direction="row" spacing={4}> */}
                <Grid container sx={{ mt: "80px" }}>
                  <Grid item xs={12} sm={2} md={2}>
                    <Sidebar />
                  </Grid>
                  <Grid item xs={12} sm={10} md={10}>
                    <main>
                      <DashboardText />
                      <Stack
                        sx={{
                          mt: { xs: "10px", sm: "20px" },
                          mx: { xs: "0px", sm: "25px" },
                        
                          bgcolor:`${mode==="dark"?"#3d4553":"#fff"}`,
                          borderRadius: "10px",
                          width: "auto",
                        }}
                      >
                        <Outlet />
                      </Stack>
                    </main>
                  </Grid>
                </Grid>
              </Stack>
              {/* </Stack> */}
            </Stack>
          </Stack>
          <Toaster
            containerStyle={{
              top: 20,
              // left: 20,
              // bottom: 20,
              // right: 20,
            }}
            //position="top-left"
            reverseOrder={false}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                // background: "#363636",
                background: "#363636",
                color: "#fff",
              },

              // custom: {

              //   containerStyle={{
              //     top: 50%,
              //     left: 50%,
              //     transform: translate(-50%, -50%)
              //   }}
              // },
            }}
          />
        </>
      </ThemeProvider>
    </div>
  );
};

export default DashboardLayout;

