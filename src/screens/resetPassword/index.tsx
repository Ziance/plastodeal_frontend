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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlastoLogo from "../../assets/images/plastocurrentlogo.png"
import { resetPasswordAction } from "../../redux/dashboard/middleware";


export default function ResetPassword() {
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
    password: yup
      .string()
      .required("Old Passsword is required"),
    newPassword: yup
      .string()
      .required("New Passsword is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Passsword is required"),

  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log("values ", values);

      dispatch(setLoading(LoadingState.LOADING))
      const res = await dispatch(resetPasswordAction(values))
      console.log("res", res.meta.requestStatus);
      if (res.meta.requestStatus === "fulfilled") {
        console.log("gettting in", res.payload);
        toast.success("Password successfully changed")
        // navigate("/login")
      } else {
        toast.error("User Not Found")
      }
    }

  });



  return (
    <WrapperComponent isHeader={true}>
      <Grid container sx={{ display: "flex", justifyContent: "center", height: { md: "90vh", xs: "80vh", sm: "85vh" } }}>
        <Box
          sx={{
            width: { md: "50%", xs: "90%", xl: "30%" },
            height:"auto",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            // py: 6,
            // marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white"
          }}
        >
          <CssBaseline />
          <img
            src={PlastoLogo}
            alt=""
            style={{ height: "auto", width: "56%", marginLeft: "2%" }}
          />
          <Typography>{t("resetPassword.heading")}</Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            {/* <Box sx={{ mt: 3 }}> */}
            <Grid container spacing={3}>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="oldPassword"
                  name="password"
                  label={t("resetPassword.oldPassword")}
                  type="password"
                  size="medium"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  label={t("resetPassword.newPassword")}
                  type="password"
                  size="medium"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="newPassword"
                  name="confirmPassword"
                  label={t("resetPassword.confirmPassword")}
                  type="password"
                  size="medium"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                    height: "56px",
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
      <ToastContainer />
    </WrapperComponent>
    // </ThemeProvider>
  );
}
