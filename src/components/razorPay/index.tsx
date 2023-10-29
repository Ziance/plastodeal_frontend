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


import React,{useEffect, useState} from "react";
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
import { useAppDispatch } from "../../redux/store";
import { paymentAsync } from "../../redux/auth/services";
import { paymentAction } from "../../redux/auth/middleware";
import { authSelector } from "../../redux/auth/authSlice";
import { RotatingLines } from "react-loader-spinner";
import logo from "../../assets/images/plastocurrentlogo.png"
import { toast } from "react-toastify";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
// import { useAppDispatch } from "../../../redux/store";
// import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";

interface IpayModal {
  inputName: string,
  inputAddress: string,
  inputEmail: string,
  inputPhone: string,
  setPaymentInfo: React.Dispatch<React.SetStateAction<any>>;
}
const PayModal: React.FC<IpayModal> = ({setPaymentInfo, inputEmail, inputAddress , inputPhone ,inputName}) => {
  const [orderId,setOrderId] = useState("")
  const [paymentDone,setPaymentDone] = useState(false)
  const [buttonLoading,setButtonLoading] = useState(false)
const dispatch = useAppDispatch()
const {payment} = useSelector(authSelector)
const amount = "10"
  useEffect(()=>{
   dispatch(paymentAction(amount))

  
   setTimeout(() => {
    if (payment?.status===200) {
      setOrderId(payment?.data?.data?.orderId)
    }
   }, 1500);
   
   
  },[])
  console.log("inputsssss", inputAddress,inputEmail, inputName, inputPhone);

   const options = {
    key: "rzp_test_eiIvhqrqpveRyX",
    order_id:orderId,
    amount: "100", //  = INR 1
    name: "Plasto deal",
    description: "some description",
    // image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
    Image: logo,
    handler: function(response:any) {
      console.log("response rezorpay",response.razorpay_payment_id);
      if (response?.razorpay_payment_id) {
        toast.success("Payment Successfull")
        setPaymentInfo(response?.razorpay_payment_id)
        setPaymentDone(true)
      } else {
        toast.error("Payment Failed")
        setPaymentDone(false)
      }
        // alert(response.razorpay_payment_id);
    },
    
    prefill: {
      name: inputName,
      contact: inputPhone,
      email: inputEmail
    },
    notes: {
      address: inputAddress
    },
    theme: {
      color: "#F37254",
      hide_topbar: false
    }
  };

 const Razorpay = (window as any).Razorpay;

  const openPayModal =( options:any) => {
    var rzp1 = new Razorpay(options);
    // var rzp1 = new window.raz
    rzp1.open();
  };
  const handlePayNow =()=>{
    setButtonLoading(true)
    setTimeout(() => {
      setButtonLoading(false)
      openPayModal(options)
    }, 1500);
  }
 useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []); 
  return (
    // <WrapperComponent isHeader>
      <Grid
        container
      >
       {paymentDone ? <div style={{display:"flex" ,alignItems:"center"}}><CheckCircleIcon color="success" sx={{ fontSize:"40px"}}/><Typography variant="body1">Payment Done</Typography></div> :
        <Button variant="contained" sx={{maxWidth:"8%"}}  color="success" onClick={handlePayNow}> {buttonLoading ?<RotatingLines width="35%" />: <>Pay Now</>}</Button>}
      </Grid>
    // </WrapperComponent>
  );
};

export default PayModal;
