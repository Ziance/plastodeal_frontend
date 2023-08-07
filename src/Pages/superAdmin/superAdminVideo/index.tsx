import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Input,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useFormik } from 'formik';
import * as yup from "yup";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SimpleSlider from "../../../components/slider";
import img_data from "../../../jsonFiles/imageData.json";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import MyDialog from "../../../components/myDialog";

const SuperAdminVideo = () => {
  const { t } = useTranslation()
  const params = useParams()
  const [activeStatus, setActiveStatus] = useState(false)
  const [openModal, setOpenModal] = React.useState(false);
  const btnColor = "#00ABB1"
  const fontsize = "15px"
  const rows = [
    {
      id: "1",
      accountName: "new company",
      name: "tester",
      organisationName: "google",
      email: "Email",
      phone: "Phone",
      status: "Active"
    }
  ]
  const handleActive = () => {
    setActiveStatus((prev) => !prev)
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleClose = ()=>{
  //   setOpen(false)
  // }
  const handleDeleteEntry = () => {
    console.log("handle delete");

  }
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    file: yup.string().required("File is required"),
  })
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values))
      console.log("values", values);
      // const res = await dispatch(addPostRequirementAction(values))
      // console.log("res",res);
      // toast.success("post requirement is Registered")
      // // navigate("/")

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
            <Typography fontSize="20px" fontStyle={"initial"}>
              {/* {t("superadmin.jobs.heading")} */}
              Video
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "2%" }} >
            <TextField variant="standard" label={t("superadmin.jobs.filter")} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end", marginTop: "2%" }}>
            <Button variant="contained" sx={{
              scale: ".85", backgroundColor: btnColor, "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
              },
            }}
              onClick={() => setOpenModal(true)}><AddIcon />
              Add Video
              {/* {t('superadmin.jobs.addJobBtn')} */}
            </Button>

          </Grid>
          <Grid item xs={12} marginTop={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, fontSize: "10px" }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontSize: fontsize }}> Title</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}> Video</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}> Description</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontSize: fontsize }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">{row.accountName}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.organisationName}</TableCell>
                      <TableCell align="right"><Button variant="contained" sx={{
                        marginLeft: "20%",
                        backgroundColor: activeStatus ? "#21BA45" : "#FF3434", display: "flex", justifyContent: "center", height: "20px", textTransform: "initial", p: 1, width: "50%", fontSize: "80%", "&:hover": {
                          backgroundColor: activeStatus ? "#21BA45" : "#FF3434",
                          cursor: "pointer",
                        }
                      }} onClick={handleActive}>{
                          activeStatus ? <DoneIcon /> : <CloseIcon />}{activeStatus ? "Active" : "Inactive"}</Button></TableCell>
                      <TableCell align="right" onClick={handleClick}><MoreVertIcon /></TableCell>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleDeleteEntry}>Delete</MenuItem>
                      </Menu>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <MyDialog
            setAnchorEl={setAnchorEl}
            openModal={openModal}
            setOpenModal={setOpenModal}
            heading="Video">
            <form onSubmit={formik.handleSubmit}>
              <Grid container >
                {/* <form> */}
                <Grid item xs={12}>
                  <TextField
                    sx={{ marginBottom: 3, textTransform: "capitalize" }}
                    autoFocus
                    type="file"
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="file"
                    value={formik.values.file}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.file && Boolean(formik.errors.file)
                    }
                    helperText={
                      formik.touched.file && formik.errors.file
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ marginBottom: 3, textTransform: "capitalize" }}
                    autoFocus
                    margin="dense"
                    // label={params.dynamicPath?.replace("_", " ")}
                    label="Title"
                    name="title"
                    fullWidth
                    variant="outlined"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.title && Boolean(formik.errors.title)
                    }
                    helperText={
                      formik.touched.title && formik.errors.title
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ marginBottom: 3, textTransform: "capitalize" }}
                    autoFocus
                    margin="dense"
                    name="description"
                    // label={params.dynamicPath?.replace("_", " ")}
                    label="Description"
                    fullWidth
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description && Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end" >
                  <Button
                    type="submit"
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
                  // onClick={handleCloseModal}
                  >
                    Submit
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
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </Grid>

                {/* </form> */}
              </Grid>
            </form>

          </MyDialog>
        </Grid>
      </Grid>
    </WrapperComponent >

  );
}
export default SuperAdminVideo
