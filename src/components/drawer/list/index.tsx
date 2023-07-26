import React, { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import TextsmsIcon from "@mui/icons-material/Textsms";
import CancelIcon from "@mui/icons-material/Cancel";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PersonIcon from "@mui/icons-material/Person";
import { Grid, Stack, Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
interface Ilist {
  open: any;
  setLanguageDialogOpen: React.Dispatch<React.SetStateAction<any>>;
}
const DrawerList: React.FC<Ilist> = ({ open, setLanguageDialogOpen }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const sidebarData = [
    {
      title: `${t("header.drawer.dashboard")}`,
      icon: <DashboardSharpIcon sx={{ fontSize: "30px" }} />,
      path: "/",
      onClick: () => {
        navigate("/");
      },
    },
    {
      title: `${t("header.drawer.aboutUs")}`,
      icon: <InfoSharpIcon sx={{ fontSize: "30px" }} />,
      path: "/about",
      onClick: () => {
        navigate("/about");
      },
    },
    {
      title: `${t("header.drawer.shareApp")}`,
      icon: <ShareIcon sx={{ fontSize: "30px" }} />,
      path: "/share-app",
      onClick: () => {
        navigate("/share-app");
      },
    },
    {
      title: `${t("header.drawer.postRequirement")}`,
      icon: <TextsmsIcon sx={{ fontSize: "30px" }} />,
      path: "/post-requirement",
      onClick: () => {
        navigate("/post-requirement");
      },
    },
    {
      title: `${t("header.drawer.registration")}`,
      icon: <PersonIcon sx={{ fontSize: "30px" }} />,
      path: "/login",
      onClick: () => {
        navigate("/login");
      },
    },
    {
      title: `${t("header.drawer.language")}`,
      icon: <LanguageRoundedIcon sx={{ fontSize: "30px" }} />,
      path: "/language",
      onClick: () => {
        setLanguageDialogOpen(true);
      },
    },
    {
      title: "FAQ",
      icon: <HelpRoundedIcon sx={{ fontSize: "30px" }} />,
      path: "/faq",
      onClick: () => {
        navigate("/faq");
      },
    },
    {
      title: "Privacy Policy",
      icon: <SecurityOutlinedIcon sx={{ fontSize: "30px" }} />,
      path: "/privacy-policy",
      onClick: () => {
        navigate("/privacy-policy");
      },
    },
    {
      title: "Refund Policy",
      icon: <CancelIcon sx={{ fontSize: "30px" }} />,
      path: "/refund-policy",
      onClick: () => {
        navigate("/refund-policy");
      },
    },
  ];
  return (
    <>
      <List sx={{ overflowY: "scroll" }}>
        {sidebarData.map((item: any) => {
          return (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                sx={{
                  cursor: "pointer",
                  minHeight: "80px",
                  maxHeight: "80px",
                  pt: "10px",
                }}
                onClick={item.onClick}
                className={
                  window.location.pathname === item.path
                    ? "listitem_active"
                    : "listitem"
                }
              >
                <Typography
                  align="center"
                  className={
                    window.location.pathname === item.path
                      ? "listitem_active_listicon"
                      : "listicon"
                  }
                >
                  {item.icon}
                </Typography>
                <Typography
                  // sx={{minHeight:"10px!important"}}
                  align="center"
                  className={
                    window.location.pathname === item.path
                      ? "listitem_active_listtext"
                      : "listtext"
                  }
                >
                  {item.title}
                </Typography>
              </Grid>
              <p></p>
            </Stack>
          );
        })}
      </List>
    </>
  );
};
export default DrawerList;
