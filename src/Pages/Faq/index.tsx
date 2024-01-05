import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import { getMastersData } from "../../redux/SuperAdminController/masters/middleware";
import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { mastersSelector } from "../../redux/SuperAdminController/masters/mastersSlice";
import { Grid } from "@mui/material";

export default function BasicAccordion() {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { allData } = useSelector(mastersSelector)
  const [filteredData, setFilterData] = useState<any>()
  useEffect(() => {
    dispatch(getMastersData("faq"));
  }, [])
  useEffect(() => {
    setFilterData(allData?.faq?.filter((item: any) => item?.status === true))
  }, [allData])
  return (
    <WrapperComponent isHeader>
      <Grid container p={3}>
        <Grid item xs={12}>
          <Typography textAlign="left"  fontSize="30px">
            {t("Faq.heading")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {filteredData?.map((item: any, i: any) => (
            <Accordion key={item?._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item?.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {item?.answer}
                  {/* It is simply a platform for the plastic allied industries. Plastic
      allied industries are able to exhibit their products. It is just a
      B2B platform to provide and exhibit themselves. It is a subscription
      base platform(Rs 5100 +GST) for 1 year. No hidden or extra charges
      to put your products on this platform. */}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
      {/* <div style={{ padding: "40px" }}> */}


      {/* </div> */}
    </WrapperComponent>
  );
}
