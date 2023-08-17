import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DrawerList from "../components/drawer/list";
import "./_wrapperComponent.css";
// import List from '@mui/material/List';
import { Grid, Stack, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextareaAutosize, TextField, Typography } from "@mui/material";

import LanguageDialog from "../Pages/Language";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import MenuItemImage from "../../public/bannerImages/menuIcon.png";
import Footer from "./footer";
import { authSelector, logout } from "../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { AuthState } from "../redux/auth/types";
import { removeUser } from "../services/token";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../redux/store";
import plastocurrentlogo from "../assets/images/plastocurrentlogo.png";
import menulogo from "../assets/images/menuIcon.png";
import MyDialog from "./myDialog";
import FileDropzone from "./filedropzone";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addCatagoryAction, getAllCatagoriesAction } from "../redux/SuperAdminController/catagories/middleware";


const drawerWidth = 180;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(0),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginTop: "110px",
  height: "auto",
  // need to manage this with responsive
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "#FFFFFF",
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: "100%",
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const WrapperComponent: React.FC<{
  isHeader: boolean;
  children: React.ReactNode;
}> = ({ children, isHeader }): JSX.Element => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);
  const authState: AuthState = useSelector(authSelector);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(true);
  const [file, setFile] = useState<File | any>(null);
  const [openModel, setOpenModel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleLogut = async () => {
    console.log("getting in");

    const logoutRes: any = await dispatch(logout());
    console.log("logoutRes", logoutRes);
    toast.success("Logout Successfull");
  };
  const handleAdd = async () => {
    console.log("sdfjsd");

  }
  const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
    setFile(files[0])
    func(files[0]);
  };
  const handleClose = () => {
    console.log("asdkcasdkfj");

    setOpenModel(false)
  }
  const handleAddCatagory = async () => {
    console.log("sdkbsd entering");
    setOpenModel(true)


    // console.log("handeling");
  }
  const validationSchema = yup.object({
    name: yup
      .string()
      .required('name is required'),
    description: yup
      .string()
      .required('Description is required'),

  });
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      file: []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.file = file
      console.log("values", values);
      const res = await dispatch(addCatagoryAction(values))
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Catagory is Added")
      }
      formik.resetForm()
      setFile("")
      setOpenModel(false)
    },
  });
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          position: "relative",
          display: "flex",
          backgroundColor: "#FBFBFB",
        }}
      >
        {/* <CssBaseline /> */}
        {isHeader && (
          <AppBar position="fixed" open={open} elevation={0}>
            <Toolbar disableGutters>
              <Stack
                sx={{ width: "100%" }}
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  sx={{ width: drawerWidth }}
                >
                  <Button
                    // color="success"
                    // aria-label="open drawer"
                    onClick={handleDrawerToggle}
                  // edge="start"
                  // sx={{ width: drawerWidth }}
                  >
                    <img
                      src={menulogo}
                      alt="menuicon"
                      style={{ width: 30, height: 25 }}
                    />
                  </Button>
                </Stack>
                <Stack
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  spacing={5}
                  sx={{
                    width: `100%`,
                    paddingBottom: "15px",
                  }}
                >
                  <Avatar
                    variant="square"
                    src={plastocurrentlogo}
                    alt=""
                    sx={{
                      marginTop: "20px",
                      height: {
                        xl: "85px",
                        lg: "75px",
                        md: "65px",
                        sm: "55px",
                        xs: "50px",
                      },
                      width: "auto",
                    }}
                  />

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Button
                      sx={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "black",
                        textTransform: "inherit",
                        fontFamily: "sans-serif",
                        marginRight: "10px",

                      }}
                      onClick={
                        authState.currentUser
                          ? handleLogut
                          : () => navigate("/login")
                      }
                    >
                      {authState.currentUser
                        ? superAdmin
                          ? "Super Admin"
                          : "Logout"
                        : t("header.loginText")}
                    </Button>
                    {authState.currentUser
                      && superAdmin && <Button variant="contained" sx={{ backgroundColor: "#00ABB1", marginRight: "10px" }} onClick={handleAddCatagory}>
                        Add Catagory
                      </Button>}
                  </div>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        )}
        <Box>
          {isHeader && (
            <Drawer
              sx={{
                flexShrink: 0,
                width: drawerWidth,
                // position:"absolute",
                "& .MuiDrawer-paper": {
                  position: "fixed",
                  width: drawerWidth,
                  marginTop: {
                    xs: "26.5%",
                    sm: "14%",
                    md: "10.5%",
                    lg: "7.5%",
                    xl: "6.2%",
                  },
                  height: "88vh",
                  overflow: "scroll",
                  boxSizing: "border-box",
                },
              }}
              variant="persistent"
              anchor="left"
              open={open}
            >
              <DrawerList
                superAdmin={superAdmin}
                open={open}
                setLanguageDialogOpen={setLanguageDialogOpen}
              />
            </Drawer>
          )}
        </Box>

        <Main
          open={open}
          sx={{ backgroundColor: "#FBFBFB", minHeight: "77vh" }}
        >
          <Grid container>
            {children}
            {isHeader && <Footer />}
            {languageDialogOpen && (
              <>
                <LanguageDialog languageDialogOpen={languageDialogOpen} />
              </>
            )}
          </Grid>
        </Main>
      </Grid>
      <Dialog open={openModel} onClose={handleClose} fullWidth>
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
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} >
              <TextareaAutosize
                id="description"
                name="description"
                placeholder="Description"
                style={{
                  minWidth: "99%",
                  maxWidth: "99%",
                  minHeight: "10vh",
                }}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && Boolean(formik.errors.description) && <>
                <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{formik.errors.description}</Typography></>}
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
      <ToastContainer />
    </Grid >
  );
};
export default WrapperComponent;
