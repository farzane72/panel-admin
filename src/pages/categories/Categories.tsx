import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";


import { useEffect, useState } from "react";
//------------------------------------------------------------------------------------search

import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { privateAxios } from "@/services/privateAxios";
import Search from "@/components/search/Search";
import MenuFilter from "@/components/menu/MenuFilter";
import { usePanel } from "@/contexts/PanelContext";
import Button from "@mui/material/Button";



declare module "@mui/material/styles" {
  interface Palette {
    ochre: Palette["primary"];
  }

  interface PaletteOptions {
    ochre?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include an ochre option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    ochre: true;
  }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BoxIcon = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  //alignContent:"center",
  alignItems: "center",
  // padding: "10px 10px",
  borderRadius: "5px",
  backgroundColor: "#e7ecf3",
  color: "#373c43",
  width: "30px",
  height: "30px",
  ":hover ": {
    color: "#373c43",
    backgroundColor: "#e6ebf2",
    borderColor: "#e4e9f2",
    boxShadow:
      " 0 0.1rem 0.5rem rgba(225,231,240,.5), 0 0.25rem 1rem rgba(55,60,67,.2)",
  },
}));



const  Categories= () => {
  //-------------------------------------------------------------------------menu
  
  //--------------------------------------------------------pagination----------
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //-------------------------------------------------------------------------context
  const { courses, dispatch,categories } = usePanel();
  //---------------------------------------------------------------------------function
  console.log(categories);
  function handleDelete(id: number | string) {
    privateAxios
      .delete(`/api/course-category/${id}/`)
      .then(() => dispatch({ type: "deleteCategory", payload: id }));
  }
  //-------------------------------------------------------------------------------
 
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: "20px " }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Search />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            <MenuFilter />
          </Grid>
        </Grid>
      </Box>
      <Link to="/dashboard/addcategory">
        <Box sx={{ padding: "20px" }}>
          <Button
            variant="contained"
            sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" } }}
          >
            Add New Category
          </Button>
        </Box>
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, mt: "10px" }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #000" }}>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              {/* <StyledTableCell>Teacher</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell> */}
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  {row.id}
                  
                </StyledTableCell>
                <StyledTableCell>
                  <Avatar
                    src={row.image as any} 
                    variant="rounded"
                  />
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                {/* <StyledTableCell>{row.teacher}</StyledTableCell>
                <StyledTableCell>{row.category}</StyledTableCell>
                <StyledTableCell>{row.duration}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell> */}
                <StyledTableCell>
                  <Stack spacing={1} direction="row" sx={{}}>
                    <BoxIcon onClick={() => handleDelete(row.id)}>
                      <DeleteOutlineOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </BoxIcon>
                    <BoxIcon sx={{}}>
                      <EditOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </BoxIcon>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      ></Box>
    </>
  );
};

export default Categories;
