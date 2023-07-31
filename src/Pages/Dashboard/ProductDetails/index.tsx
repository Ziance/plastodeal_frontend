import React, { useEffect, useState } from "react";
import servicesLogos from "../../../jsonFiles/servicesData.json";
import { useParams } from "react-router-dom";
import WrapperComponent from "../../../components/WrapperComponent";
import { Button, Grid } from "@mui/material";

const ProductDetails = () => {
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const params = useParams();

  useEffect(() => {
    if (params.product) {
      const foundProduct = servicesLogos["logos-data"]?.find((repo) => {
        return repo?.text === params?.product?.toUpperCase().replace("-", " ");
      });
      setCurrentRepo(foundProduct);
    }
  }, []);

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
              <h2>{currentRepo.text}</h2>
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
              color: "white !important",
              fontSize:"16px",
              backgroundColor: "#a3a1a2",
              borderColor: "#fff",
              margin: 4,
              paddingX: 2,
            }}
          >
            Back
          </Button>
        </div>
      </Grid>
    </WrapperComponent>
  );
};
export default ProductDetails;
