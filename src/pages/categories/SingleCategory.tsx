import { LoaderFunctionArgs } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { privateAxios } from "@/services/privateAxios";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { GetCategoryType } from "@/types/PanelTypes";

//------------------------------------------------------------------------------------------------

const SingleCategory = () => {
  const category = useLoaderData() as GetCategoryType;
  

  return (
    <Grid container sx={{ padding: "50px", fontSize: "18px" }} spacing={2}>
      <Grid item xs={6} md={6}>
        <Stack spacing={2}>
          <Typography variant="h4">
            {category.name}
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={6} md={6} sx={{ marginTop: "0px" }}>
        <Stack spacing={2} sx={{ padding: "10px" }}>
          <Stack>
            <Avatar
              src={category.image as any}
              sx={{ width: "100%", height: "100%" }}
              variant="rounded"
            ></Avatar>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export async function loader({ params }: LoaderFunctionArgs) {
  const category = await privateAxios.get(`/api/course-category/${params.categoryId}/`);

  return category.data;
}

export default SingleCategory;
