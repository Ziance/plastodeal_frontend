import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import WrapperComponent from "../../../components/WrapperComponent";
import { Grid } from "@mui/material";

const ServiceDetails = () => {
  const params = useParams();
//   const =[]
  useEffect(() => {
    switch (params.dynamicPath) {
      case "new-machines":
        return console.log("new");
      case "old-machines":
        return console.log("old");
      case "mould-makers":
        return console.log("mould");
      case "old-moulds":
        return console.log("old-mould");
      case "granules-supplier":
        return console.log("granules");
      case "machine-job%20work":
        return console.log("machine job");
      case "plastic-products":
        return console.log("plastic product");
      case "electrical-equipment":
        return console.log("elec equip");
      case "mechanical-equipments":
        return console.log("mech equip");
      case "hydraulic-equipment":
        return console.log("hydraulic eqip");
      case "refurbisher":
        return console.log("referbish");
      case "freelancers":
        return console.log("freelance");
      case "patent-attorney":
        return console.log("patent att");
      case "website-developer":
        return console.log("website-developer");
      case "transpoter":
        return console.log("transpoter");
      case "insurance-advisor":
        return console.log("insurance-advisor");
      case "dashboard":
        return console.log("dashboard");

      default:
        break;
    }
  }, []);

  return (
    <WrapperComponent isHeader>
      <Grid item xs={12} border={1}>
        <div>{params.dynamicPath}</div>
      </Grid>
    </WrapperComponent>
  );
};

export default ServiceDetails;
