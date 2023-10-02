// import { Button } from "@mui/material";
// import React, { useEffect } from "react";
// // import "./styles.css";



// const RazorPayModel = () => {
//   // const options = {
//   //   key: "rzp_test_HJG5Rtuy8Xh2NB",
//   //   amount: "100", //  = INR 1
//   //   name: "Acme shop",
//   //   description: "some description",
//   //   image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
//   //   handler: function(response) {
//   //     alert(response.razorpay_payment_id);
//   //   },
//   //   prefill: {
//   //     name: "Gaurav",
//   //     contact: "9999999999",
//   //     email: "demo@demo.com"
//   //   },
//   //   notes: {
//   //     address: "some address"
//   //   },
//   //   theme: {
//   //     color: "#F37254",
//   //     hide_topbar: false
//   //   }
//   // };

//   // const openPayModal = options => {
//   //   var rzp1 = new window.Razorpay(options);
//   //   rzp1.open();
//   // };
//   // useEffect(() => {
//   //   const script = document.createElement("script");
//   //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   //   script.async = true;
//   //   document.body.appendChild(script);
//   // }, []); 

//   return (
//     <>
//       {/* <button onClick={() => openPayModal(options)}>Pay</button> */}
//       <Button variant="contained" title="Submit" color="success">Pay Now</Button>

//     </>
//   );
// };
// export default RazorPayModel;


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
// import { logosData } from "../../../jsonFiles/servicesData";
import WrapperComponent from ".././WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
// import { useAppDispatch } from "../../../redux/store";
// import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";

const RzorPayModal = () => {
  // const dispatch =useAppDispatch()
  // const { catagoriesDetails } = useSelector(catagorySelector)
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(()=>{
    (async()=>{
    //  await dispatch(getAllCatagoriesAction())
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
              {/* {catagoriesDetails.map((item, index) => ( */}
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
                      // onClick={() =>
                      //   navigate(
                      //     `/superadmin/approval/processor-table/${item.name.replace(
                      //       " ",
                      //       "-"
                      //     )}`,{state:item}
                      //   )
                      // }
                    >
                      <CardContent sx={{ paddingBottom: "0px !important" }}>
                        <CardMedia
                          component="img"
                          // image={item?.image}
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
                          {/* {item.name?.toUpperCase()} */}
                        </Typography>
                      </CardContent>
                    </Card>
                </Grid>
              {/* ))} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default RzorPayModal;
