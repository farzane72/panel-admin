import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { usePanel } from "@/contexts/PanelContext";
import { privateAxios } from "@/services/privateAxios";

interface MenuFilterProps {}
//GET /posts?_sort=views&_order=asc
const MenuFilter: React.FunctionComponent<MenuFilterProps> = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {courses,dispatch}=usePanel()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
   
    setAnchorEl(null);

    //created_datetime
  }
  const handleClose1 = () => {
    // privateAxios.get(`/api/course-list?_sort=title&_order=des`)
    // .then((res)=>console.log(res))
    dispatch({type:"statusFilter",payload:"title"})
    setAnchorEl(null);

    //created_datetime
  };
  const handleClose2 = () => {
    // privateAxios.get(`/api/course-list?_sort=created_datetime&_order=asc`)
    // .then((res)=>{console.log(res)
    // dispatch({type:"getCourses", payload: res.data})
    // setAnchorEl(null);})
    dispatch({type:"statusFilter",payload:"date"})
    setAnchorEl(null);
    
  };
  const handleClose3 = () => {
    dispatch({type:"statusFilter",payload:"default"})
    setAnchorEl(null);

    //created_datetime
  };
  return (
    <Box>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Sort by
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose1}>Title (asc)</MenuItem>
        <MenuItem onClick={handleClose2}>
          Date (des)
         
        </MenuItem>
        <MenuItem onClick={handleClose3}>
          Default
         
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuFilter;
