import { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { privateAxios } from "@/services/privateAxios";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { SingleCourseType } from "@/types/PanelTypes";
import Rating from "@mui/material/Rating";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
//------------------------------------------------------------------------------------------------
//import { deepOrange, green } from '@mui/material/colors';
//sx={{ bgcolor: green[500] }}
const SingleCourse = () => {
  const course = useLoaderData() as SingleCourseType;
  const {t}=useTranslation("courses")
  console.log(course);

  return (
    <Grid container sx={{ padding: "50px", fontSize: "18px" }} spacing={2}>
      <Grid item xs={12} md={7}>
        <Stack spacing={2}>
          <Typography sx={{ textAlign: "center" }} variant="h4">
            {course.title}
          </Typography>

          <Box sx={{ marginTop: "30px" }}>
            <span>{t("teacher")}:</span>
            <span>{course.teacher}</span>
          </Box>
          <Box>
            <span>{t("description")}:</span>
            <span>{course.description}</span>
          </Box>
          <Stack direction="row">
            <span>{t("duration")}:</span>
            <Stack direction="row" spacing={1}>
              <span>{course.duration}</span>
              <Typography sx={{ fontSize: "12px", paddingTop: "5px" }}>
              {t("mount")}
                {/* Mounts */}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <span>{t("category")}:</span>
            <span>{course.category}</span>
          </Box>
          <Stack direction="row">
            <span>{t("price")}:</span>
            <Stack direction="row" >
              <span>{course.price}</span>
              <Typography sx={{ fontSize: "12px", paddingTop: "5px" }}>
              {t("money")}
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <span>{t("number-of-chapter")}:</span>
            <span>{course.number_of_chapter}</span>
          </Box>
          {/* <Stack direction="row" > */}
          {/* <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}> */}
          <Box>
            <span>{t("number-of-viewer")}:</span>
            {/* <VisibilityIcon fontSize="large" /> */}
            <span>{course.number_of_viewer}</span>
          </Box>

          <Box>
            {/* <span>Rating:</span>
            <span>{course.rating}</span> */}
            <Rating name="read-only" value={course.rating} readOnly />
          </Box>
          {/* </Stack> */}
        </Stack>
      </Grid>
      <Grid item xs={12} md={5} sx={{ marginTop: "50px" }}>
        <Stack spacing={2} sx={{ padding: "10px" }}>
          <Stack>
            <Avatar
              src={course.images[0].image}
              sx={{ width: "100%", height: "100%" }}
              variant="rounded"
            ></Avatar>
          </Stack>
          <Grid container sx={{ padding: "20px" }} spacing={2}>
            {course.images.length > 1 &&
              course.images.map((t) => (
                <Grid item xs={4} md={6}>
                  <Avatar
                    src={t.image}
                    sx={{ width: "100%", height: "100%" }}
                    variant="rounded"
                  ></Avatar>
                </Grid>
              ))}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  const course = await privateAxios.get(`/api/course-list/${params.courseId}/`);

  return course.data;
}

export default SingleCourse;
