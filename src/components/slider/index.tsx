import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
// import "./_slider.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import 'react-slick/dist/react-slick.css';
// import image from "../../assets/images/bannerImages/Coming_Soon2.jpg"

const SimpleSlider = (data: any) => {
  const [filteredData, setFilteredData] = useState<string[] | undefined>()
  const [filteredDataLength, setFilteredDataLength] = useState<number | undefined>(0)
  const [isLoading, setIsLoading] = useState(false)
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: filteredDataLength,
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

  useEffect(() => {
    setIsLoading(true)
    const filter = data?.data?.filter((item: any) => item.status === true)
    setFilteredData(filter)
    console.log("filtwr data", filteredData);
    if (filteredData?.length) {
      console.log("getting innnnnnn");
      if (filteredData?.length===1) {
        setFilteredDataLength(filteredData.length)
      } else {
        setFilteredDataLength(filteredData.length - 1)
      }
      
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  }, [data?.data])
  return (
    <>
      {isLoading ?
       <>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" /></>
        :
        <>
          <Slider {...settings} className="slickDots">
            {filteredData?.map((item: any, index: any) => (
              <Card
                key={item.id}
                elevation={0}
                square={true}
                sx={{ minHeight: "21vh", maxWidth: "95%", marginTop: "0%" }}
              >
                <CardMedia
                  component="img"
                  // image={`data:image/png;base64, ${item?.image}`}
                  image={item?.image}
                  height="190vh"
                  width="10vh"
                  sx={{ objectFit: "fill" }}
                />
              </Card>
            ))}

          </Slider>
        </>

      }
      </>
      );
};
      export default SimpleSlider;
