import React, { useEffect } from "react";
import WrapperComponent from "../../components/WrapperComponent";
import { Grid, Typography, Button, Link } from "@mui/material";
import Tooltip from "@mui/material/Tooltip"
// import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useAppDispatch } from "../../redux/store";
import { getMastersData } from "../../redux/SuperAdminController/masters/middleware";
import { useSelector } from "react-redux";
import { mastersSelector } from "../../redux/SuperAdminController/masters/mastersSlice";
import CopyToClipboardButton from "../../components/CopyToClipboard";
// import CopyToClipboard from "@r";


const ShareApp = () => {
  const dispatch = useAppDispatch()
  const { masterData, allData } = useSelector(mastersSelector);
  useEffect(() => {
    dispatch(getMastersData("banner"))
  }, [])
  useEffect(() => {
    console.log("master data", masterData);
    console.log("al data", allData);

  }, [allData, masterData])
  const handleSocial = (title: string) => {
    switch (title) {
      case "facebook":
        return window.open("https://www.facebook.com")?.focus();
      case "gmail":
        return window.open("https://www.gmail.com")?.focus();
      case "linkedin":
        return window.open("https://www.linkedin.com")?.focus()
      case "pinterest":
        return window.open("https://www.pinterest.com")?.focus()
      case "twitter":
        return window.open("https://www.twitter.com")?.focus()
      case "whatsapp":
        return window.open("https://www.whatsapp.com")?.focus()
      default:
        break;
    }
  }
  return (
    <WrapperComponent isHeader>
      <Grid item xs={10} sm={6} md={12}>
        <div style={{ height: "auto" }}>
          <div
            style={{
              paddingRight: "50px",
              paddingLeft: "50px",
              background: "#fff",
            }}
          >
            <img
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              src="https://www.plastodeal.com/assets/images/share.jpg"
              alt="SHARE"
            />
            <div>
              <Typography>Share Plastodeal with the world</Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "30px",
              }}
            >
              <Typography className="linkText" color="#194039">
                <CopyToClipboardButton text="www.plastodeal.com" />
                {/* <Tooltip title="Copy to Clipboard"><Button id="website" onClick={handleCopy}>www.plastodeal.com</Button></Tooltip> */}
              </Typography>
            </div>
            <div style={{ display: "flex", marginBottom: "6vh" }}>
              <div className="socialIcon" id="icon1">
                <FacebookOutlinedIcon className="icon" fontSize="large" onClick={() => handleSocial("facebook")} />
              </div>
              <div className="socialIcon" id="icon2">
                <MailRoundedIcon className="icon" fontSize="large" onClick={() => handleSocial("gmail")} />
              </div>
              <div className="socialIcon" id="icon3">
                <LinkedInIcon className="icon" fontSize="large" onClick={() => handleSocial("linkedin")} />
              </div>
              <div className="socialIcon" id="icon4">
                <PinterestIcon className="icon" fontSize="large" onClick={() => handleSocial("pinterest")} />
              </div>
              <div className="socialIcon" id="icon5">
                <TwitterIcon className="icon" fontSize="large" onClick={() => handleSocial("twitter")} />
              </div>
              <div className="socialIcon" id="icon6">
                <WhatsAppIcon className="icon" fontSize="large" onClick={() => handleSocial("whatsapp")} />
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </WrapperComponent>
  );
};

export default ShareApp;
