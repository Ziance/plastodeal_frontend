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
import { loginAction } from "../../redux/auth/middleware";
import { authSelector, setLoading } from "../../redux/auth/authSlice";
import { LoadingState } from "../../types/AppNav";
import { useAppDispatch } from "../../redux/store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      
     console.log("values ",values);
     
        dispatch(setLoading(LoadingState.LOADING))
        // const res = await  dispatch(loginAction({ email: values.email}))
          // console.log("res",res);
          // if (res?.payload) {
          //   console.log("gettting in" ,res.payload);
          //   toast.success("Login successfull")
          // }
        // dispatch(loginAction({
        //   email: values.email,
        //   password: values.password,
        // })
        // )
        // alert(JSON.stringify(values));
      }

  });
 

 
  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader={true}>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            width: "30%",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CssBaseline />
          <img
            src={"././plastocurrentlogo.png"}
            style={{ height: "auto", width: "56%", marginLeft: "2%" }}
          />
          <Typography>{t("login.heading")}</Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* <Typography fontWeight="bolder">
                    {t("login.email")}
                  </Typography> */}
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder={t("login.email")}
                    type="email"
                    size="medium"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
              
              </Grid>
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
                }}
              >
                {t("login.submitbtn")}
              </Button>
              <Grid container justifyContent="center">
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
              </Grid>
            </Box>
          </form>
        </Box>
      </Grid>
      <ToastContainer/>
    </WrapperComponent>
    // </ThemeProvider>
  );
}
