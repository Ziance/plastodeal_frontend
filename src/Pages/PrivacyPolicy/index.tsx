import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import WrapperComponent from "../../components/WrapperComponent";
import { getAllStaticPagesAction } from "../../redux/SuperAdminController/staticPages/middleware";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { staticPagesSelector } from "../../redux/SuperAdminController/staticPages/staticPagesSlice";

const PrivacyPolicies = () => {
  const dispatch = useAppDispatch()
  const { staticPagesDetails } = useSelector(staticPagesSelector)
  const [privacyPolicy, setPrivacyPolicy] = useState<string | any>()

  useEffect(() => {
    dispatch(getAllStaticPagesAction())
  }, [])
  useEffect(() => {
    const updatedData = staticPagesDetails?.filter((item: any) => item?.title === "PrivacyPolicy")
    setPrivacyPolicy(updatedData[0]?.description)

  }, [staticPagesDetails])
 
  return (
    <WrapperComponent isHeader>
      <div style={{ padding: "40px" }} dangerouslySetInnerHTML={{ __html: privacyPolicy }}>
      </div>
    </WrapperComponent>
  );
};

export default PrivacyPolicies;
