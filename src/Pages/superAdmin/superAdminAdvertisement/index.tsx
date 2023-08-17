import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { logosData } from "../../../jsonFiles/servicesData";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FileDropzone from "../../../components/filedropzone";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";
import { useFormik } from "formik";
import * as yup from 'yup';
import { addAdvertisementAction } from "../../../redux/SuperAdminController/advertisement/middleware";
import { toast } from "react-toastify";

const SuperAdminAdvertisement = () => {
  const dispatch = useAppDispatch()
  const { catagoriesDetails } = useSelector(catagorySelector)
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const onDocumentChange =
    (func: (f: File | null) => void) => (files: File[]) => {
      setFile(files)
      func(files[0]);

    };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCategory(event.target.value);
    console.log("event.target", event.target.value);

  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    (async () => {
      await dispatch(getAllCatagoriesAction())
    })()
  }, [])


  const validationSchema = yup.object({
    title: yup
      .string()
      .required('name is required'),
    description: yup
      .string()
      .required('Description is required'),
    // categoryId: yup

    //   .required('Category is required'),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      categoryId: "",
      file: []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.file = file
      values.categoryId = selectedCategory
      await dispatch(addAdvertisementAction(values))
      toast.success("Advertisement Successfully Added");
      handleClose()

    },
  });


  return (
    <WrapperComponent isHeader>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#FBFBFB",
          width: { md: "141%", sm: "100%", xs: "30vh" },
          p: 3,
        }}
      >
        <Grid container>
          <Grid item xs={12} display="flex">
            <Typography fontSize="24px" fontStyle={"initial"}>
              {t("superadmin.advertisement.heading")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", p: 5 }}
          >
            <Button
              onClick={handleClickOpen}
              sx={{
                backgroundColor: "#00ABB1",
                color: "#ffffff",
                fontSize: 16,
                p: 1,
                px: 3,
                fontWeight: "600",
                minWidth: "20px",
                textTransform: "capitalize",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
            >
              +Add Advertisement
            </Button>
          </Grid>

          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {/* {logosData.map((item, index) => ( */}
              {catagoriesDetails.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Card
                    sx={{
                      // backgroundColor: {
                      //   xs: "red",
                      //   sm: "green",
                      //   md: "yellow",
                      //   lg: "pink",
                      //   xl: "orange",
                      // },
                      borderRadius: "16px",
                      boxShadow: "0 0 13px 0 #523f690d",
                    }}
                    onClick={() =>
                      navigate(
                        `/superadmin/advertisement/processor-table/${item.name.replace(
                          " ",
                          "-"
                        )}`, { state: item }
                      )
                    }
                  >
                    <CardContent sx={{ paddingBottom: "0px !important" }}>
                      <CardMedia
                        component="img"
                        image={item?.url}
                        alt="image"
                        style={{
                          width: "auto",
                          minHeight: "6vh",
                          maxHeight: "6vh",
                          margin: "0 auto",
                        }}
                      />

                      <Typography
                        mt={2}
                        sx={{
                          fontSize: 14,
                          fontWeight: "800px",
                          color: "black",
                        }}
                        align="center"
                        color="text.secondary"
                        gutterBottom
                      >
                        {item.name?.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={12} spacing={2}>
            {/* <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Advertisement</DialogTitle>
              <form onSubmit={formik.handleSubmit}>
                <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor:"red",
                  }}
                >
                  <FileDropzone
                    setFiles={onDocumentChange(setFile)}
                    accept="image/*,.pdf"
                    files={file ? [file] : []}
                    imagesUrls={[]}
                  />
                </div>
                </Grid>
                <DialogContent>
                  <TextField
                    sx={{ marginBottom: 3 }}
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title"
                    placeholder="Title"
                    type="title"
                    fullWidth
                    variant="outlined"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <TextField
                    sx={{ marginBottom: 3 }}
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    placeholder="Description"
                    type="description"
                    fullWidth
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />

                  <FormControl
                    sx={{ marginBottom: 3, maxHeight: "15vh" }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Advertisement Module
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      label="Advertisement Module"
                      placeholder="Advertisement Module"
                      fullWidth
                      onChange={handleChange}
                    >
                      {catagoriesDetails.map((item) => (
                        <MenuItem key={item.id} value={item._id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{
                      backgroundColor: "#00ABB1",
                      color: "#ffffff",
                      fontSize: 16,
                      p: 1,
                      px: 3,
                      fontWeight: "600",
                      minWidth: "20px",
                      textTransform: "capitalize",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#07453a",
                        cursor: "pointer",
                      },
                    }}
                    type="submit"
                  // onClick={handleClose}
                  >
                    Save
                  </Button>
                  <Button
                    sx={{
                      backgroundColor: "#00ABB1",
                      color: "#ffffff",
                      fontSize: 16,
                      margin: 2,
                      p: 1,
                      px: 3,
                      fontWeight: "600",
                      minWidth: "20px",
                      textTransform: "capitalize",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#07453a",
                        cursor: "pointer",
                      },
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>
            </Dialog> */}
            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle textAlign="center" textTransform="capitalize">
                Add Catagory
              </DialogTitle>
              <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                  {/* <Grid container border={1} justifyContent="center" > */}

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <div style={{ width: "60%", height: "20vh", margin: 20 }}>
                      <FileDropzone
                        setFiles={onDocumentChange(setFile)}
                        accept="image/*,.pdf"
                        files={file ? [file] : []}
                        imagesUrls={[]}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ marginBottom: 3 }}
                      autoFocus
                      margin="dense"
                      name="title"
                      label="Title"
                      fullWidth
                      variant="outlined"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      sx={{ marginBottom: 3 }}
                      autoFocus
                      margin="dense"
                      name="description"
                      label="Description"
                      fullWidth
                      variant="outlined"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      sx={{ marginBottom: 3, maxHeight: "15vh" }}
                      fullWidth
                      onBlur={formik.handleBlur}
                      error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Advertisement Module
                      </InputLabel>
                      <Select
                        MenuProps={MenuProps}
                        label="Advertisement Module"
                        placeholder="Advertisement Module"
                        fullWidth
                        onChange={handleChange}
                      >
                        {catagoriesDetails.map((item) => (
                          <MenuItem key={item.id} value={item._id}>{item.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {formik.touched.categoryId && Boolean(formik.errors.categoryId) && <>
                      <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{formik.errors.categoryId}</Typography></>}
                  </Grid>


                  {/* </Grid> */}
                </DialogContent>
                <DialogActions>
                  <Button
                    sx={{
                      backgroundColor: "#00ABB1",
                      color: "#ffffff",
                      fontSize: 16,
                      p: 1,
                      px: 3,
                      fontWeight: "600",
                      minWidth: "20px",
                      textTransform: "capitalize",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#07453a",
                        cursor: "pointer",
                      },
                    }}
                    type="submit"
                  // onClick={handleAdd}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    sx={{
                      backgroundColor: "#00ABB1",
                      color: "#ffffff",
                      fontSize: 16,
                      margin: 2,
                      p: 1,
                      px: 3,
                      fontWeight: "600",
                      minWidth: "20px",
                      textTransform: "capitalize",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#07453a",
                        cursor: "pointer",
                      },
                    }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </form>ś
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default SuperAdminAdvertisement;
