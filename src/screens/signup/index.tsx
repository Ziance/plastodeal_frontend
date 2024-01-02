import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import "./signup.css";
import MuiToggleButton from "@mui/material/ToggleButton";
// import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useNavigate } from "react-router-dom";
import WrapperComponent from "../../components/WrapperComponent";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import PlastoLogo from "../../assets/images/plastocurrentlogo.png"

const theme = createTheme();
const initialValues = {
  email: "",
  password: "",
};
const ToggleButton = styled(MuiToggleButton)((selectedColor) => ({
  "&.Mui-selected": {
    color: "black",
    backgroundColor: selectedColor,
    // border:"inset 1vh solid "
    outline: "2.5px solid #269682",
  },
}));

const signInSchema = yup.object().shape({
  email: yup.string().trim().email().required("userName is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(4, "Password is too short - should be 4 chars min"),
});
// const navigate = useNavigate();
// const Navigatetologin = () => navigate("/login");
export default function SignUp() {
  let navigate = useNavigate();
  const [loginType, setLoginType] = React.useState("web");
  const { t } = useTranslation();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    selectedLginType: string
  ) => {
    setLoginType(selectedLginType);
  };
  const navigateToggle = () => {
    if (loginType === "freeLogin") {
      navigate("/freelogin");
    } else {
      navigate("/companyRegistration");
    }
  };
  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader>
      <Grid item xs={12}  >
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              boxShadow: 1,
              backgroundColor: "#ffff",
              borderRadius: 2,
              px: 4,
              py: 2,
              m:2,
              // marginTop: 8,
              marginBottom: { xs: "1", md: "16" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "100%",
            }}
          >
            <CssBaseline />
            <img
              src={PlastoLogo}
              style={{ height: "auto", width: "56%", marginLeft: "2%" }}
              alt=""
            />
            <Typography variant="h5">{t("signup.heading")}</Typography>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{ mt: 3 ,width:"100%"}}
              // bgcolor="red"  
            >
              <Grid container spacing={2} justifyContent="center" >
                <ToggleButtonGroup
                  orientation="vertical"
                  fullWidth
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "100%",
                  }}
                  color="primary"
                  value={loginType}
                  // exclusive
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                >
                  <ToggleButton
                    value="freeLogin"
                    style={{ marginBottom: "5%", maxWidth: "100%" }}
                    className="togglebutton"
                  >
                    {t("signup.freeLogin")}
                  </ToggleButton>
                  <ToggleButton value="company" className="togglebutton">
                    {t("signup.company")}
                  </ToggleButton>
                </ToggleButtonGroup>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={navigateToggle}
                  sx={{
                    mt: 5,
                    mb: 1,
                    // height: "56px",
                    width: "95%",
                    fontWeight: "700",
                    backgroundColor: "#00ABB1",
                    transition: "background-color 0.3s", // Optional: Smooth transition for the hover effect
                    "&:hover": {
                      backgroundColor: "#07453a", // New background color when hovering
                      cursor: "pointer", // Optional: Change cursor to a pointer on hover
                    },
                  }}
                >
                  {t("signup.next")}
                </Button>
              </Grid>

              <Grid container justifyContent="center">
                <Grid item>
                  <Typography textAlign="left">
                    {t("signup.alreadyRegistered")}{" "}
                    <Button
                      type="submit"
                      sx={{ color: "#00ABB1" }}
                      // variant="contained"
                      // handleClick={NavigateOnClickRegistraion}
                      onClick={() => navigate("/login")}
                    >
                      {" "}
                      {t("signup.login")}
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Grid>
    </WrapperComponent>
    // </ThemeProvider>
  );
}
