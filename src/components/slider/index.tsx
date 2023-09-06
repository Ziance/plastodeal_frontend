import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import Slider from "react-slick";
// import "./_slider.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'react-slick/dist/react-slick.css';
// import image from "../../assets/images/bannerImages/Coming_Soon2.jpg"

const SimpleSlider = (data: any) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <>
      <Slider {...settings} className="slickDots">
        {/* {data?.data?.data?.map((item: any, index: any) => ( */}
        {data?.data?.map((item: any, index: any) => (
          <Card
            key={item.id}
            elevation={0}
            square={true}
            sx={{ minHeight: "21vh", maxWidth: "95%", marginTop: "0%" }}
          >
            <CardMedia
              component="img"
              image={`data:image/png;base64, ${item?.image}`}
              height="190vh"
              width="10vh"
              sx={{ objectFit: "fill" }}
            />
          </Card>
        ))}
      </Slider>
    </>
  );
};
export default SimpleSlider;
