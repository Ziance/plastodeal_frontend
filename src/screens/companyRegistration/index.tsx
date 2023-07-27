import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize"
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from 'formik';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import * as yup from 'yup';
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import filedropIcon from "../../assets/images/filedropimage/filedropIcon.jpg"
import {
    Stepper,
    Step,
    StepLabel,
    StepIcon,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    FormLabel,
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import {DropzoneArea} from "material-ui-dropzone"
import FileDropzone from "../../components/filedropzone";


const theme = createTheme();

export default function CompanyRegistration() {
    const [showPassword, setShowPassword] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [companyType, setCompanyType] = useState();
    const [selectedCountryCode, setSelectedCountryCode] = useState<any>();
    const [selectedStateCode, setSelectedStateCode] = useState();
    const [selectedCityCode, setSelectedCityCode] = useState();
    const [formData, setFormData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedState, setSelectedState] = useState<any>();
    const [selectedCity, setSelectedCity] = useState<any>();
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate()
    const { t } = useTranslation()
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

    const countries = Country.getAllCountries()
    console.log("countries", countries);

    // let states=[]
    // if (selectedCountryCode) {
    //   useEffect(() => {
    //     const states = State.getStatesOfCountry(selectedCountryCode)
    //     const cities = City.getCitiesOfState(selectedCountryCode ,selectedState)
    //   }, [selectedCountryCode,selectedState]);
    // }




    const steps = [{ heading: `${t("companyLogin.step1")}`, icon: PersonIcon }, { heading:  `${t("companyLogin.step2")}`, icon: BusinessIcon }];


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // const handleChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value,
    //     });
    // };



    const fontSize = "12px"
    const inputPropSIze= "12px"
    const validationSchema = yup.object({
        firstName: yup
            .string()
            .required('firstName is required'),
        lastName: yup
            .string()
            .required('lastName is required'),
        email: yup
            .string()
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
        phone: yup
            .string()
            .required('Phone is required'),
        companyName: yup
            .string()
            .required('Company Name'),
        companyType: yup
            .string()
            .required('Company typ'),
        contactPerson: yup
            .string()
            .required('Contact person'),
        address: yup
            .string()
            .required('Contact person'),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: '',
            phone: "",
            password: '',
            confirmPassword: "",
            companyName: "",
            companyType: "",
            contactPerson: "",
            address: ""
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const handleCompanyType = (e: any) => {
        console.log("e=====>", e.target.value);
        setCompanyType(e.target.value)
    }
    const handleCountry = (e: any) => {
        console.log("country=====>", e.target.value);
        const states = State.getStatesOfCountry(e.target.value)
        setSelectedCountryCode(e.target.value)
        setSelectedState(states)
    }
    const handleState = (e: any) => {
        console.log("state=====>", e.target.value);
        const cities = City.getCitiesOfState(selectedCountryCode, e.target.value,)
        console.log("cities", cities);

        setSelectedStateCode(e.target.value)
        setSelectedCity(cities)
    }
    const handleCity = (e: any) => {
        console.log("city=====>", e.target.value);
        setSelectedCityCode(e.target.value)
    }
    const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
        func(files[0])
      }
    return (
        // <ThemeProvider theme={theme}>
        <WrapperComponent isHeader={false}>
            <Grid container justifyContent="center" alignItems="center">
                <Container component="main" maxWidth="md" >
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
                            backgroundColor: "#ffff"
                        }}
                    >
                        <CssBaseline />
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container maxWidth="98%" >
                                <Grid item xs={12} display="flex" justifyContent="center">
                                    <Typography component="h1" variant="h6" fontSize="17px" fontFamily="sans-serif">
                                        {t("companyLogin.heading")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} marginTop={5}>
                                    <Stepper activeStep={activeStep}  >
                                        {steps?.map((label) => (
                                            <Step key={label.heading} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                                                <StepIcon icon={<label.icon sx={{
                                                    backgroundColor: activeStep === 1 ? "#3F51B5" : activeStep === 2 ? "#3F51B5" : "grey",
                                                    color: "white", scale: ".8", borderRadius: "50%"
                                                }} />}></StepIcon>
                                                <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>{label.heading}</Typography>
                                                {/* <StepLabel > {label.heading}</StepLabel> */}
                                            </Step>
                                        ))}
                                    </Stepper>

                                </Grid>
                                <Grid item xs={12} marginTop={2}>
                                    {activeStep === 0 && (
                                        <>
                                            <Grid container border={1} spacing={2}>
                                                <Grid item md={6} xs={12} >
                                                    <TextField
                                                        fullWidth
                                                        id="firstName"
                                                        name="firstName"
                                                        label={t("companyLogin.firstname")}
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.firstName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="lastName"
                                                        name="lastName"
                                                        label={t("companyLogin.lastname")}
                                                        type="lastName"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.lastName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="phone"
                                                        name="phone"
                                                        label={t("companyLogin.phone")}
                                                        type="phone"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                        helperText={formik.touched.phone && formik.errors.phone}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="email"
                                                        name="email"
                                                        label={t("companyLogin.email")}
                                                        type="email"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                                        helperText={formik.touched.email && formik.errors.email}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="password"
                                                        name="password"
                                                        label={t("companyLogin.password")}
                                                        size="small"
                                                        type={showPassword ? 'text' : 'password'}
                                                        autoComplete="off"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                                        helperText={formik.touched.password && formik.errors.password}
                                                    />
                                                    <Box
                                                        sx={{ backgroundColor: "#D7DAE3", width: "15%", maxHeight: "5vh", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0px 5px 5px 0px" }}
                                                        aria-label='toggle password visibility'
                                                        onClick={() => setShowPassword(prev => !prev)}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword && <VisibilityIcon sx={{ scale: ".7" }} />}
                                                        {!showPassword && <VisibilityOffIcon sx={{ scale: ".7" }} />}
                                                    </Box>
                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        required
                                                        label={t("companyLogin.rewritepasword")}
                                                        size="small"
                                                        // type="confirmPassword"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.confirmPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        type={showPassword ? 'text' : 'password'}
                                                        // InputProps={{
                                                        //   endAdornment: (
                                                        //     <InputAdornment position='end' >

                                                        //     </InputAdornment>
                                                        //   ),
                                                        // }}
                                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                    />
                                                    <Box
                                                        sx={{ backgroundColor: "#D7DAE3", width: "15%", maxHeight: "5vh", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "0px 5px 5px 0px" }}
                                                        aria-label='toggle password visibility'
                                                        onClick={() => setShowPassword(prev => !prev)}
                                                    // onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword && <VisibilityIcon sx={{ scale: ".7" }} />}
                                                        {!showPassword && <VisibilityOffIcon sx={{ scale: ".7" }} />}
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                    {activeStep === 1 && (
                                        <>
                                            <Grid container  spacing={2} fontSize={inputPropSIze}>
                                                <Grid item md={12} xs={12}  height={115} padding={0}>
                                                       <Box  width="20%" height="100%" >
                                                        <FileDropzone
                                                            
                                                            setFiles={onDocumentChange(setFile)}
                                                            accept='image/*,.pdf'
                                                            files={file ? [file] : []}
                                                            imagesUrls= { []}
                                                        
                                                        />
                                                        </Box>
                                                    {/* </FormGroup> */}
                                                  
                                                    {/* <TextField
                                                        fullWidth
                                                        id="companyName"
                                                        name="companyName"
                                                        label={t("companyLogin.firstname")}
                                                        size="medium"
                                                        type="file"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.companyName}
                                                        // sx={{width:"20%"}}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                                        helperText={formik.touched.companyName && formik.errors.companyName}
                                                    />
                                                    </Box>  */}
                                                </Grid>
                                                <Grid item md={6} xs={12} >
                                                    <TextField
                                                        fullWidth
                                                        id="companyName"
                                                        name="companyName"
                                                        label={t("companyLogin.companyName")}
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.companyName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                                                        helperText={formik.touched.companyName && formik.errors.companyName}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id="demo-simple-select-label">{t("companyLogin.companyType.heading")}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={companyType}
                                                            style={{ fontSize: inputPropSIze }}
                                                            label={t("companyLogin.companyType.heading")}
                                                            onChange={handleCompanyType}
                                                        >
                                                            <MenuItem sx={{fontSize:inputPropSIze}} value={"Public limited company"}>{t("companyLogin.companyType.option1")}</MenuItem>
                                                            <MenuItem  sx={{fontSize:inputPropSIze}} value={"Private limited company"}>{t("companyLogin.companyType.option2")}</MenuItem>
                                                            <MenuItem  sx={{fontSize:inputPropSIze}} value={"Joint Venture company"}>{t("companyLogin.companyType.option3")}</MenuItem>
                                                            <MenuItem  sx={{fontSize:inputPropSIze}} value={"Partenership firm"}>{t("companyLogin.companyType.option4")}</MenuItem>
                                                            <MenuItem  sx={{fontSize:inputPropSIze}} value={"one person company"}>{t("companyLogin.companyType.option5")}</MenuItem>
                                                            <MenuItem  sx={{fontSize:inputPropSIze}} value={"sole proprietorship"}>{t("companyLogin.companyType.option6")}</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="contactPerson"
                                                        name="contactPerson"
                                                        label={t("companyLogin.contactPerson")}
                                                        type="contactPerson"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.contactPerson}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.contactPerson && Boolean(formik.errors.contactPerson)}
                                                        helperText={formik.touched.contactPerson && formik.errors.contactPerson}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        id="phone"
                                                        name="phone"
                                                        label={t("companyLogin.contactPhone")}
                                                        type="phone"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                                                        helperText={formik.touched.phone && formik.errors.phone}
                                                    />
                                                </Grid>
                                                <Grid item md={12} xs={12}>
                                                    <label>{t("companyLogin.address")}</label>
                                                    <TextareaAutosize
                                                        // fullWidth
                                                        id="address"
                                                        name="address"
                                                        placeholder={t("companyLogin.address")}

                                                        style={{ border: ".5px solid gray", padding: 10, minWidth: "100%", maxWidth: "100%", minHeight: "10vh" }}
                                                        // label="Password"
                                                        // type="address"
                                                        value={formik.values.address}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    // error={formik.touched.address && Boolean(formik.errors.address)}
                                                    // helperText={formik.touched.address && formik.errors.address}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id="demo-simple-select-label">{t("companyLogin.country")}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedCountryCode}
                                                            label={t("companyLogin.country")}
                                                            onChange={handleCountry}
                                                            style={{ fontSize: inputPropSIze }}
                                                        // options={updatedCountries}
                                                        >
                                                            {
                                                                countries?.map((item) =>
                                                                    <MenuItem key={item.isoCode} style={{ fontSize: inputPropSIze }} value={item.isoCode}>{item.name}</MenuItem>
                                                                )
                                                            }
                                                        </Select>
                                                    </FormControl>

                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id="demo-simple-select-label">{t("companyLogin.state")}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedStateCode}
                                                            label={t("companyLogin.state")}
                                                            onChange={handleState}
                                                            style={{ fontSize: inputPropSIze }}
                                                        // options={updatedCountries}
                                                        >
                                                            {
                                                                selectedState?.map((item: any) =>
                                                                    <MenuItem key={item.isoCode} style={{ fontSize: inputPropSIze }} value={item.isoCode}>{item.name}</MenuItem>
                                                                )
                                                            }

                                                        </Select>
                                                    </FormControl>


                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel id="demo-simple-select-label">{t("companyLogin.city")}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedCityCode}
                                                            label={t("companyLogin.city")}
                                                            onChange={handleCity}
                                                            style={{ fontSize: inputPropSIze }}
                                                        >
                                                            {
                                                                selectedCity?.map((item: any) =>
                                                                    <MenuItem style={{ fontSize: inputPropSIze }} key={item.isoCode} value={item.isoCode}>{item.name}</MenuItem>
                                                                )
                                                            }

                                                        </Select>

                                                    </FormControl>


                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        required
                                                        label={t("companyLogin.zipcode")}
                                                        size="small"
                                                        // type="confirmPassword"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: fontSize } }}
                                                        value={formik.values.confirmPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        type={showPassword ? 'text' : 'password'}
                                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                    />

                                                </Grid>
                                                <Grid item xs={12} >
                                                    {/* <FormGroup> */}
                                                    <Checkbox />
                                                    {t("companyLogin.accept")}
                                                    <a onClick={() => window.open("/")} color="#1EAEFF" style={{ cursor: "pointer" ,fontSize: inputPropSIze }}>{t("companyLogin.terms")}</a>

                                                    {/* </FormGroup> */}
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}

                                </Grid>

                                <Grid item xs={12} display="flex" justifyContent="stretch">
                                    {activeStep > 0 && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleBack}

                                        >
                                            {t("companyLogin.backbtn")}
                                        </Button>
                                    )}
                                    {
                                        activeStep === 0 &&
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                        // disabled={activeStep === 0}
                                        >
                                            {t("companyLogin.nextbtn")}
                                        </Button>
                                    }

                                    {activeStep === 1 &&
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            sx={{ position: "absolute", right: 15 }}
                                        // disabled={activeStep === 0}
                                        >
                                             {t("companyLogin.submitbtn")}
                                        </Button>
                                    }

                                </Grid>
                            </Grid>
                        </form>
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

        </WrapperComponent>
        // </ThemeProvider>
    );
}
