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
    console.log("stattic page data", staticPagesDetails);
    const updatedData = staticPagesDetails?.filter((item: any) => item?.title === "PrivacyPolicy")
    // const text= htmlToText(updatedData[0]?.description)
    console.log("updatedData[0]?.description", updatedData[0]?.description.toString());
    setPrivacyPolicy(updatedData[0]?.description)

  }, [staticPagesDetails])
  useEffect(() => {
    console.log("privacyPolicy ", privacyPolicy);

  })
  return (
    <WrapperComponent isHeader>
      <div style={{ padding: "40px" }} dangerouslySetInnerHTML={{ __html: privacyPolicy }}>
      </div>
    </WrapperComponent>
  );
};

export default PrivacyPolicies;
