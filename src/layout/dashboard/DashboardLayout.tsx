

import { Outlet } from "react-router-dom";
import { useNavigation,useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Loading from "@/components/loading/loading";
import Sidebar from "@/components/sidebar/Sidebar";
import DashboardText from "@/components/dashboard/DashboardText";
import Header from "@/components/header/Header";
import { useEffect } from "react";
import { Toaster, ToastBar ,toast} from "react-hot-toast";

interface DashboardLayoutProps {}

const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = () => {
  const navigation = useNavigation();
  const navigate=useNavigate()
  console.log(navigation);
  const isLoading = navigation.state === "loading";
  const token=localStorage.getItem("accessToken")
  useEffect(()=>{
      if(!token){
        navigate("/login")
      }
  },[])
  return (
    <div>
      {/* <Header />
      <Sidebar />

      <Outlet /> */}

      <>
      <Stack
        sx={{
          width: "100%",
          bgcolor: "#e8eaf6",
          height: "100vh",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            //bgcolor: "#1a237e",
            bgcolor: "#25476a",
            height: "400px",
            borderRadius: "0 0 5% 5%",
          }}
        >
          {isLoading && <Loading />}
          <Stack direction="column">
            <Header />
            {/* <Stack direction="row" spacing={4}> */}
            <Grid container sx={{ mt: "80px" }}>
              <Grid item xs={12} md={2}>
                <Sidebar />
              </Grid>
              <Grid item xs={12} md={10}>
                <main >
                  <DashboardText />
                  <Stack sx={{mt:"20px",mx:"25px",bgcolor:"#fff",borderRadius:"10px", width:"auto"}} >
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
    </div>
  );
};

export default DashboardLayout;
