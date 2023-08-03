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
import { logosData } from "../../../jsonFiles/servicesData";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SuperAdminAdvertisement = () => {
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
              {t("superadmin.advertisement.heading")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", p: 5 }}
          >
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
            >
              +Add Advertisement
            </Button>
          </Grid>

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
                    onClick={() =>
                      navigate(
                        `/superadmin/advertisement/processor-table/${item.text.replace(" ", "-")}`
                      )
                    }
                  >
                    <CardContent sx={{ paddingBottom: "0px !important" }}>
                      <CardMedia
                        component="img"
                        image={item?.url}
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

export default SuperAdminAdvertisement;
