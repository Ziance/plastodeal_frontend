import React,{useEffect} from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { useAppDispatch } from "../../../redux/store";
import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";

const SuperAdminApproval = () => {
  const dispatch =useAppDispatch()
  const { catagoriesDetails } = useSelector(catagorySelector)
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(()=>{
    (async()=>{
     await dispatch(getAllCatagoriesAction())
    })()
  },[])
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
              Approval
            </Typography>
          </Grid>

          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {/* {logosData.map((item, index) => ( */}
              {catagoriesDetails.map((item, index) => (
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
                          `/superadmin/approval/processor-table/${item.name.replace(
                            " ",
                            "-"
                          )}`,{state:item}
                        )
                      }
                    >
                      <CardContent sx={{ paddingBottom: "0px !important" }}>
                        <CardMedia
                          component="img"
                          image={item?.image}
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
                          {item.name?.toUpperCase()}
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

export default SuperAdminApproval;
