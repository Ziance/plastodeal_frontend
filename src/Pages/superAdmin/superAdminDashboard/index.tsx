import React from "react";
import {
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
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SimpleSlider from "../../../components/slider";
import img_data from "../../../jsonFiles/imageData.json";
import { logosData } from "../../../jsonFiles/servicesData";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const SuperAdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
              {t("dashboard.heading")}
            </Typography>
          </Grid>
          {/* <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Input
              placeholder={t("dashboard.search.placeholder")}
              disableUnderline
              sx={{
                width: {
                  xl: "20%",
                  lg: "20%",
                  md: "20%",
                  sm: "50%",
                  xs: "50%",
                },
                padding: {
                  xl: ".6%",
                  lg: ".6%",
                  md: ".6%",
                  sm: "2%",
                  xs: "2%",
                },
                backgroundColor: "#ffff",
                borderTopLeftRadius: "1.25rem",
                borderBottomLeftRadius: "1.25rem",
              }}
            />
            <Button
              sx={{
                backgroundColor: "#00ABB1",
                borderRadius: "0px 1.25rem 1.25rem 0px",
              }}
            >
              <SearchRoundedIcon sx={{ color: "white" }} />
            </Button>
          </Grid> */}
          {/* <Grid 
            item
            xs={12}
            sx={{
              marginBottom: 2,
              height: "25vh",
              width: "10vh",
            }}
          >
            <SimpleSlider data={img_data} />
          </Grid> */}

          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {logosData.map((item, index) => (
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
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/superadmin/dashboard/${item.text.replace(" ", "-")}`
                      )
                    }
                  >
                    <CardContent sx={{ paddingBottom: "0px !important" }}>
                      <CardMedia
                        component="img"
                        image={item.url}
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
                        {item.text.toUpperCase()}
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

export default SuperAdminDashboard;
