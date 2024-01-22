import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { usePanel } from "@/contexts/PanelContext";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import ToastWithButton from "@/components/toast/ToastWithButton";
import { useTranslation } from "react-i18next";
import Loading from "@/components/loading/loading";

const Categories = () => {
  
  //-------------------------------------------------------------------------context
  const { categories, mode, language } =
    usePanel();
  const navigate = useNavigate();
  
  const { t } = useTranslation("categories");
  //------------------------------------------------------------------------------------

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

  
  //-------------------------------------------------------------------------------

  return (
    <>
      {categories.length === 0 && <Loading />}

      <Link to="/dashboard/addcategory">
        <Box
          sx={{ padding: "20px" }}
         
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "#25476a",
              ":hover": { bgcolor: "#25476a" },
              color: "#fff",
            }}
          >
            {t("add-category")}
          </Button>
        </Box>
      </Link>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow sx={{ borderBottom: "1px solid #000" }}>
              <StyledTableCell> {t("id")}</StyledTableCell>
              <StyledTableCell> {t("image")}</StyledTableCell>
              <StyledTableCell>{t("name")}</StyledTableCell>
              <StyledTableCell> {t("action")}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              
              categories.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>
                    <Avatar src={row.image as any} variant="rounded" />
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", gap: "4px" }}>
                      <Box>
                        <ToastWithButton
                          id={row.id}
                          title={
                            language === "en"
                              ? "Delete Category"
                              : "حذف دسته بندی"
                          }
                          question={
                            language === "en"
                              ? `Are you sure to delete ${row.name}?`
                              : ` آیا از حذف ${row.name} مطمئن هستین؟`
                          }
                          type="category"
                        />
                      </Box>
                      {/* <BoxIcon sx={{}}>
                      <EditOutlinedIcon
                        sx={{ width: "20px", height: "20px" }}
                      />
                    </BoxIcon> */}
                      <BoxIcon
                        onClick={() => {
                          navigate(
                            `/dashboard/categories/singlecategory/${row.id}`
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
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Categories;
