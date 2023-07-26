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
import SimpleSlider from "../../components/slider";
import img_data from "../../jsonFiles/imageData.json";
import servicesLogos from "../../jsonFiles/servicesData.json";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
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
            {/* <Trans i18nKey="dashboard.heading"> */}
            <Typography fontSize="24px" fontStyle={"initial"}>
              {" "}
              {t("dashboard.heading")}
            </Typography>
            {/* </Trans> */}
          </Grid>
          <Grid
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
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              marginBottom: 2,
              height: "25vh",
              width: "10vh",
            }}
          >
            <SimpleSlider data={img_data} />
          </Grid>
          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container justifyContent="flex-start" spacing={0}>
              {servicesLogos["logos-data"].map((item, index) => (
                <Grid
                  item
                  xs={12}
                  md={24 / 15}
                  sx={{
                    margin: { md: "20px" },
                    marginTop: { xs: "20px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 2,
                    borderRadius: 5,
                    boxShadow: 0,
                    backgroundColor: "white",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.url}
                    alt="image"
                    style={{
                      width: "auto",
                      minHeight: "4vh",
                      maxHeight: "4vh",
                      marginBottom: "5%",
                    }}
                  />
                  {/* <CardContent sx={{textAlign:"center",backgroundColor:"red" ,p:0,height:"100%"}} >{item.text}</CardContent> */}
                  <Typography variant="subtitle2" textAlign="center">
                    {item.text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default Dashboard;
