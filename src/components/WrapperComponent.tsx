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
  ListItem,
  IconButton,
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
import { toast } from "react-toastify";
import { useAppDispatch } from "../redux/store";
import plastocurrentlogo from "../assets/images/plastocurrentlogo.png";
import menulogo from "../assets/images/menuIcon.png";
import MyDialog from "./myDialog";
import FileDropzone from "./filedropzone";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  addCatagoryAction,
} from "../redux/SuperAdminController/catagories/middleware";
import PersonImage from "../assets/images/person-placeholder.png";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";

const drawerWidth = 180;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  height: "auto",
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
  const [open, setOpen] = React.useState(false);
  const authState: AuthState = useSelector(authSelector);
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [superAdmin, setSuperAdmin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userImage, setUserImage] =useState(null)
  const [isAdmin, setIsAdmin] = useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [openModel, setOpenModel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const menuOpen = Boolean(anchorEl);


  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800);
  }, [])
  useEffect(() => {
    if (currentUser?.user?.userRole?.toLowerCase() !== "superadmin") {
      setSuperAdmin(false);
    }


    if ((currentUser && currentUser.user?.userRole?.toLowerCase() === "admin") ||
      ((currentUser && currentUser.user?.userRole?.toLowerCase() === "user")) ||
      ((currentUser && currentUser.user?.userRole?.toLowerCase() === "company")) ||
      ((currentUser && currentUser.user?.userRole?.toLowerCase() === "organization"))
    ) {
      setIsAdmin(true)
    }
  }, []);
  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
  const handleLogout = async () => {
    setAnchorEl(null)
    if (authState.currentUser) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You want to logout!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const logoutRes: any = await dispatch(logout());
          navigate("/")

          setTimeout(() => {
            toast.success("Logout Successfull");
          }, 500);
        }
      })
    }
  };
  const handleOption = async (item: any) => {
    switch (item) {
      case "My_Dashboard":
        return navigate("/");
      case "Change_Password":
        return navigate("/ResetPasword")
      case "Logout":
        return handleLogout()
      default:
        break;
    }
  };
  const UserInfo: React.FC<any> = () => {
    return (

        <Grid container alignItems={{ xs: "end", sm: "center" }} height="100%" justifyContent="space-between"   m={0} >
        
          <Grid item xs={7.2}  display={{ xs: "none", md: "block" }}  textAlign={"end"}  >
                    <Typography variant="h6">{currentUser?.user?.firstName + " " + currentUser?.user?.lastName}</Typography>
                    <Typography variant="body1">{currentUser?.user?.userRole === "Admin" ? "Oganization" : currentUser?.user?.userRole}</Typography>
          </Grid>
        
          <Grid item xs={4} display="flex" justifyContent="flex-start" alignItems="center">
            <Avatar src={currentUser?.user?.companyLogo || PersonImage} sx={{ border:".2px solid grey", height:"60px",width:"60px", objectFit:"cover"}} />
          </Grid>
        </Grid>
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
    name: yup.string().trim().required("name is required"),
    description: yup.string().trim().required("Description is required"),
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

      const res = await dispatch(addCatagoryAction(values));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Catagory is Added");
      }
      formik.resetForm();
      setFile("");
      setOpenModel(false);
    },
  });
useEffect(()=>{
  if (currentUser?.user?.companyLogo) {
    const userProfile = currentUser?.user?.companyLogo
    setUserImage(userProfile)
  }

},[currentUser])
  return (
    <Grid container bgcolor="#FBFBFB" sx={{backgroundColor: "#FBFBFB"}} >
    
      {isHeader && (
        <Box >
          <Drawer
            sx={{
              flexShrink: 0,
              width: drawerWidth,
              // position:"absolute",
              "& .MuiDrawer-paper": {
                position: "fixed",
                width: drawerWidth,
                marginTop: {
                  xs: "14.5%",
                  sm: "8%",
                  md: "6.5%",
                  lg: "5%",
                  xl: "4.2%",
                },
                // height: "88vh",
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
        </Box>
      )}
      <Main
        open={open}
        sx={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <Grid container justifyContent="center" height={isLoading ? "100%" : ""}    >
          <Grid item xs={12} >
            {isHeader && (
            
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <Button onClick={handleDrawerToggle}>
                      <img
                        src={menulogo}
                        alt="menuicon"
                        style={{ width: 30, height: 25 }}
                      />
                    </Button>
                  </IconButton>
                  {/* <Typography variant="h6 " component="div" sx={{ flexGrow: 1 }}> */}
                    <img
                      src={plastocurrentlogo}
                      alt="menuicon"
                      style={{ width: "auto", height: "8vh" }}
                    />
                  {/* </Typography> */}

                  
                  <div style={{display:"flex",justifyContent:"end",width:"100%"}}>
                    <Button
                      sx={{
                        color: "black",
                        textTransform: "inherit",
                        fontFamily: "sans-serif",
                        
                        // marginRight: "10px",
                        width:{xs:"0%",md:"30%",lg:"20%"},
                        // width:"20%",
                        "&:hover": {
                          backgroundColor: 'transparent'
                        }
                      }}
                      onClick={
                        authState.currentUser?.user
                          ? handleMenuOpen
                          : () => navigate("/login")
                      }
                    >
                       
                      {authState.currentUser?.user ? (
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
                        [<MenuItem onClick={handleLogout}>Logout</MenuItem>]
                      ) : (
                        <>
                          {["My_Dashboard", "Change_Password", "Logout"].map(
                            (item, index) => [
                              <MenuItem key={index} onClick={() => handleOption(item)}>
                                {item.replace("_", " ")}
                              </MenuItem>,
                            ]
                          )}
                        </>
                      )}
                    </Menu>


                  </div>

                </Toolbar>
              </AppBar>
            )}
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"center"} alignItems={"center"} pb={2}  >
            {isLoading ? <RotatingLines
              strokeColor="#00ABB1"
              strokeWidth="5"
              animationDuration="0.75"
              // width="96"
              visible={true}
            /> : <>
              {children}
            </>}
          </Grid>
          <Grid item xs={12} >
            {isHeader && <Footer />}
          </Grid>


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
  );
};
export default WrapperComponent;
