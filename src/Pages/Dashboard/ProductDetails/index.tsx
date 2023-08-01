import React, { useEffect, useState } from "react";
import servicesLogos from "../../../jsonFiles/servicesData.json";
import productDetail from "./productData.json";
import { useParams } from "react-router-dom";
import Imagenew from "../../../assets/images/filedropimage/filedropIcon.jpg"
import WrapperComponent from "../../../components/WrapperComponent";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const ProductDetails = () => {
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const params = useParams();

  useEffect(() => {
    if (params.product) {
      const foundProduct = servicesLogos["logos-data"]?.find((repo) => {
        return repo?.text === params?.product?.replace("-", " ");
      });
      setCurrentRepo(foundProduct);
    }
  }, []);

  const Mydata = productDetail.find(
    (item) => item.productName === params?.product?.replace("-", " ")
  );
  console.log("MYDATA.........", Mydata);

  return (
    <WrapperComponent isHeader>
      <Grid
        item
        md={4}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div>
          {currentRepo && (
            <div>
              <h2
                style={{
                  textTransform: "capitalize",
                  font: "400 24px/32px Roboto,Helvetica Neue,sans-serif",
                  margin: "0px 0px 16px",
                  color: "#3d4465",
                }}
              >
                {currentRepo.text}
              </h2>
            </div>
          )}
        </div>
      </Grid>
      <Grid
        item
        md={8}
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            sx={{
              color: "#485058",
              fontSize: "16px",
              backgroundColor: "#d7dae3",
              borderColor: "#fff",
              margin: 4,
              paddingX: 2,
              textTransform: "capitalize",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
              },
            }}
          >
            Back
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
        <Grid container spacing={3} mt={2}>
          {Mydata?.data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
              <Card
                sx={{
                  borderRadius: "10px",
                  boxShadow: "0 0 13px 0 #523f690d",
                }}
              >
                <CardContent sx={{ paddingBottom: "0px !important" }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <CardMedia
                        component="img"
                        image={Mydata.url}
                        alt="image"
                        sx={{
                          width: "auto",
                          minHeight: "6vh",
                          maxHeight: "6vh",
                          margin: "0 auto",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        align="center"
                        color="text.secondary"
                        gutterBottom
                      >
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default ProductDetails;
