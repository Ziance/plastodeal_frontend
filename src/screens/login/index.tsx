import React, { useState, useEffect } from "react";
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
import PlastoLogo from "../../assets/images/plastocurrentlogo.png"
import { RotatingLines } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const authState: AuthState = useSelector(authSelector)
  const { currentUser, message } = useSelector(authSelector)
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState<any>();
  const [Isloading, setIsLoading] = useState(false)
  const NavigateOnClickRegistraion = () => {
    navigate("/signUp");
  };
  const NavigateToForgotPass = () => {
    console.log("sdfsdfsdf");

    navigate("/forgotPassword");
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
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const renderFunction = () => {
    console.log("authstate===>", message);

    const user = localStorage.getItem("user")
    if (user) {
      navigate("/")
      setTimeout(() => {
        toast.success("Login successfull")
      }, 500);
    } else {
      if (message === "rejected") {
        toast.error("Account is Blocked , Contact Admin")
      } else {
        toast.error("Login unSuccessfull")
      }

    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      if (!checked) {
        console.log("not working");
        setCheckedError(t("login.checkerror"))
      } else {
        setIsLoading(true)

        const res = await dispatch(loginAction({
          email: values.email,
          password: values.password,
        })
        )
        setTimeout(() => {
          setIsLoading(false)
          renderFunction()
        }, 1500);
        // console.log("res===>",res?.payload);
      }

    },
  });
  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.checked)", event.target.checked);
    if (event.target.checked === true) {
      setChecked(true)
    } else {
      setChecked(false)
    }
    // setChecked();
  };

  useEffect(() => {
    console.log("authState123", authState);
    // renderFunction()
  }, [authState, dispatch])
  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader={true}>
      <Grid container sx={{ display: "flex", justifyContent: "center" }} >
        <Box
          sx={{
            width: { md: "30%", sm: "60%", xs: "100%" },
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
            // src={"../../plastocurrentlogo.png"}
            src={PlastoLogo}
            alt=""
            style={{ height: "auto", width: "56%", marginLeft: "2%" }}
          />
          <Typography>{t("login.heading")}</Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography fontWeight="bolder">
                    {t("login.email")}
                  </Typography>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    placeholder={t("login.email")}
                    type="email"
                    size="small"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight="bolder">
                    {t("login.Password")}
                  </Typography>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    placeholder={t("login.Password")}
                    size="small"
                    // type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  flexDirection="column"
                  alignItems="baseline"
                >
                  <FormControlLabel

                    control={<>
                      <Checkbox value="allowExtraEmails" color="primary" onChange={handleCheckBox} />
                    </>
                    }
                    label={t("login.terms")}
                  />
                  {checked && checkedError ? "" : <Typography sx={{ color: "red", fontSize: "12px" }}>{checkedError}</Typography>}

                  <Button sx={{ color: "#194039" }} onClick={NavigateToForgotPass}>
                    {t("login.forgotP")}
                  </Button>
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
                  transition: "background-color 0.3s", // Optional: Smooth transition for the hover effect
                  "&:hover": {
                    backgroundColor: "#07453a", // New background color when hovering
                    cursor: "pointer", // Optional: Change cursor to a pointer on hover
                  },
                  height: "56px",
                  fontWeight: "700",
                }}
              >
                {Isloading ? <RotatingLines width="10%" /> :
                  <> {t("login.submitbtn")}</>
                }
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
      <ToastContainer />
    </WrapperComponent>
    // </ThemeProvider>
  );
}
