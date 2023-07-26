import React from "react";
import WrapperComponent from "../../components/WrapperComponent";
import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ShareApp = () => {
  return (
    <WrapperComponent isHeader>
      <Grid item xs={10} sm={6} md={12}>
        <div style={{ height: "auto"}}>
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
                <Link to="/">{"www.plastodeal.com"}</Link>
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <div className="socialIcon" id="icon1">
                <FacebookOutlinedIcon className="icon" fontSize="large" />
              </div>
              <div className="socialIcon" id="icon2">
                <MailRoundedIcon className="icon" fontSize="large" />
              </div>
              <div className="socialIcon" id="icon3">
                <LinkedInIcon className="icon" fontSize="large" />
              </div>
              <div className="socialIcon" id="icon4">
                <PinterestIcon className="icon" fontSize="large" />
              </div>
              <div className="socialIcon" id="icon5">
                <TwitterIcon className="icon" fontSize="large" />
              </div>
              <div className="socialIcon" id="icon6">
                <WhatsAppIcon className="icon" fontSize="large" />
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </WrapperComponent>
  );
};

export default ShareApp;
