import React, { useState,useEffect } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function FreeLoginSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentParams,setCurrentParams]= useState<any>([])
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const params = useParams()
  const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     firstName: data.get("firstName"),
  //     LastName: data.get("LastName"),
  //     address: data.get("address"),
  //     email: data.get("email"),
  //     password: data.get("password"),
  //     country: data.get("country"),
  //     Intrested: data.get("Intrested"),
  //   });
  // };
  const fontSize = "12px";
  const validationSchema = yup.object({
    firstName: yup.string().required("firstName is required"),
    lastName: yup.string().required("lastName is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    address: yup.string().required("Address is required"),
    phone: yup
      .number()
      // .matches(phoneRegExp, "Not a valid Number")
      .required('Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phone: "",
      confirmPassword: "",
      interested: " ",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
  
      const res = await dispatch( createAccountAction(values))
      console.log("res",res);
      toast.success("free login user is Registered")
      // navigate("/")
      // alert(JSON.stringify(values, null, 2));
    },
  });
useEffect(()=>{
  setCurrentParams(params.superadmin)
},[])

  const handleBack = () => {
    
      if (currentParams) {
        navigate("/superadmin/users");
      }else{
        navigate("/signUp");
      }
    }
  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader={false}>
      <Grid container justifyContent="center" alignItems="center">
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: 2,
              scale: "1.2",
              px: 4,
              py: 4,
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#ffff",
            }}
          >
            <CssBaseline />
            {/* <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
            <Grid container maxWidth="98%">
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography
                  component="h1"
                  variant="h6"
                  fontSize="17px"
                  fontFamily="sans-serif"
                >
                  {currentParams ?  t("freeLogin.superadminHeading") : t("freeLogin.heading")  }
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
                    <Grid item md={12} xs={12}>
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
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        id="phone"
                        name="phone"
                        label={t("freeLogin.phone")}
                        type="phone"
                        size="small"
                        inputProps={{ style: { fontSize: fontSize } }}
                        InputLabelProps={{ style: { fontSize: fontSize } }}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.phone && Boolean(formik.errors.phone)
                        }
                        helperText={formik.touched.phone && formik.errors.phone}
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
                        required
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
            {/* <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //   required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //   required
                  fullWidth
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="ReWrite Password"
                  name="rePassword"
                  autoComplete="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //   required
                  fullWidth
                  name="Intrested"
                  label="Intrested In"
                  type="Intrested In"
                  id="Intrested In"
                  autoComplete="Intrested In"
                />
              </Grid>
    
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#d7dae3",

                color: " #485058",
                height: "56px",
                fontWeight: "700",
                borderColor: "#d7dae3",
              }}
            >
              Back
            </Button>
            <Button
              className=".btn-primary"
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                marginLeft: "79%",
                color: "",
                height: "56px",
                fontWeight: "700",
                backgroundColor: "#00abb1",
                borderColor: "#00abb1",
              }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box> */}
          </Box>
        </Container>
      </Grid>
<ToastContainer/>
    </WrapperComponent>
    // </ThemeProvider>
  );
}
