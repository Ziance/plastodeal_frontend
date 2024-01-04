import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import Link from "@mui/material/Link";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { getAllStaticPagesAction } from "../../redux/SuperAdminController/staticPages/middleware";
import { useSelector } from "react-redux";
import { staticPagesSelector } from "../../redux/SuperAdminController/staticPages/staticPagesSlice";
import { htmlToText } from "html-to-text";

const AboutUs = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const { staticPagesDetails } = useSelector(staticPagesSelector)
  const [aboutUs, setAboutUs] = useState<string | any>()

  useEffect(() => {
    dispatch(getAllStaticPagesAction())
  }, [])
  useEffect(() => {
    const updatedData = staticPagesDetails?.filter((item: any) => item?.title === "AboutUs")
    setAboutUs(updatedData[0]?.description)

  }, [staticPagesDetails])
 
  return (
    <WrapperComponent isHeader>
      <div style={{ padding: "40px" }} dangerouslySetInnerHTML={{__html:aboutUs}}>
     
      </div>
    </WrapperComponent>
  );
};

export default AboutUs;
