
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from "@mui/icons-material/Category";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import { usePanel } from "@/contexts/PanelContext";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  
  const {mode,language}=usePanel()
  const {t}= useTranslation()
  const {hash,pathname,search}=useLocation()

  return (
    <Stack
      sx={{
        bgcolor:`${mode==="dark"?"#3d4553":"#fff"}`,
        height:{
          sm:"100vh",
        },
        borderRadius:{
          xs:"20px 20px 20px 20px",
          sm:`${language==='en'?"0 20px 0 0":"20px 0px 0 0"}`,

        } 
      }}
    >
      <Stack
        sx={{
          direction: "column",
         // padding: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{width:"60px",height:"60px",borderRadius:"50%",border:"1px solid gray",
            display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0"}}>
          <Avatar alt="Aemy Sharp" src=".././src/assets/images/1.png"  sx={{ width:"56px", height: "56px" }} />
        </Stack>

        <Typography sx={{ fontSize:{xs:"14px",sm:"12px",md:"14px"},paddingLeft:{xs:"10px",sm:"0px"},
          color:`${mode==='light'?"#000":"#fff"}`}} >
            {t("sidebar.name")}
            </Typography>
        <Typography sx={{ fontSize:{xs:"12px",sm:"10px",md:"12px"}, color:`${mode==='light'?"#000":"#fff"}` }}>
        {t("sidebar.admin")}
          </Typography>
      </Stack>
      <nav>
        <List sx={{textAlign:`${language==='fa'?"right":"left"}`}}>
          <Link to="/dashboard">
            <ListItem disablePadding >
              <ListItemButton 
            
                  sx={{textAlign:`${language==='fa'?"right":"left"}`,
                      backgroundColor:`${pathname==="/dashboard"&&(mode==="dark"?"rgba(255, 255, 255, 0.08)":"#25476a")}` }}>
                    
                <ListItemIcon sx={{display:{sm:"none",md:"block"}}}>
                  <HomeIcon sx={{color:`${mode==="dark"?"#fff":pathname==="/dashboard"?"#fff":"#424242"}`}}  />
                </ListItemIcon>
               
                <ListItemText primary={t("sidebar.dashboard")} sx={{color:`${mode==="dark"?"#fff":pathname==="/dashboard"?"#fff":"#424242"}`}} />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/dashboard/courses">
            <ListItem disablePadding>
              <ListItemButton sx={{textAlign:`${language==='fa'?"right":"left"}`,
                                    backgroundColor:`${pathname==="/dashboard/courses"&& (mode==="dark"?"rgba(255, 255, 255, 0.08)":"#25476a")}` }}>
                <ListItemIcon  sx={{display:{sm:"none",md:"block"}}} >
                  <ListIcon sx={{color:`${mode==="dark"?"#fff":pathname==="/dashboard/courses"?"#fff":"#424242"}`}} />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.courses")} sx={{color:`${mode==="dark"?"#fff":pathname==="/dashboard/courses"?"#fff":"#424242"}`}} />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/dashboard/categories">
            <ListItem disablePadding>
              <ListItemButton sx={{textAlign:`${language==='fa'?"right":"left"}`,
                                   backgroundColor:`${pathname==="/dashboard/categories"&& (mode==="dark"?"rgba(255, 255, 255, 0.08)":"#25476a")}` }}>
                <ListItemIcon  sx={{display:{sm:"none",md:"block",}}} >
                  <CategoryIcon sx={{color:`${mode==="dark"?"#fff":pathname==="/dashboard/categories"?"#fff":"#424242"}`}} />
                </ListItemIcon>
                <ListItemText primary={t("sidebar.categories")} sx={{color:`${mode==="dark"?"#fff":pathname==="/dashboard/categories"?"#fff":"#424242"}`}} />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
    </Stack>
  );
};

export default Sidebar;




