import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SimpleSlider from "../../../components/slider";
import img_data from "../../../jsonFiles/imageData.json";
import WrapperComponent from "../../../components/WrapperComponent";
import { useAppDispatch } from "../../../redux/store";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { getMastersData } from "../../../redux/SuperAdminController/masters/middleware";

const SuperAdminMasters = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const mastersCard = [
    {
      id: "1",
      heading: "COUNTRY",
      bgColor: "#DFF5F1",
      iconColor: "#D3E0F9",
      image: (
        <>
          <LanguageIcon sx={{ color: "#ffff" }} />
        </>
      ),
    },
    {
      id: "2",
      heading: "STATE",
      bgColor: "#ECFAE4",
      iconColor: "#D3E0F9",
      image: (
        <>
          <CorporateFareIcon sx={{ color: "#68CF29" }} />
        </>
      ),
    },
    {
      id: "3",
      heading: "CITY",
      bgColor: "#F7EDED",
      iconColor: "#EC5A73",
      image: (
        <>
          <LocationCityRoundedIcon sx={{ color: "#EC5A73" }} />
        </>
      ),
    },
    {
      id: "4",
      heading: "FAQ",
      bgColor: "#F7EDED",
      iconColor: "#EC5A73",
      image: (
        <>
          <HelpOutlineRoundedIcon sx={{ color: "#EC5A73" }} />
        </>
      ),
    },
    {
      id: "5",
      heading: "COMPANY TYPE",
      bgColor: "#F7EDED",
      iconColor: "#EC5A73",
      image: (
        <>
          <LocationCityRoundedIcon sx={{ color: "#EC5A73" }} />
        </>
      ),
    },
    {
      id: "6",
      heading: "BANNER",
      bgColor: "#D3E0F9",
      iconColor: "#EC5A73",
      image: (
        <>
          <ViewCarouselIcon sx={{ color: "#4D73F1  " }} />
        </>
      ),
    },
    {
      id: "6",
      heading: "CATEGORY",
      bgColor: "#D3E0F9",
      iconColor: "#EC5A73",
      image: (
        <>
          <ViewCarouselIcon sx={{ color: "#4D73F1  " }} />
        </>
      ),
    },
    {
      id: "7",
      heading: "PRIVACY POLICY",
      bgColor: "#D3E0F9",
      iconColor: "#EC5A73",
      image: (
        <>
          <ViewCarouselIcon sx={{ color: "#4D73F1  " }} />
        </>
      ),
    },
    {
      id: "7",
      heading: "REFUND POLICY",
      bgColor: "#D3E0F9",
      iconColor: "#EC5A73",
      image: (
        <>
          <ViewCarouselIcon sx={{ color: "#4D73F1  " }} />
        </>
      ),
    },
    {
      id: "7",
      heading: "ABOUT US",
      bgColor: "#D3E0F9",
      iconColor: "#EC5A73",
      image: (
        <>
          <ViewCarouselIcon sx={{ color: "#4D73F1  " }} />
        </>
      ),
    },
  ];
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
              {/* {t("masters.heading")} */}
              Masters
            </Typography>
          </Grid>
          <Grid item xs={12} display="flex">
            <Grid
              container
              mt={2}
              columnSpacing={2}
              rowSpacing={2}
              justifyContent="initial"
            >
              {mastersCard.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={item.id}>
                  <Card
                    sx={{
                      minWidth: "50%",
                      minHeight: "12vh",
                      p: 1,
                      borderRadius: "15px",
                      backgroundColor: "white",
                      cursor: "pointer",
                      boxShadow: ".4px",
                    }}
                    onClick={() => {
                      navigate(
                        `/superadmin/masters/${item.heading
                          .replace(" ", "-")
                          .toLocaleLowerCase()}`
                      )
                    }

                    }
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        padding: "0 !important",
                        height: "12vh",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Avatar
                        sx={{
                          scale: "2",
                          backgroundColor: item.bgColor,
                          margin: "55px",
                        }}
                      >
                        {item.image}
                      </Avatar>

                      <Typography variant="body1" fontSize="12px">
                        {item.heading}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default SuperAdminMasters;
