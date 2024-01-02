import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { createAccountAction } from "../../redux/auth/middleware";
import * as yup from 'yup';
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { toast } from 'react-toastify';
import PlastoLogo from "../../assets/images/plastocurrentlogo.png"

const theme = createTheme();

export default function FreeLoginSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentParams, setCurrentParams] = useState<any>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const params = useParams()
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  const fontSize = "12px";
  const validationSchema = yup.object().shape({
    email: yup.string().trim().email().required("Email is required"),
    firstName: yup.string().trim().min(2, "Too Short!").max(50, "Too Long!").required("First name is required"),
    lastName: yup.string().trim().min(2, "Too Short!").max(50, "Too Long!").required("Last name is required"),
    address: yup.string().trim().min(2, "Too Short!").required("Address is required"),
    interested: yup.string().trim().required("Interested is required"),
    password: yup.string().trim().required("Password is required").min(8, "Password is too short - should be 8 chars min"),
    confirmPassword: yup.string().trim().required("Confirm password is required").min(8, "Password is too short - should be 8 chars min").oneOf([yup.ref("password"), ""], "Passwords must match"),
    phoneNumber: yup
      .string().required("Phone Number is Required")
      .matches(phoneRegExp, "Not a valid Number")
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNumber: "",
      confirmPassword: "",
      interested: " ",
      countryCode: "+91",
      userRole: "User"
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("vslue", values);

      await dispatch(createAccountAction(values)).then(({ payload }: any) => {
        console.log("res....", payload);
        if (payload?.status === 200) {
          console.log("true");

          toast.success("free  user is Registered")
          navigate("/login")
        } else {
          console.log("false");

          toast.error(payload?.message)
        }

      }).catch((err) => {
        console.log("error....", err);
        toast.error("free  user is not Registered")
      })

      // navigate("/superadmin/users");
      // alert(JSON.stringify(values, null, 2));
    },
  });
  useEffect(() => {
    setCurrentParams(params.superadmin)
  }, [])

  const handleBack = () => {
    if (currentParams) {
      navigate("/superadmin/users");
    } else {
      navigate("/signUp");
    }
  }
  return (
    <WrapperComponent isHeader={false}>
      <Grid container m={0} justifyContent={"center"} alignItems="center"  height="100vh">

        <Box
          maxWidth="md"
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            display: "flex",
            p: 2,
            // flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffff",
          }}
        >

          <Grid container>
            <Grid item xs={12} display="flex" justifyContent="center">
              <img
                // src={"../../plastocurrentlogo.png"}
                src={PlastoLogo}
                alt=""
                style={{ height: "auto", width: "45%", marginLeft: "2%" }}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Typography
                component="h1"
                variant="h6"
                fontSize="17px"
                fontFamily="sans-serif"
              >
                {currentParams ? t("freeLogin.superadminHeading") : t("freeLogin.heading")}
              </Typography>
            </Grid>
            <Grid item xs={12} marginTop={5}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label={t("freeLogin.firstname")}
                      size="small"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label={t("freeLogin.lastname")}
                      type="lastName"
                      size="small"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                      helperText={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </Grid>
                  <Grid item md={12} xs={12} >
                    <label>{t("freeLogin.address")}</label>
                    <TextareaAutosize
                      // fullWidth
                      id="address"
                      name="address"
                      placeholder={t("freeLogin.address")}
                      style={{
                        border: ".5px solid gray",
                        padding: 10,
                        minWidth: "100%",
                        maxWidth: "100%",
                        minHeight: "10vh",
                      }}
                      // label="Password"
                      // type="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // error={formik.touched.address && Boolean(formik.errors.address)}
                    // helperText={formik.touched.address && formik.errors.address}
                    />
                    {formik.errors.address && <Typography variant="body2" color="red">{formik.errors.address}</Typography>}
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      name="phoneNumber"
                      label={t("freeLogin.phone")}
                      type="phoneNumber"
                      size="small"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                      }
                      helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label={t("freeLogin.email")}
                      type="email"
                      size="small"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label={t("freeLogin.password")}
                      size="small"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <Box
                      sx={{
                        backgroundColor: "#D7DAE3",
                        width: "15%",
                        maxHeight: "5vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                    // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword && (
                        <VisibilityIcon sx={{ scale: ".7" }} />
                      )}
                      {!showPassword && (
                        <VisibilityOffIcon sx={{ scale: ".7" }} />
                      )}
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label={t("freeLogin.rewritepasword")}
                      size="small"
                      // type="confirmPassword"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type={showPassword ? "text" : "password"}
                      // InputProps={{
                      //   endAdornment: (
                      //     <InputAdornment position='end' >

                      //     </InputAdornment>
                      //   ),
                      // }}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        formik.errors.confirmPassword
                      }
                    />
                    <Box
                      sx={{
                        backgroundColor: "#D7DAE3",
                        width: "15%",
                        maxHeight: "5vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "0px 5px 5px 0px",
                      }}
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                    // onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword && (
                        <VisibilityIcon sx={{ scale: ".7" }} />
                      )}
                      {!showPassword && (
                        <VisibilityOffIcon sx={{ scale: ".7" }} />
                      )}
                    </Box>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <TextField
                      fullWidth
                      id="interested"
                      name="interested"
                      label={t("freeLogin.interested")}
                      type="interested"
                      size="small"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.interested}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.interested &&
                        Boolean(formik.errors.interested)
                      }
                      helperText={
                        formik.touched.interested && formik.errors.interested
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={6}>
                        <Button
                          sx={{
                            backgroundColor: "#D7DAE3",
                            color: "black",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                          variant="contained"
                          // onClick={() =>{params ? navigate("/superadmin/freelogin") : navigate("/")}}
                          onClick={handleBack}
                        >
                          {t("freeLogin.backbtn")}
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <Button
                          sx={{ backgroundColor: "#00ABB1", fontSize: 12 }}
                          variant="contained"
                          type="submit"
                        >
                          {t("freeLogin.submitbtn")}
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>

        </Box>
      </Grid>

      <CssBaseline />
    </WrapperComponent>
  );
}
