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
import { ThemeProvider } from "@mui/material/styles";
//mport Button from "@mui/material/Button";
//-------------------------------------------------------------------------menu
//import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
//------------------------------------------------------------------------------------search
//import TextField from "@mui/material/TextField";
//import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { privateAxios } from "@/services/privateAxios";
import { publicAxios } from "@/services/publicAxios";
import Search from "@/components/search/Search";
import MenuFilter from "@/components/menu/MenuFilter";
import { usePanel } from "@/contexts/PanelContext";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ToastWithButton from "@/components/toast/ToastWithButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface CoursesProps {}

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

// function createData(
//   Id: number,
//   Title: string,
//   Teacher: string,
//   Category: string,
//   Dutation: string,
//   Price: number,
//   Images: []
// ) {
//   return { Id,Title,Teacher,Category,Dutation,Price,Images };
// }

// const rows = [
//   createData(".././src/assets/images/1.png", "Frozen yoghurt", 159, 6.0, 24),
//   createData(
//     ".././src/assets/images/1.png",
//     "Ice cream sandwich",
//     237,
//     9.0,
//     37
//   ),
//   createData(".././src/assets/images/1.png", "Eclair", 262, 16.0, 24),
//   createData(".././src/assets/images/1.png", "Cupcake", 305, 3.7, 67),
//   createData(".././src/assets/images/1.png", "Gingerbread", 356, 16.0, 49),
//   createData(".././src/assets/images/1.png", "protein", 356, 16.0, 78),
// ];

const Courses: React.FunctionComponent<CoursesProps> = () => {
  //-------------------------------------------------------------------------menu
  //   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //   const open = Boolean(anchorEl);
  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };
  //   const handleClose = () => {
  //     setAnchorEl(null);
  //   };
  //--------------------------------------------------------pagination----------
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  //-------------------------------------------------------------------------context
  const { courses, dispatch, searchResults, statusFilter } = usePanel();
  //---------------------------------------------------------------------------function

  // function handleDelete(id: number | string, title: string) {
  //   console.log("hello");
  //   <ToastWithButton
  //     id={id}
  //     title="Delete Course"
  //     question={`Are you sure to delete ${title}?`}
  //   />;
  // }
  //-------------------------------------------------------------------------------

  useEffect(() => {
    if (statusFilter === "default") {
      privateAxios.get(`/api/course-list/?page=${page}&limit=5`).then((res) => {
        console.log("test", res.data.results);
        dispatch({ type: "getCourses", payload: res.data.results });
      });
    }

    if (statusFilter === "title") {
      privateAxios
        .get(`/api/course-list?_sort=title&_order=des&page=${page}&limit=5`)
        .then((res) => {
          console.log("title", res);
           dispatch({ type: "getCourses", payload: res.data.results });
        });
    }

    if (statusFilter === "date") {
      privateAxios
        .get(
          `/api/course-list?_sort=created_datetime&_order=asc&page=${page}&limit=5`
        )
        .then((res) => {
          console.log("date", res.data.results);
          dispatch({ type: "getCourses", payload: res.data.results });
        });
    }
  }, [dispatch, page, statusFilter]);
  //---------------------------------------------------------------------------------
  const navigate = useNavigate();
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
      <Box
        sx={{ padding: "20px" }}
        onClick={() => {
          dispatch({ type: "statusFormik", payload: "add" });
          navigate("/dashboard/addcourse");
        }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "#25476a", ":hover": { bgcolor: "#25476a" } }}
        >
          Add New Course
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700, mt: "10px" }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #000" }}>
              <StyledTableCell>Id</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Teacher</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.length > 0
              ? searchResults.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>{row.id}</StyledTableCell>
                    <StyledTableCell>
                      <Avatar
                        // alt="Aemy Sharp"
                        src={row.images.length === 0 ? "" : row.images[0].image}
                        variant="rounded"
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row.title}</StyledTableCell>
                    <StyledTableCell>{row.teacher}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    <StyledTableCell>{row.duration}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>
                      <Stack spacing={1} direction="row" sx={{}}>
                        <ToastWithButton
                          id={row.id}
                          title="Delete Course"
                          question={`Are you sure to delete ${row.title}?`}
                        />
                        <BoxIcon
                          sx={{}}
                          onClick={() => {
                            dispatch({ type: "statusFormik", payload: "edit" });
                            navigate(`/dashboard/editcourse/${row.id}`);
                          }}
                        >
                          <EditOutlinedIcon
                            sx={{ width: "20px", height: "20px" }}
                          />
                        </BoxIcon>
                        <BoxIcon
                          onClick={() => {
                            navigate(
                              `/dashboard/courses/singlecourse/${row.id}`
                            );
                          }}
                        >
                          <VisibilityIcon
                            sx={{ width: "20px", height: "20px" }}
                          />
                        </BoxIcon>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              : courses.map((row) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell>
                      {row.id}
                      {/* <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  >
                    {row.id}

                    <Avatar
                      alt="Aemy Sharp"
                      src={row.images[0].image}
                      variant="rounded"
                    />
                    {row.title}
                  </Box> */}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Avatar
                        // alt="Aemy Sharp"
                        src={row.images.length === 0 ? "" : row.images[0].image}
                        variant="rounded"
                      />
                    </StyledTableCell>
                    <StyledTableCell>{row.title}</StyledTableCell>
                    <StyledTableCell>{row.teacher}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    <StyledTableCell>{row.duration}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>
                      <Stack spacing={1} direction="row" sx={{}}>
                        {/* <BoxIcon onClick={() => handleDelete(row.id,row.title)
                    
                    
                    
                    
                    
                    
                    }>
                      <DeleteOutlineOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </BoxIcon> */}
                        <ToastWithButton
                          id={row.id}
                          title="Delete Course"
                          question={`Are you sure to delete ${row.title}?`}
                        />
                        <BoxIcon
                          sx={{}}
                          onClick={() => {
                            dispatch({ type: "statusFormik", payload: "edit" });
                            navigate(`/dashboard/editcourse/${row.id}`);
                          }}
                        >
                          <EditOutlinedIcon
                            sx={{ width: "20px", height: "20px" }}
                          />
                        </BoxIcon>
                        <BoxIcon
                          onClick={() => {
                            navigate(
                              `/dashboard/courses/singlecourse/${row.id}`
                            );
                          }}
                        >
                          <VisibilityIcon
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
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <ThemeProvider theme={theme}>
          <Typography>Page: {page}</Typography>
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </ThemeProvider>
      </Box>
    </>
  );
};

export default Courses;
