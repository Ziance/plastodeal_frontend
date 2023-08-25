import { Typography } from "@mui/material";
import React from "react";
import Link from "@mui/material/Link";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <WrapperComponent isHeader>
      <div style={{ padding: "40px" }}>
        <Typography
          fontSize="20px"
          fontWeight="bolder"
          font-family="poppins,sans-serif"
        >
          {t("aboutUs.heading")}
        </Typography>
        <br />
        <Typography className="fontstyle">{t("aboutUs.introText")}</Typography>
        <br />
        <Typography className="fontstyle">
          {t("aboutUs.introText2")}
          {/* Plastodeal brings the technologies togethers, enable to create
        connections, expand business growth. Platform is dedicated to help our
        members to shape the future and make a positive impact. */}
        </Typography>
        <br />
        <Typography>
          <b>
            {t("aboutUs.subheading1.heading")}
            {/* We support entire supply chain associated with plastic and allied
          industries. */}
          </b>
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item1")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item2")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item3")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item4")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item5")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item6")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item7")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item8")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item9")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item10")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item11")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item12")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading1.item13")}
        </Typography>
        <br />
        <Typography>
          <b> {t("aboutUs.subheading2")}</b>
        </Typography>
        <br />
        <Typography>
          <b> {t("aboutUs.subheading3.heading")}</b>
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item1")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item2")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item3")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item4")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item5")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item6")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item7")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item8")}
        </Typography>
        <Typography>
          <b>.</b> {t("aboutUs.subheading3.item9")}
        </Typography>
        <br />
        <Typography>{t("aboutUs.noteText")}</Typography>
        <br />
        <Typography>
          <b>{t("aboutUs.joinUs")}</b>{" "}
          <Link href="#" variant="body2" color="#00abb1">
            {"www.plastodeal.com"}
          </Link>
        </Typography>
        <br />
        <Typography>
          <b>{t("aboutUs.contactUs")}</b>
        </Typography>
        <br />
        <Typography>
          <Link href="#" variant="body2" color="#00abb1">
            {"hr@plastodeal.com"}
          </Link>
        </Typography>
        <Typography>
          <Link href="#" variant="body2" color="#00abb1">
            {"plastodeal@gmail.com"}
          </Link>
        </Typography>
        <Typography>
          <Link href="#" variant="body2" color="#00abb1">
            {"+91-8401699473"}
          </Link>
        </Typography>
        <br />
        <Typography>
          <b>{t("aboutUs.address")}</b>
        </Typography>
        <Typography>{t("aboutUs.addressText")}</Typography>
        <Typography>
          <Link href="#" variant="body2" color="#00abb1">
            {" allxsolutionsindia@gmail.com"}
          </Link>
        </Typography>
      </div>
    </WrapperComponent>
  );
};

export default AboutUs;
