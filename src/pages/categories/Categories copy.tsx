import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
//import Button from "@mui/material/Button";
//import ButtonGroup from "@mui/material/ButtonGroup";
//import { createTheme } from "@mui/material/styles";
import { createTheme } from "@mui/material";
//-------------------------------------------------------------------------menu
//import Menu from "@mui/material/Menu";
//import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
//------------------------------------------------------------------------------------search
//import TextField from "@mui/material/TextField";
//import Autocomplete from "@mui/material/Autocomplete";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { privateAxios } from "@/services/privateAxios";
import Search from "@/components/search/Search";
import MenuFilter from "@/components/menu/MenuFilter";

interface CategoriesProps {}

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

const theme = createTheme({
  palette: {
    ochre: {
      main: "#25476a",
      light: "#25476a",
      dark: "#25476a",
      contrastText: "#fff",
    },
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    backgroundColor: "#fff",
    // color: theme.palette.common.white,
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
function createData(
  protein: string,
  name: string,
  calories: number,
  fat: number,
  carbs: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(".././src/assets/images/1.png", "Frozen yoghurt", 159, 6.0, 24),
  createData(
    ".././src/assets/images/1.png",
    "Ice cream sandwich",
    237,
    9.0,
    37
  ),
  createData(".././src/assets/images/1.png", "Eclair", 262, 16.0, 24),
  createData(".././src/assets/images/1.png", "Cupcake", 305, 3.7, 67),
  createData(".././src/assets/images/1.png", "Gingerbread", 356, 16.0, 49),
  createData(".././src/assets/images/1.png", "protein", 356, 16.0, 78),
];

const Categories: React.FunctionComponent<CategoriesProps> = () => {
  //-------------------------------------------------------------------------menu
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  //--------------------------------------------------------pagination----------
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //-------------------------------------------------------------------------menu
  useEffect(() => {
    privateAxios.get("/course-category/").then((res) => console.log(res.data));
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: "20px " }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {/* <Box>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={top100Films.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Box> */}
            <Search />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end" }}>
            {/* <Box>
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
                <MenuItem onClick={handleClose}>Name</MenuItem>
                <MenuItem onClick={handleClose}>Date</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Box> */}
            <MenuFilter />
          </Grid>
        </Grid>
      </Box>

      {/* <ThemeProvider theme={theme}>
          <ButtonGroup
            variant="contained"
            // color="ochre"
            aria-label="outlined primary button group"
            sx={{ marginLeft: "20px" }}
          >
            <Button color="ochre">Name</Button>
            <Button color="ochre">Date</Button>
            {/* <Button color="ochre">Three</Button> 
          </ButtonGroup>
        </ThemeProvider> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, mt: "10px" }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #000" }}>
              <StyledTableCell>Course Name</StyledTableCell>
              {/* <StyledTableCell align="right">Course Name</StyledTableCell> */}
              <StyledTableCell>Course Prise</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
              {/* <StyledTableCell >Image</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    <Avatar
                      alt="Aemy Sharp"
                      src={row.protein}
                      variant="rounded"
                    />
                    {row.name}
                  </Box>
                </StyledTableCell>
                {/* <StyledTableCell >
                 
                </StyledTableCell> */}
                <StyledTableCell>{row.calories}</StyledTableCell>
                <StyledTableCell>{row.fat}</StyledTableCell>
                <StyledTableCell>
                  <Stack spacing={1} direction="row" sx={{}}>
                    <BoxIcon>
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
                  {/* {row.carbs} */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <ThemeProvider theme={theme}>
          <Typography>Page: {page}</Typography>
          <Pagination count={10} variant="outlined" shape="rounded"  />
        </ThemeProvider>
      </Box>
    </>
  );
};


export default Categories;
