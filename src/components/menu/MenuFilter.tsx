import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { usePanel } from "@/contexts/PanelContext";

import { useTranslation } from "react-i18next";

interface MenuFilterProps {}

const MenuFilter: React.FunctionComponent<MenuFilterProps> = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const {t}=useTranslation()
  const {courses,dispatch}=usePanel()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
   
    setAnchorEl(null);

  }
  const handleClose1 = () => {
    // privateAxios.get(`/api/course-list?_sort=title&_order=des`)
    // .then((res)=>console.log(res))
    dispatch({type:"statusFilter",payload:"oldest"})
    setAnchorEl(null);

  };
  const handleClose2 = () => {
    // privateAxios.get(`/api/course-list?_sort=created_datetime&_order=asc`)
    // .then((res)=>{console.log(res)
    // dispatch({type:"getCourses", payload: res.data})
    // setAnchorEl(null);})
    dispatch({type:"statusFilter",payload:"newest"})
    setAnchorEl(null);
    
  };
  const handleClose3 = () => {
    dispatch({type:"statusFilter",payload:"default"})
    setAnchorEl(null);

   
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
        {t("sort")}
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
        <MenuItem onClick={handleClose1}>
          {t("title")}
        </MenuItem>
        <MenuItem onClick={handleClose2}>
          {t("date")}
        </MenuItem>
        <MenuItem onClick={handleClose3}>
        {t("default")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MenuFilter;
