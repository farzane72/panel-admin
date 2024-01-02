import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";

interface AddCourseProps {}

const AddCourse: React.FunctionComponent<AddCourseProps> = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUploadTest = async () => {
    if (!selectedImage) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpload = () => {
    // Send the selected image file to the server using an HTTP POST request
    console.log(selectedImage);
  };
  return (
    <Stack
      sx={{ margin: "30px" }}
      direction={"column"}
      spacing={2}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid container sx={{ mt: "80px" }} spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Title"
            variant="standard"
            fullWidth
            sx={{
                
                label: {
                 // fontSize:"16px",
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   // fontSize:"14px",
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Teacher"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Category"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Duration"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Price"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Description"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Number of viewer"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            label="Number of chapter"
            variant="standard"
            fullWidth
            sx={{
                label: {
                 color: "#25476a",
                  "&.MuiFormLabel-root": {
                   color: "#25476a",
                  },
                },
              }}
          />
        </Grid>
      </Grid>
      {/* <Grid item xs={12} md={6}sx={{mt:"30px"}}> */}
      <Box
        sx={{
          paddingTop: "30px",
          display: "flex",
          gap: "30px",
          alignItems: "center",
        }}
      >
        {/* <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ height: "40px" }}
            onClick={handleUpload} 
           // disabled={!selectedImage}
            onChange={(event) => setSelectedImage(event.target.files[0])}
          >
            Upload image
            <VisuallyHiddenInput type="file" />
          </Button> */}
        {/* <Box
            sx={{
              width: "150px",
              height: "150px",
              borderRadius: "10px",
              //backgroundColor: "GrayText",
            }}
          >
            {selectedImage}
          </Box> */}

        <TextField
          type="file"
          onChange={(event) => {
            setSelectedImage(event.target.files[0] );
          }}
        />
        <Button onClick={handleUpload}
         disabled={!selectedImage}
         variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ height: "40px",bgcolor:"#25476a" }} >
          Upload
        </Button>
        {/* {imageUrl && ( */}
        <Avatar
          src={imageUrl}
          alt="Uploaded image"
          variant="rounded"
          sx={{ width: 100, height: 100 }}
        />
        {/* )} */}
      </Box>

      {/* </Grid> */}
      {/* <Grid item xs={12} md={6}sx={{mt:"30px"}}> */}

      {/* </Grid> */}
    </Stack>
  );
};

export default AddCourse;
