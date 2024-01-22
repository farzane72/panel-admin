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
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { privateAxios } from "@/services/privateAxios";
import Search from "@/components/search/Search";
import MenuFilter from "@/components/menu/MenuFilter";
import { usePanel } from "@/contexts/PanelContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import ToastWithButton from "@/components/toast/ToastWithButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";
import _debounce from "lodash/debounce";
import Loading from "@/components/loading/loading";

interface CoursesProps {}
type DebounceFn<T> = () => any;

const Courses: React.FunctionComponent<CoursesProps> = () => {
  //-------------------------------------------------context & function-------------------
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
  const navigate = useNavigate();
  //---------------------------------------------------------------------------function---
  const debouncedFn: DebounceFn<any> = _debounce<any>(() => {
    privateAxios
      .get(`/api/course-list?q=${searchValue.trim()}&page=${page}&limit=5`)
      .then((res) => {
        dispatch({
          type: "search",
          payload: { value: res.data.results, type: "search" },
        });
      });
  }, 300);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({ type: "page", payload: value });
  };
  useEffect(() => {
    if (statusFilter === "default") {
      privateAxios.get(`/api/course-list/?page=${page}&limit=5`).then((res) => {
        console.log("test", res.data.results);
        dispatch({ type: "getCourses", payload: res.data.results });
      });
    }

    if (statusFilter === "oldest") {
      privateAxios
        .get(
          `/api/course-list?_sort=created_datetime&_order=asc&page=${page}&limit=5`
        )
        .then((res) => {
          console.log("title", res);
          dispatch({ type: "getCourses", payload: res.data.results });
        });
    }

    if (statusFilter === "newest") {
      privateAxios
        .get(
          `/api/course-list?_sort=created_datetime&_order=desc&page=${page}&limit=5`
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
 
 

  //-------------------------mui style-----------------------------------------------------------------------
  const theme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#343b47",
        // paper: '#212121',
      },
    },
  });
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
      backgroundColor: `${mode === "dark" ? "#404957" : "#f9fafc"}`,
    },
    "&:nth-of-type(even)": {
      backgroundColor: `${mode === "dark" ? "#343b47" : "#fff"}`,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const BoxIcon = styled("div")(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

  return (
    <>
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
                {searchResults.length === 0 && courses.length === 0 ? (
                  <Loading />
                ) : searchResults.length > 0 ? (
                  searchResults.map((row) => (
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
                          <Box>
                            <ToastWithButton
                              id={row.id}
                              title={
                                language === "en" ? "Delete Course" : "حذف دوره"
                              }
                              question={
                                language === "en"
                                  ? `Are you sure to delete ${row.title}?`
                                  : ` آیا از حذف ${row.title} مطمئن هستین؟`
                              }
                              type="search"
                            />
                          </Box>
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
                ) : courses.length > 0 ? (
                  courses.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell>{row.id}</StyledTableCell>
                      <StyledTableCell>
                        <Avatar
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
                          <Box>
                            <ToastWithButton
                              id={row.id}
                              title={
                                language === "en" ? "Delete Course" : "حذف دوره"
                              }
                              question={
                                language === "en"
                                  ? `Are you sure to delete ${row.title}?`
                                  : ` آیا از حذف ${row.title} مطمئن هستین؟`
                              }
                              type="course"
                            />
                          </Box>
                          <BoxIcon
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
                ) : (
                  <Loading />
                )}
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
