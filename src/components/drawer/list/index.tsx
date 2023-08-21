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
//------------------------------------super user icons-
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import SmartDisplayRoundedIcon from '@mui/icons-material/SmartDisplayRounded';
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
  superAdmin: any
  setLanguageDialogOpen: React.Dispatch<React.SetStateAction<any>>;
  isAdmin:boolean
}
const DrawerList: React.FC<Ilist> = ({ open, setLanguageDialogOpen, superAdmin ,isAdmin}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const sidebarSuperAdminData = [
    {
      title: `${t("header.drawer.superadmin.dashboard")}`,
      icon: <DashboardSharpIcon sx={{ fontSize: "30px" }} />,
      path: "/",
      onClick: () => {
        navigate("/");
      },
    },
    {
      title: `${t("header.drawer.superadmin.users")}`,
      icon: <AccountCircleIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/users",
      onClick: () => {
        navigate("/superadmin/users");
      },
    },
    {
      title: `${t("header.drawer.superadmin.jobs")}`,
      icon: <BusinessCenterIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/jobs",
      onClick: () => {
        navigate("/superadmin/jobs");
      },
    },
    {
      title: `${t("header.drawer.superadmin.masters")}`,
      icon: <ReorderRoundedIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/masters",
      onClick: () => {
        navigate("/superadmin/masters");
      },
    },
    {
      title: `${t("header.drawer.superadmin.advertisement")}`,
      icon: <CampaignRoundedIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/advertisement",
      onClick: () => {
        navigate("/superadmin/advertisement");
      },
    },
    {
      title: `${t("header.drawer.superadmin.postReq")}`,
      icon: <TextsmsIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/postReq",
      onClick: () => {
        // setLanguageDialogOpen(true);
        navigate("/superadmin/post-requirement");
      },
    },
    {
      title: `${t("header.drawer.superadmin.approval")}`,
      icon: <CheckCircleRoundedIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/approval",
      onClick: () => {
        navigate("/superadmin/approval");
      },
    },
    {
      title: `${t("header.drawer.superadmin.video")}`,
      icon: <SmartDisplayRoundedIcon sx={{ fontSize: "30px" }} />,
      path: "/superadmin/video",
      onClick: () => {
        navigate("/superadmin/video");
      },
    },
   
  ];
  const sidebarAdminData = [
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


    isAdmin? 
    {
      title: `${t("header.drawer.profile")}`,
      icon: <PersonIcon sx={{ fontSize: "30px" }} />,
      path: "/admin/companyprofile",
      onClick: () => {
        navigate("/admin/companyprofile");
      },
    }:
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
        setLanguageDialogOpen((prev:boolean)=>!prev);
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
  console.log("super admin",superAdmin);
  
  return (
    <>
    
      {superAdmin ?
        <List sx={{ overflowY: "scroll" }}>
          {sidebarSuperAdminData.map((item: any) => {
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
        </List> :
        <List sx={{ overflowY: "scroll" }}>
          {sidebarAdminData.map((item: any) => {
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
      }

    </>
  );
};
export default DrawerList;
