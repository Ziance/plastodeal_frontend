import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DrawerList from "../components/drawer/list";
import "./_wrapperComponent.css";
// import List from '@mui/material/List';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Grid, Stack, Button, Avatar } from "@mui/material";
import { CardMedia } from "@mui/material";
import LanguageDialog from "../Pages/Language";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "./footer";
const drawerWidth = 180;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
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
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };
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
          <AppBar position="fixed" open={open}>
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
                    <MenuIcon style={{ color: "#00ABB1", fontSize: "45px" }} />
                  </Button>
                </Stack>
                <Stack
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  direction="row"
                  spacing={5}
                  sx={{
                    backgroundColor: {
                      xl: "white",
                      lg: "yellow",
                      md: "pink",
                      sm: "gray",
                      xs: "green",
                    },
                    width: `100%`,
                    paddingBottom: "15px",
                  }}
                >
                  <Avatar
                    variant="square"
                    src={"././plastocurrentlogo.png"}
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
                  <Button
                    sx={{
                      fontSize: "16px",
                      color: "black",
                      fontFamily: "sans-serif",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    {t("header.loginText")}
                  </Button>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>
        )}
        {isHeader && (
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              // position:"absolute",
              "& .MuiDrawer-paper": {
                position: "fixed",
                marginTop: {
                  xs: "26.5%",
                  sm: "14%",
                  md: "10.5%",
                  lg: "7.5%",
                  xl: "6.2%",
                },
                height: "88vh",
                width: drawerWidth,
                overflow: "scroll",
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerList
              open={open}
              setLanguageDialogOpen={setLanguageDialogOpen}
            />
          </Drawer>
        )}
        <Main open={open} sx={{ backgroundColor: "#FBFBFB" }}>
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
    </Grid>
  );
};
export default WrapperComponent;
