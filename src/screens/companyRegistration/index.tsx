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
import { DropzoneArea } from "material-ui-dropzone"
import FileDropzone from "../../components/filedropzone";


const theme = createTheme();

export default function CompanyRegistration() {
    const [showPassword, setShowPassword] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [companyType, setCompanyType] = useState<any>();
    const [selectedCountryCode, setSelectedCountryCode] = useState<any>();
    const [selectedCountryName, setSelectedCountryName] = useState<any>();
    const [selectedStateCode, setSelectedStateCode] = useState<any>();
    const [selectedStateName, setSelectedStateName] = useState<any>();
    const [selectedCityCode, setSelectedCityCode] = useState<any>();
    const [selectedCityName, setSelectedCityName] = useState<any>();
    const [formData, setFormData] = useState({});
    const [checked, setChecked] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedState, setSelectedState] = useState<any>();
    const [selectedCity, setSelectedCity] = useState<any>();
    const [file, setFile] = useState<File | any>(null);
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




    const steps = [{ heading: `${t("companyLogin.step1")}`, icon: PersonIcon }, { heading: `${t("companyLogin.step2")}`, icon: BusinessIcon }];


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            navigate("/signUp")
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }

    };

    // const handleChange = (event) => {
    //     setFormData({
    //         ...formData,
    //         [event.target.name]: event.target.value,
    //     });
    // };


    const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
    const fontSize = "12px"
    const inputPropSIze = "12px"
    const dropdownFontsie = "12px"
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
            .required('Phone is required')
            .matches(phoneRegExp, "Not a valid Number"),
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
            phoneNumber: "",
            countryCode: "",
            password: '',
            confirmPassword: "",
            companyName: "",
            companyType: "",
            contactPerson: "",
            companyContactNumber: "",
            address: "",
            country: "",
            state: "",
            city: "",
            zipCode: "",
            accept: false,
            companyLogo: ""
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            values.companyType = companyType
            values.country = selectedCountryName
            // values.countryCode=selectedCountryCode
            values.state = selectedStateName
            values.city = selectedCityName
            values.accept = checked
            values.companyLogo = file

            alert(JSON.stringify(values, null, 2));
            console.log("values==>", values);

        },
    });

    const handleCompanyType = (e: any) => {
        console.log("e=====>", e.target.value);
        setCompanyType(e.target.value)
    }
    const handleCountry = (e: any) => {
        console.log("country=====>", e.target.value);
        const states = State.getStatesOfCountry(e.target.value.isoCode)
        setSelectedCountryCode(e.target.value.isoCode)
        setSelectedCountryName(e.target.value.name)
        setSelectedState(states)
    }
    const handleState = (e: any) => {
        console.log("state=====>", e.target.value);
        const data = e.target.value
        setSelectedStateName(data.name)
        setTimeout(() => {
            console.log("selectedCityName", selectedCityName);
            console.log("selected country code", selectedCountryCode);


        }, 2000);
        const cities = City.getCitiesOfState(selectedCountryCode, data?.isoCode)
        console.log("cities", cities);
        setSelectedStateCode(e.target.value.isoCode)
        setSelectedCity(cities)
    }
    const handleCity = (e: any) => {
        console.log("city=====>", e.target.value);
        setSelectedCityCode(e.target.value.isoCode)
        setSelectedCityName(e.target.value.name)
    }
    const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
        func(files[0])
    }


    const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("event.target.checked)", event.target.checked);
        if (event.target.checked === true) {
            setChecked(true)
        } else {
            setChecked(false)
        }
        // setChecked();
    };
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
                                            <Grid container spacing={2} rowSpacing={4}>
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
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedCountryCode}
                                                        label={t("companyLogin.country")}
                                                        onChange={handleCountry}
                                                        style={{ fontSize: dropdownFontsie }}
                                                    // options={updatedCountries}
                                                    >
                                                        {
                                                            countries?.map((item) =>
                                                                <MenuItem key={item.isoCode} style={{ fontSize: dropdownFontsie }} value={item.phonecode}><Typography>{item.flag}{" "}{item.phonecode}</Typography></MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                    <TextField
                                                        fullWidth
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        label={t("companyLogin.phone")}
                                                        type="tel"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.phoneNumber}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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
                                            <Grid container spacing={2} rowSpacing={4} fontSize={inputPropSIze}>
                                                <Grid item md={12} xs={12} height={115} padding={0} marginTop={6} marginBottom={6}>
                                                    <Box width="20%" height="100%" >
                                                        <FileDropzone

                                                            setFiles={onDocumentChange(setFile)}
                                                            accept='image/*,.pdf'
                                                            files={file ? [file] : []}
                                                            imagesUrls={[]}

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
                                                            // value={companyType}
                                                            value={companyType}
                                                            style={{ fontSize: dropdownFontsie }}
                                                            label={t("companyLogin.companyType.heading")}
                                                            onChange={handleCompanyType}
                                                        >
                                                            <MenuItem sx={{ fontSize: dropdownFontsie }} value={"Public limited company"}>{t("companyLogin.companyType.option1")}</MenuItem>
                                                            <MenuItem sx={{ fontSize: dropdownFontsie }} value={"Private limited company"}>{t("companyLogin.companyType.option2")}</MenuItem>
                                                            <MenuItem sx={{ fontSize: dropdownFontsie }} value={"Joint Venture company"}>{t("companyLogin.companyType.option3")}</MenuItem>
                                                            <MenuItem sx={{ fontSize: dropdownFontsie }} value={"Partenership firm"}>{t("companyLogin.companyType.option4")}</MenuItem>
                                                            <MenuItem sx={{ fontSize: dropdownFontsie }} value={"one person company"}>{t("companyLogin.companyType.option5")}</MenuItem>
                                                            <MenuItem sx={{ fontSize: dropdownFontsie }} value={"sole proprietorship"}>{t("companyLogin.companyType.option6")}</MenuItem>
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
                                                        id="companyContactNumber"
                                                        name="companyContactNumber"
                                                        label={t("companyLogin.contactPhone")}
                                                        type="companyContactNumber"
                                                        size="small"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: inputPropSIze } }}
                                                        value={formik.values.companyContactNumber}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        error={formik.touched.companyContactNumber && Boolean(formik.errors.companyContactNumber)}
                                                        helperText={formik.touched.companyContactNumber && formik.errors.companyContactNumber}
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
                                                            style={{ fontSize: dropdownFontsie }}
                                                        // options={updatedCountries}
                                                        >
                                                            {
                                                                countries?.map((item: any) =>
                                                                    <MenuItem key={item.isoCode} style={{ fontSize: dropdownFontsie }} value={item}>{item.name}</MenuItem>
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
                                                            style={{ fontSize: dropdownFontsie }}
                                                        // options={updatedCountries}
                                                        >
                                                            {
                                                                selectedState?.map((item: any) =>
                                                                    <MenuItem key={item.isoCode} style={{ fontSize: dropdownFontsie }} value={item}>{item.name}</MenuItem>
                                                                )
                                                            }

                                                        </Select>
                                                    </FormControl>


                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <FormControl fullWidth size="small">
                                                        {selectedCityCode}
                                                        <InputLabel id="demo-simple-select-label">{t("companyLogin.city")}</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={selectedCityCode}
                                                            label={t("companyLogin.city")}
                                                            onChange={handleCity}
                                                            style={{ fontSize: dropdownFontsie }}
                                                        >
                                                            {/* {selectedCity} */}

                                                            {
                                                                selectedCity?.map((item: any) =>
                                                                    <MenuItem style={{ fontSize: dropdownFontsie }} key={item.isoCode} value={item}>{item.name}</MenuItem>
                                                                )
                                                            }

                                                        </Select>

                                                    </FormControl>


                                                </Grid>
                                                <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                                                    <TextField
                                                        fullWidth
                                                        id="zipCode"
                                                        name="zipCode"
                                                        required                                   
                                                        label={t("companyLogin.zipcode")}
                                                        size="small"
                                                        // type="zipCode"
                                                        inputProps={{ style: { fontSize: fontSize } }}
                                                        InputLabelProps={{ style: { fontSize: fontSize } }}
                                                        value={formik.values.zipCode}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        type="number"
                                                        error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                                        helperText={formik.touched.zipCode && formik.errors.zipCode}
                                                    />

                                                </Grid>
                                                <Grid item xs={12} display="flex" alignItems="center" border={1}>
                                                    {/* <FormGroup> */}
                                                    <Checkbox value={formik.values.accept} onChange={handleCheckBox} sx={{scale:".7"}} />
                                                    <Typography style={{ cursor: "pointer", fontSize: inputPropSIze }}>{t("companyLogin.accept")}</Typography>
                                                    <a onClick={() => window.open("/")} color="#1EAEFF" style={{ cursor: "pointer", fontSize: inputPropSIze }}><span style={{ marginLeft: "5px", color: "#6690FF",textDecoration: "underline" }}>{t("companyLogin.terms")}</span></a>

                                                    {/* </FormGroup> */}
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}

                                </Grid>

                                <Grid item xs={12} display="flex" justifyContent="stretch" alignItems="stretch" marginTop={2}>
                                    {activeStep < 2 && (
                                        <Button
                                            variant="contained"
                                            sx={{ backgroundColor: "#D7DAE3", color: "black", font: "small-caption" }}
                                            onClick={handleBack}

                                        >
                                            {t("companyLogin.backbtn")}
                                        </Button>
                                    )}
                                    {
                                        activeStep === 0 &&
                                        <Button
                                            variant="contained"

                                            sx={{ backgroundColor: "#00ABB1", font: "small-caption" }}
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
