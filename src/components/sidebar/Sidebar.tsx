import {
  
 // List,
  //ListItem,
  //ListItemIcon,
 // ListItemButton,
  //ListItemText,
  //MenuItem,
  //MenuList,
} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CategoryIcon from "@mui/icons-material/Category";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
interface SidebarProps {}

const Sidebar: React.FunctionComponent<SidebarProps> = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsClicked(false);
  }, [isClicked]);

  const handleClick = () => {
    // console.log('Item clicked!');
    setIsClicked(true);
  };
  const handleClick2 = () => {
    // console.log('Item clicked!');
    setIsClicked(true);
    navigate("/dashboard/courses");
  };
  const handleClick3 = () => {
    // console.log('Item clicked!');
    setIsClicked(true);
    navigate("/dashboard/categories");
  };

  return (
    <Stack
      sx={{
        bgcolor: "#fff",
        height: "100vh",
        borderRadius: "0 20px 0 0",
        ml: "10px",
      }}
    >
      <Stack
        sx={{
          direction: "column",
          p: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack sx={{width:"60px",height:"60px",borderRadius:"50%",border:"1px solid gray",display:"flex",justifyContent:"center",alignItems:"center",margin:"10px 0"}}>
          <Avatar alt="Aemy Sharp" src=".././src/assets/images/1.png"  sx={{ width:"56px", height: "56px" }} />
        </Stack>

        <Typography sx={{ fontSize: "14px" }}>Farzane jahanpour</Typography>
        <Typography sx={{ fontSize: "12px" }}>admin</Typography>
      </Stack>
      <nav>
        <List>
          <Link to="/dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/dashboard/courses">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Courses" />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/dashboard/categories">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Catgories" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </nav>
    </Stack>
  );
};

export default Sidebar;

{
  /* <MenuList>
          <MenuItem Mui-selected Mui-focusVisible className="active-green" >
            <ListItemIcon>
            <HomeIcon MuiIcon-colorError sx={{ color: "#fff",}} />
            </ListItemIcon>
            {/* <ListItemText >Cut</ListItemText> 
            <ListItemText primary="Dashboard" sx={{ color: "#fff" }} />
           
          </MenuItem>
          <MenuItem selected className="active-green">
            <ListItemIcon>
            <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Cources" />
            
          </MenuItem>

          <MenuItem selected className="active-green">
            <ListItemIcon>
               <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Catgories" />
            
          </MenuItem>
         
          
</MenuList> */
}

// className={isClicked ? 'hover-green active-green' : ''}
