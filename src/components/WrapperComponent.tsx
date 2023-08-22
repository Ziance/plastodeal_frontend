import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DrawerList from "../components/drawer/list";
import "./_wrapperComponent.css";
// import List from '@mui/material/List';
import {
  Grid,
  Stack,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
  TextField,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

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
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addCatagoryAction,
  getAllCatagoriesAction,
} from "../redux/SuperAdminController/catagories/middleware";
import PersonImage from "../assets/images/person-placeholder.png";

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

  const { currentUser } = useSelector(authSelector);
  const [open, setOpen] = React.useState(true);
  const authState: AuthState = useSelector(authSelector);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [superAdmin, setSuperAdmin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [openModel, setOpenModel] = useState(false);
  // const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (currentUser?.user?.userRole?.toLowerCase() !== "superadmin") {
      console.log("CURRENT", currentUser?.user?.userRole);
      setSuperAdmin(false);
    }
    if ((currentUser && currentUser.user?.userRole?.toLowerCase()==="admin" )|| ((currentUser && currentUser.user?.userRole?.toLowerCase()==="admin"))) {
      setIsAdmin(true)
    }
  }, []);
  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleLogut = async () => {
    if (authState.currentUser) {
      const logoutRes: any = await dispatch(logout());
      console.log("logoutRes", logoutRes);
      toast.success("Logout Successfull");
      navigate("/")
    }
  };
  const handleOption = async (item: any) => {
    console.log("ITEm", item);

    console.log("current user", currentUser?.user?.firstName);
    switch (item) {
      case "My_Dashboard":
        return navigate("/");
      case "Change_Password":
        return navigate("/ResetPasword")
      case "Logout":
        return await dispatch(logout());
      default:
        break;
    }
  };
  const UserInfo: React.FC<any> = () => {
    return (
      <div style={{ width: "100%", height: "8vh" }}>
        <Grid container alignItems={{xs:"end" ,sm:"center"}} height="100%">
          <Grid xs={6} height="8vh" display={{xs:"none", sm:"block"}} >
            <Stack  height="100%" justifyContent="center">
              {superAdmin ? <Typography>Super Admin</Typography>:
              <>
              <Typography variant="h6">{currentUser?.user?.firstName + " "+currentUser?.user?.lastName}</Typography>
              <Typography variant="body1">{currentUser?.user?.userRole}</Typography>
              </>
            }
            </Stack>
          </Grid>
          <Grid xs={6}  display="flex" justifyContent="center" alignItems="center">
            <Avatar src={PersonImage} sx={{ borderRadius: "10px", padding: "1px", scale:{sm: "1.5" ,xs:"1"}}} />
          </Grid>
        </Grid>
      </div>
    );
  };
  
  const handleMenuOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenModel(false);
  };


  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    description: yup.string().required("Description is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      file: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.file = file;
      console.log("values", values);
      const res = await dispatch(addCatagoryAction(values));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Catagory is Added");
      }
      formik.resetForm();
      setFile("");
      setOpenModel(false);
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
                  sx={{ width: {md:drawerWidth,xs:"120"} }}
                >
                  <Button onClick={handleDrawerToggle}>
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
                  justifyContent={{xs:"space-evenly",md:"space-between"}}
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
                        xs: "40px",
                      },
                      width: "auto",
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15%",
                    }}
                  >
                    <Button
                      sx={{
                        color: "black",
                        textTransform: "inherit",
                        fontFamily: "sans-serif",
                        marginRight: "10px",
                      }}
                      onClick={
                        authState.currentUser
                          ? handleMenuOpen
                          : () => navigate("/login")
                      }
                    >
                      {authState.currentUser ? (
                        superAdmin ? (
                          "Super Admin"
                        ) : (
                          <>
                            <UserInfo />
                          </>
                        )
                      ) : (
                        t("header.loginText")
                      )}
                    </Button>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      // transformOrigin={{
                      //   horizontal: "center",
                      //   vertical: "bottom",

                      // }}
                      anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom",
                      }}
                      // itemProp={
                      sx={{
                        "& .MuiPaper-root": {
                          borderRadius: "15px",
                        },
                      }}
                      open={menuOpen}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {superAdmin ? (
                        [<MenuItem onClick={handleLogut}>Logut</MenuItem>]
                      ) : (
                        <>
                          {["My_Dashboard", "Change_Password", "Logout"].map(
                            (item) => [
                              <MenuItem onClick={() => handleOption(item)}>
                                {item.replace("_", " ")}
                              </MenuItem>,
                            ]
                          )}
                        </>
                      )}
                    </Menu>
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
                isAdmin={isAdmin}
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
                <LanguageDialog
                  languageDialogOpen={languageDialogOpen}
                  setLanguageDialogOpen={setLanguageDialogOpen}
                />
              </>
            )}
          </Grid>
        </Main>
      </Grid>

      <ToastContainer />
    </Grid>
  );
};
export default WrapperComponent;
