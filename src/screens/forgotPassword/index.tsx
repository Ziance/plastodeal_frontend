import React, { useState, useEffect } from "react"
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as yup from "yup";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AuthState } from "../../redux/auth/types"
import { forgotPasswordAction, loginAction } from "../../redux/auth/middleware";
import { authSelector, setLoading } from "../../redux/auth/authSlice";
import { LoadingState } from "../../types/AppNav";
import { useAppDispatch } from "../../redux/store"
import { toast } from 'react-toastify';
import PlastoLogo from "../../assets/images/plastocurrentlogo.png"


export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const authState: AuthState = useSelector(authSelector)
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState<any>();
  const NavigateOnClickRegistraion = () => {
    navigate("/signUp");
  };
  //   const NavigateOnClick = () => {
  //     navigate("/freelogin");
  //   };
  const { t } = useTranslation();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),

  });

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log("values ", values);

      dispatch(setLoading(LoadingState.LOADING))
      const res = await  dispatch(forgotPasswordAction({ email: values.email}))
      console.log("res",res.meta.requestStatus);
      if (res.meta.requestStatus==="fulfilled") {
        console.log("gettting in" ,res.payload);
        toast.success("email successfully sent")
        // navigate("/login")
      }else{
        toast.error("User Not Found")
      }
      // dispatch(loginAction({
      //   email: values.email,
      //   password: values.password,
      // })
      // )  
    }

  });



  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader>
      <Grid container  justifyContent="center" alignItems="center"  p={6}>
        <Box
          sx={{
            width:{md: "50%",xs:"90%",xl:"10%"},
            // height: {md: "70%",sm:"70%",xs:"50%",xl:"50%"},
            boxShadow: 3,
            borderRadius: 2,
            // px: 4,
            py: 2,
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >

          <img
            src={PlastoLogo}
            alt=""
            style={{ height: "auto", width: "56%", marginLeft: "2%" }}
          />
          <Typography>{t("forgotpassword.heading")}</Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            {/* <Box sx={{ mt: 3 }}> */}
            <Grid container >
              <Grid item xs={12} marginTop={4}>
                {/* <Typography fontWeight="bolder">
                    {t("login.email")}
                  </Typography> */}
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  placeholder={t("forgotpassword.email")}
                  type="email"
                  size="medium"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: "#00abb1",
                    // height: "56px",
                    fontWeight: "700",
                    textTransform: "initial",
                    "&:hover": {
                      backgroundColor: "#07453A"
                    },

                  }}
                >
                  {t("forgotpassword.sendbtn")}
                </Button>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Typography sx={{ fontSize: "12px" }}>{t("forgotpassword.text")}{" "}<a style={{ color: "#0E8C78", cursor: "pointer" }} onClick={() => navigate("/login")}>{t("forgotpassword.login")}</a></Typography>
              </Grid>
            </Grid>

            {/* <Grid container justifyContent="center">
                <Grid item>
                  <Typography textAlign="left">
                    {t("login.noAccount")}{" "}
                    <Button
                      sx={{ color: " #00abb1" }}
                      onClick={NavigateOnClickRegistraion}
                    >
                      {t("login.singupbtn")}
                    </Button>
                  </Typography>
                </Grid>
              </Grid> */}
            {/* </Box> */}
          </form>
        </Box>
      </Grid>
      <CssBaseline />
    </WrapperComponent>
    // </ThemeProvider>
  );
}
