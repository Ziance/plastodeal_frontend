import { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SimpleSlider from "../../components/slider";
import WrapperComponent from "../../components/WrapperComponent";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { catagorySelector } from "../../redux/SuperAdminController/catagories/catagoriesSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { getAllCatagoriesAction } from "../../redux/SuperAdminController/catagories/middleware";
import { fetchGetAllAdvertisementAction } from "../../redux/SuperAdminController/advertisement/middleware";
import { advertisementSelector } from "../../redux/SuperAdminController/advertisement/advertisementSlice";


const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { catagoriesDetails } = useSelector(catagorySelector)
  const { allAdvertisementData } = useSelector(advertisementSelector)
  const filteredCategoriesData = catagoriesDetails?.filter((item) => item?.status === true)


  useEffect(() => {
    (async () => {
      await dispatch(getAllCatagoriesAction())
      await dispatch(fetchGetAllAdvertisementAction())
    })()
  }, [dispatch])

  return (
    <WrapperComponent isHeader>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#FBFBFB",
          p: 3
        }}
      >
        <Grid container>
          <Grid item xs={12} display="flex">
            <Typography fontSize="24px" fontStyle={"initial"}>
              {t("dashboard.heading")}
            </Typography>
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
              marginTop: 2,
              height: "25vh",
              width: "10vh",
            }}
          >
            <SimpleSlider data={allAdvertisementData} />
          </Grid>

          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {filteredCategoriesData?.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Link
                    style={{ textDecoration: "none" }}
                    key={item._id}
                    to={`/dashboard/${item.name.replace(" ", "-")}`}
                  >
                    <Card
                      // onClick={() => navigate("dashboard/new-machine")}
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
                    >
                      <CardContent sx={{ paddingBottom: "0px !important" }}>
                        <CardMedia
                          component="img"
                          // image={`data:image/png;base64, ${item?.image}`}
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
                          {item.name.toUpperCase()}
                        </Typography>

                      </CardContent>
                    </Card>
                  </Link>
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
