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
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ToastWithButton from "@/components/toast/ToastWithButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { CssBaseline } from'@mui/material/CssBaseline';
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";
import _debounce from "lodash/debounce";
import Loading from "@/components/loading/loading";

interface CoursesProps {}
type DebounceFn<T> = () => any;
// declare module "@mui/material/styles" {
//   interface Palette {
//     ochre: Palette["primary"];
//   }

//   interface PaletteOptions {
//     ochre?: PaletteOptions["primary"];
//   }
// }

// // Update the Button's color options to include an ochre option
// declare module "@mui/material/Button" {
//   interface ButtonPropsColorOverrides {
//     ochre: true;
//   }
// }

// const theme = createTheme({
//   palette: {
//     ochre: {
//       main: "#25476a",
//       light: "#25476a",
//       dark: "#25476a",
//       contrastText: "#fff",
//     },
//   },
// });
const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#343b47",
      // paper: '#212121',
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
  // const [page, setPage] = useState(1);

  //-------------------------------------------------------------------------context
  const {
    courses,
    dispatch,
    searchResults,
    statusFilter,
    mode,
    language,
    page,
    searchValue,
  } = usePanel();
  const { t } = useTranslation("courses");
  //---------------------------------------------------------------------------function
  const debouncedFn: DebounceFn<any> = _debounce<any>(() => {
    //if (searchValue === "") {
    //dispatch({ type: "search", payload: [] });
    //} else {

    privateAxios
      .get(`/api/course-list?q=${searchValue.trim()}&page=${page}&limit=5`)
      .then((res) => {
        // dispatch({ type: "search", payload: res.data.results });
        dispatch({
          type: "search",
          payload: { value: res.data.results, type: "search" },
        });
      });
    // }
  }, 300);
  //--------------------------------------------------------------------------------------
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //setPage(value);
    dispatch({ type: "page", payload: value });
  };

  // function handleDelete(id: number | string, title: string) {
  //   console.log("hello");
  //   <ToastWithButton
  //     id={id}
  //     title="Delete Course"
  //     question={`Are you sure to delete ${title}?`}
  //   />;
  // }
  //-------------------------------------------------------------------------------

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: `${mode === "dark" ? "#343b47" : "#fff"}`,
      color: `${mode === "dark" ? "#fff" : "#000"}`,
      textAlign: `${language === "fa" ? "right" : "left"}`,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      color: `${mode === "dark" ? "#fff" : "#000"}`,
      borderBottom: "none",
      textAlign: `${language === "fa" ? "right" : "left"}`,
    },
  }));
  //#404957
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      //backgroundColor: theme.palette.action.hover,
      //backgroundColor:`${mode==="dark"?"#404957": theme.palette.action.hover}`  ,
      backgroundColor: `${mode === "dark" ? "#404957" : "#f9fafc"}`,

      // color: `${mode==="dark"?"#fff":"#000"}`,
    },
    "&:nth-of-type(even)": {
      //backgroundColor: theme.palette.action.hover,
      backgroundColor: `${mode === "dark" ? "#343b47" : "#fff"}`,
      // color: `${mode==="dark"?"#fff":"#000"}`,
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
    // margin:"none",
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

  //-------------------------------------------------------------------------------

  useEffect(() => {
    // if (searchValue === "") {
    //   dispatch({ type: "search", payload: { value: [], type: "default" } });
    // }
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
    if (statusFilter === "search") {
      if (searchValue === "") {
        dispatch({ type: "search", payload: { value: [], type: "default" } });
      } else {
        debouncedFn();
      }
      //
    }
  }, [dispatch, page, statusFilter, searchValue]);
  //---------------------------------------------------------------------------------
  const navigate = useNavigate();
  return (
    <>
    {courses.length>0 ?

    <div>kk</div>
    :
    <div>kk</div>
    }
    <Stack>
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
          sx={{
            bgcolor: "#25476a",
            ":hover": { bgcolor: "#25476a" },
            color: "#fff",
          }}
        >
          {t("add-course")}
        </Button>
      </Box>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ borderBottom: "1px solid #000" }}>
                <StyledTableCell>{t("id")} </StyledTableCell>
                <StyledTableCell>{t("image")}</StyledTableCell>
                <StyledTableCell>{t("title")}</StyledTableCell>
                <StyledTableCell>{t("teacher")}</StyledTableCell>
                <StyledTableCell>{t("category")}</StyledTableCell>
                <StyledTableCell>{t("duration")}</StyledTableCell>
                <StyledTableCell>{t("price")}</StyledTableCell>
                <StyledTableCell>{t("action")}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                searchResults.length > 0
                  ? searchResults.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell>{row.id}</StyledTableCell>
                        <StyledTableCell>
                          <Avatar
                            // alt="Aemy Sharp"
                            src={
                              row.images.length === 0 ? "" : row.images[0].image
                            }
                            variant="rounded"
                          />
                        </StyledTableCell>
                        <StyledTableCell>{row.title}</StyledTableCell>
                        <StyledTableCell>{row.teacher}</StyledTableCell>
                        <StyledTableCell>{row.category}</StyledTableCell>
                        <StyledTableCell>{row.duration}</StyledTableCell>
                        <StyledTableCell>{row.price}</StyledTableCell>
                        <StyledTableCell>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "4px",
                              alignItems: "center",
                            }}
                          >
                            <ToastWithButton
                              id={row.id}
                              title="Delete Course"
                              question={`Are you sure to delete ${row.title}?`}
                              type="course"
                            />
                            <BoxIcon
                              sx={{ margin: "5px" }}
                              onClick={() => {
                                dispatch({
                                  type: "statusFormik",
                                  payload: "edit",
                                });
                                navigate(`/dashboard/editcourse/${row.id}`);
                              }}
                            >
                              <EditOutlinedIcon
                                sx={{ width: "20px", height: "20px" }}
                              />
                            </BoxIcon>
                            <BoxIcon
                              sx={{ margin: "5px" }}
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
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                  : //courses.length>0?
                    courses.map((row) => (
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
                            src={
                              row.images.length === 0 ? "" : row.images[0].image
                            }
                            variant="rounded"
                          />
                        </StyledTableCell>
                        <StyledTableCell>{row.title}</StyledTableCell>
                        <StyledTableCell>{row.teacher}</StyledTableCell>
                        <StyledTableCell>{row.category}</StyledTableCell>
                        <StyledTableCell>{row.duration}</StyledTableCell>
                        <StyledTableCell>{row.price}</StyledTableCell>
                        <StyledTableCell>
                          <Box sx={{ display: "flex", gap: "4px" }}>
                            {/* <BoxIcon onClick={() => handleDelete(row.id,row.title)
                    
                    
                    
                    
                    
                    
                    }>
                      <DeleteOutlineOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </BoxIcon> */}

                            <Box>
                              <ToastWithButton
                                id={row.id}
                                title={
                                  language === "en"
                                    ? "Delete Course"
                                    : "حذف دوره"
                                }
                                question={
                                  language === "en"
                                    ? `Are you sure to delete ${row.title}?`
                                    : ` آیا از حذف ${row.title} مطمئن هستین؟`
                                }
                                type="course"
                              />
                            </Box>

                            {/* marginLeft:`${language==="en"&&"8px"}` */}
                            <BoxIcon
                              // sx={{paddingRight:`${language==="fa"&&"5px"}`,}}

                              onClick={() => {
                                dispatch({
                                  type: "statusFormik",
                                  payload: "edit",
                                });
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
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))
                //:
                //<Loading />
              }
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
          gap: "10px",
          alignItems: "center",
          direction: "ltr",
        }}
      >
        <Typography
          sx={{
            color: `${mode === "dark" ? "#ffff" : "#000"}`,
            display: `${language === "fa" ? "none" : "block"}`,
          }}
        >
          Page: {page}
        </Typography>
        <Pagination
          count={7}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Stack>
    </>
  );
};

export default Courses;
