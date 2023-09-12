import React, { useEffect } from "react";
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
import { useAppDispatch } from "../../../redux/store";
import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { useSelector } from "react-redux";

const SuperAdminDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const { catagoriesDetails } = useSelector(catagorySelector)
  useEffect(() => {
    (async () => {
      await dispatch(getAllCatagoriesAction())
    })()
  }, [])
  console.log("catagoriesDetails", catagoriesDetails?.filter((item) => item?.status === true));
  const filteredCategoriesData = catagoriesDetails?.filter((item) => item?.status === true)
  console.log("filterd category data", filteredCategoriesData);

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

          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {/* {logosData.map((item, index) => ( */}
              {filteredCategoriesData?.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  {/* { item.image} */}
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
                    key={item?.id}
                    onClick={() =>
                      navigate(
                        `/superadmin/dashboard/${item?.name.replace(" ", "-")}`, {
                        state: {
                          item
                        }
                      }
                      )
                    }
                  >
                    <CardContent sx={{ paddingBottom: "0px !important" }}>

                      <CardMedia
                        component="img"
                        // image= {`data:image/png;base64, ${item?.image}`}
                        image={item?.image}
                        alt="no image"
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
                        {item?.name?.toUpperCase()}
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
