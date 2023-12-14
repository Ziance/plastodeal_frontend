import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import PaidIcon from '@mui/icons-material/Paid';
import * as yup from "yup";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import filedropIcon from "../../assets/images/filedropimage/filedropIcon.jpg";
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
  RadioGroup,
  Radio,
} from "@mui/material";
import { Country, State, City } from "country-state-city";
import { DropzoneArea } from "material-ui-dropzone";
import FileDropzone from "../../components/filedropzone";
import { createAccountAction } from "../../redux/auth/middleware";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../../redux/store";
import { count, log } from "console";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/authSlice";
import PayModal from "../../components/razorPay";
// import RazorPay from "../../components/"

const theme = createTheme();

export default function CompanyRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [companyType, setCompanyType] = useState<any>();
  const [currentParams, setCurrentParams] = useState<any>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<any>();
  const [selectedCountryName, setSelectedCountryName] = useState<any>();
  const [selectedStateCode, setSelectedStateCode] = useState<any>();
  const [selectedStateName, setSelectedStateName] = useState<any>();
  const [selectedCityCode, setSelectedCityCode] = useState<any>("");
  const [selectedCityName, setSelectedCityName] = useState<any>();
  const [formData, setFormData] = useState({});
  const [checked, setChecked] = useState(false);
  const [activeMethod, setActiveMethod] = useState<string>("")
  const [accountName, setAccountName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPhone, setInputPhone] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [paymentInformation, setPaymentInformation] = useState<string>("")
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState<any>();
  const [selectedCity, setSelectedCity] = useState<any>();
  const [file, setFile] = useState<File | any>(null);
  const { message,errorMessage } = useSelector(authSelector)
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const location = -useLocation();
  const params = useParams();
  const countries = Country.getAllCountries();

  const steps = [
    { heading: `${t("companyLogin.step1")}`, icon: PersonIcon },
    { heading: `${t("companyLogin.step2")}`, icon: BusinessIcon },
    { heading: `${t("companyLogin.step3")}`, icon: PaidIcon },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  useEffect(() => {
    setCurrentParams(params.superadmin);
  }, []);
  const handleBack = () => {
    if (activeStep === 0) {
      if (currentParams) {
        navigate("/superadmin/users");
      } else {
        navigate("/signUp");
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  const fontSize = "12px";
  const inputPropSIze = "12px";
  const dropdownFontsie = "12px";

  const handleChequeData = () => {
    console.log("handle data submiteed ", accountName, accountNumber);

  }

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
    confirmPassword: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    phoneNumber: yup
      .string()
      .required("Phone is required"),
    // .matches(phoneRegExp, "Not a valid Number"),
    companyName: yup.string().required("Company Name"),
    // companyType: yup.string().required("Company typ"),
    contactPerson: yup.string().required("Contact person"),
    address: yup.string().required("Contact person"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      countryCode: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companyType: "",
      contactPerson: "",
      companyContactNumber: "",
      companyContactCode: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      accept: false,
      companyLogo: "",
      userRole: "Admin",
      paymentDetails: {}
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.companyType = companyType;
      values.countryCode = selectedCountryCode;
      values.companyContactCode = selectedCountryCode
      values.country = selectedCountryName
      values.state = selectedStateCode;
      values.city = selectedCityCode;
      values.accept = checked;
      values.companyLogo = file;

      // switch (activeMethod) {
      //   case "cash":
      //     return values.paymentInfo = "cash";
      //   case "cheque":
      //     console.log("entering");

      //     return values.paymentInfo = { "account name": accountName, "account number": accountNumber }
      //   case "online":
      //     return values.paymentInfo = "cash"
      //   default:
      //     break;
      // }
      if (activeMethod === "cheque") {
        console.log("checkout");
        
        values.paymentDetails = { method: "cheque", details: { "account name": accountName, "account number": accountNumber } }
      } else {
        if (activeMethod === "online") {
          values.paymentDetails = { method: "online", orderId: paymentInformation }
        } else {
          values.paymentDetails = { method: "cash" }
          setPaymentInformation("cash")
        }
      }
      // values?.userRole = "Admin"
      console.log("values company", values);
      if (paymentInformation.length > 0) {
        const res = await dispatch(createAccountAction(values))
        console.log("res==== company>", res);
      }

      if (message === "fullfilled") {
        toast.success("Company is Registered")
      } else {
        console.log("errormessage",errorMessage);
        
        toast.error(errorMessage)
      }

      // navigate("/")
    },
  });

  const handleCompanyType = (e: any) => {
    console.log("e=====>", e.target.value);
    setCompanyType(e.target.value);
  };
  const handleCountry = (e: any) => {
    console.log("country=====>", e.target.value);
    const states = State.getStatesOfCountry(e.target.value);
    const country = Country.getCountryByCode(e.target.value)
    setSelectedCountryName(country?.name)
    setSelectedCountryCode(e.target.value);
    setSelectedState(states);
  };
  const handleState = (e: any) => {
    console.log("state=====>", e.target.value);
    const cities = City.getCitiesOfState(selectedCountryCode, e.target.value);

    setSelectedStateCode(e.target.value);
    setSelectedCity(cities);
    console.log(JSON.stringify(cities));

  };
  const handleCity = (e: any) => {
    console.log("city=====>", e.target.value);
    setSelectedCityCode(e.target.value);
  };
  const onDocumentChange =
    (func: (f: File | null) => void) => (files: File[]) => {
      func(files[0]);
    };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveMethod(event.target.value);
    console.log("payment method", event.target.value);

  };
  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader={false}>
      <Grid container justifyContent="center" alignItems="baseline" width={{ xs: "100%", md: "100%" }} position="absolute" left={{ xs: 10, md: 0 }} >
        {/* <Container component="main" maxWidth="md" sx={{border:1}}> */}
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            // scale: "1.2",
            alignSelf: "center",
            px: 4,
            py: 4,
            width: { xs: "100%", md: "80%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffff",
          }}
        >
          <CssBaseline />
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography
                  component="h1"
                  variant="h6"
                  fontSize="17px"
                  fontFamily="sans-serif"
                >
                  {t("companyLogin.heading")}
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={5}>
                <Stepper activeStep={activeStep}>
                  {steps?.map((label) => (
                    <Step
                      key={label.heading}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <StepIcon
                        icon={
                          <label.icon
                            sx={{
                              backgroundColor:
                                activeStep === 1
                                  ? "#3F51B5"
                                  : activeStep === 2
                                    ? "#3F51B5"
                                    : "grey",
                              color: "white",
                              scale: ".8",
                              borderRadius: "50%",
                            }}
                          />
                        }
                      ></StepIcon>
                      <Typography
                        sx={{ fontSize: "14px", marginTop: "10px" }}
                      >
                        {label.heading}
                      </Typography>
                    </Step>
                  ))}
                </Stepper>
              </Grid>
              <Grid item xs={12} marginTop={2}>
                {activeStep === 0 && (
                  <>
                    <Grid container spacing={2} rowSpacing={4}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          id="firstName"
                          name="firstName"
                          label={t("companyLogin.firstname")}
                          size="small"
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
                          value={formik.values.firstName}
                          onChange={(e) => {
                            formik.handleChange(e)
                            setInputName(e.target.value)
                          }}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.firstName &&
                            Boolean(formik.errors.firstName)
                          }
                          helperText={
                            formik.touched.firstName &&
                            formik.errors.firstName
                          }
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
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
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
                      <Grid item md={6} xs={12}>
                        <Grid container >
                          <Grid item xs={3} md={2} >
                            <Select
                              fullWidth
                              sx={{ height: "35px" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedCountryCode}
                              label={t("companyLogin.country")}
                              onChange={handleCountry}
                              style={{ fontSize: dropdownFontsie }}
                              renderValue={() => (
                                <>
                                  {selectedCountryCode && (
                                    <Typography
                                      variant="body2"
                                      component="span"
                                    >
                                      {
                                        countries.find(
                                          (item) =>
                                            item.phonecode ===
                                            selectedCountryCode
                                        )?.flag
                                      }
                                    </Typography>
                                  )}
                                </>
                              )}
                            >
                              {countries?.map((item) => (
                                <MenuItem
                                  key={item.isoCode}
                                  style={{ fontSize: dropdownFontsie }}
                                  value={item.phonecode}
                                >
                                  <Typography>
                                    {item.flag}
                                    {item.name}
                                    {item.phonecode}
                                  </Typography>
                                </MenuItem>
                              ))}
                            </Select>
                          </Grid>
                          <Grid item xs={9} md={10} >

                            <TextField
                              fullWidth
                              id="phoneNumber"
                              name="phoneNumber"
                              label={t("companyLogin.phone")}
                              type="tel"
                              size="small"
                              inputProps={{ style: { fontSize: fontSize } }}
                              InputLabelProps={{
                                style: { fontSize: inputPropSIze },
                              }}
                              value={formik.values.phoneNumber}
                              onChange={(e) => {
                                formik.handleChange(e)
                                setInputPhone(e.target.value)
                              }}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched.phoneNumber &&
                                Boolean(formik.errors.phoneNumber)
                              }
                              helperText={
                                formik.touched.phoneNumber &&
                                formik.errors.phoneNumber
                              }
                            />
                          </Grid>
                        </Grid>
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
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
                          value={formik.values.email}
                          onChange={(e) => {
                            formik.handleChange(e)
                            setInputEmail(e.target.value)
                          }}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.email &&
                            Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                        />
                      </Grid>
                      <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                        <TextField
                          fullWidth
                          id="password"
                          name="password"
                          label={t("companyLogin.password")}
                          size="small"
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
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
                          label={t("companyLogin.rewritepasword")}
                          size="small"
                          // type="confirmPassword"
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
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
                        >
                          {showPassword && (
                            <VisibilityIcon sx={{ scale: ".7" }} />
                          )}
                          {!showPassword && (
                            <VisibilityOffIcon sx={{ scale: ".7" }} />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <Grid
                      container
                      spacing={2}
                      rowSpacing={4}
                      fontSize={inputPropSIze}
                    >
                      <Grid
                        item
                        md={12}
                        xs={12}
                        height={115}
                        padding={0}
                        marginTop={6}
                        marginBottom={6}
                        display="flex"
                        marginLeft={{ md: 4 }}
                        justifyContent={{ xs: "center", md: "left" }}
                      >
                        <Box width={{ xs: "80%", md: "20%" }} height="100%">
                          <FileDropzone
                            setFiles={onDocumentChange(setFile)}
                            accept="image/*,.pdf"
                            files={file ? [file] : []}
                            imagesUrls={[]}
                          />
                        </Box>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          id="companyName"
                          name="companyName"
                          label={t("companyLogin.companyName")}
                          size="small"
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
                          value={formik.values.companyName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.companyName &&
                            Boolean(formik.errors.companyName)
                          }
                          helperText={
                            formik.touched.companyName &&
                            formik.errors.companyName
                          }
                        />
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {t("companyLogin.companyType.heading")}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={companyType}
                            value={companyType}
                            style={{ fontSize: dropdownFontsie }}
                            label={t("companyLogin.companyType.heading")}
                            onChange={handleCompanyType}
                          >
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"Public Limited Company"}
                            >
                              {t("companyLogin.companyType.option1")}
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"Private Limited Company"}
                            >
                              {t("companyLogin.companyType.option2")}
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"Joint-Venture Company"}
                            >
                              {t("companyLogin.companyType.option3")}
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"Partnership Firm"}
                            >
                              {t("companyLogin.companyType.option4")}
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"One Person Company"}
                            >
                              {t("companyLogin.companyType.option5")}
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"Sole Proprietorship"}
                            >
                              {t("companyLogin.companyType.option6")}
                            </MenuItem>
                            <MenuItem
                              sx={{ fontSize: dropdownFontsie }}
                              value={"Non-Government Organization (NGO)"}
                            >
                              {t("companyLogin.companyType.option7")}
                            </MenuItem>

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
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
                          value={formik.values.contactPerson}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.contactPerson &&
                            Boolean(formik.errors.contactPerson)
                          }
                          helperText={
                            formik.touched.contactPerson &&
                            formik.errors.contactPerson
                          }
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
                          InputLabelProps={{
                            style: { fontSize: inputPropSIze },
                          }}
                          value={formik.values.companyContactNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.companyContactNumber &&
                            Boolean(formik.errors.companyContactNumber)
                          }
                          helperText={
                            formik.touched.companyContactNumber &&
                            formik.errors.companyContactNumber
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl>
                          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                        </FormControl>

                      </Grid>
                      <Grid item md={12} xs={12}>
                        <label>{t("companyLogin.address")}</label>
                        <TextareaAutosize
                          // fullWidth
                          id="address"
                          name="address"
                          placeholder={t("companyLogin.address")}
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
                          onChange={(e) => {
                            formik.handleChange(e)
                            setInputAddress(e.target.value)
                          }}
                          onBlur={formik.handleBlur}
                        // error={formik.touched.address && Boolean(formik.errors.address)}
                        // helperText={formik.touched.address && formik.errors.address}
                        />
                      </Grid>
                      
                      <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {t("companyLogin.country")}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCountryCode}
                            label={t("companyLogin.country")}
                            onChange={handleCountry}
                            style={{ fontSize: dropdownFontsie }}
                          // options={updatedCountries}
                          >
                            {countries?.map((item) => (
                              <MenuItem
                                key={item.isoCode}
                                style={{ fontSize: dropdownFontsie }}
                                value={item.isoCode}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {t("companyLogin.state")}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedStateCode}
                            label={t("companyLogin.state")}
                            onChange={handleState}
                            style={{ fontSize: dropdownFontsie }}
                          // options={updatedCountries}
                          >
                            {selectedState?.map((item: any) => (
                              <MenuItem
                                key={item.isoCode}
                                style={{ fontSize: dropdownFontsie }}
                                value={item.isoCode}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                        <FormControl fullWidth size="small">
                          <InputLabel id="demo-simple-select-label">
                            {t("companyLogin.city")}
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCityCode}
                            label={t("companyLogin.city")}
                            onChange={handleCity}
                            style={{ fontSize: dropdownFontsie }}
                          >
                            {selectedCity?.map((item: any) => (
                              <MenuItem
                                style={{ fontSize: dropdownFontsie }}
                                key={item.name}
                                value={item.name}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
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
                          type="zipCode "
                          error={
                            formik.touched.zipCode &&
                            Boolean(formik.errors.zipCode)
                          }
                          helperText={
                            formik.touched.zipCode && formik.errors.zipCode
                          }
                        />
                      </Grid>
                          
                      <Grid item xs={12} display="flex" alignItems="center">
                        <Checkbox
                          value={formik.values.accept}
                          onChange={handleCheckBox}
                        />
                        {t("companyLogin.accept")}
                        <a
                          href="#"
                          onClick={() => window.open("/")}
                          color="#1EAEFF"
                          style={{
                            cursor: "pointer",
                            fontSize: inputPropSIze,
                          }}
                        >
                          <span
                            style={{ marginLeft: "5px", color: "#6690FF" }}
                          >
                            {t("companyLogin.terms")}
                          </span>
                        </a>

                      </Grid>
                    </Grid>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} p={2}>
                        <Typography variant="h4">
                          Make Payment
                        </Typography>
                      </Grid>
                      <Grid item md={8} xs={12} p={0}>
                        <FormControl>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            onChange={handlePaymentChange}
                          >
                            <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                            <FormControlLabel value="cheque" control={<Radio />} label="Cheque" />
                            <FormControlLabel value="online" control={<Radio />} label="Online" />

                          </RadioGroup>
                        </FormControl>
                      </Grid>

                      {activeMethod === "cheque" &&
                        // <form onSubmit={chequeFormik.handleSubmit}>
                        <Grid container spacing={2} bgcolor="whitesmoke" borderRadius={5} mt={2} p={1} ml={1}>
                          <Grid item xs={12}><Typography variant="h6">Cheque Details</Typography></Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="accountName"
                              name="accountName"
                              label={t("companyLogin.accountName")}
                              size="medium"
                              inputProps={{ style: { fontSize: fontSize } }}
                              InputLabelProps={{
                                style: { fontSize: inputPropSIze },
                              }}
                              value={accountName}
                              onChange={(e) => setAccountName(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              fullWidth
                              id="accountNumber"
                              name="accountNumber"
                              label={t("companyLogin.accountNumber")}
                              size="medium"
                              inputProps={{ style: { fontSize: fontSize } }}
                              InputLabelProps={{
                                style: { fontSize: inputPropSIze },
                              }}
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                            />
                          </Grid>
                          <Grid item xs={12} display="flex" justifyContent="space-between">
                            <Button variant="contained" title="Submit" onClick={handleChequeData} color="success">Submit</Button>
                            <Button variant="contained" type="reset" color="inherit">Reset</Button>
                          </Grid>
                        </Grid>
                        // </form>
                      }


                      {activeMethod === "online" &&
                        <Grid item xs={12} display="flex" justifyContent="start"  >
                          <PayModal inputName={inputName} inputAddress={inputAddress} inputEmail={inputEmail} inputPhone={inputPhone} setPaymentInfo={setPaymentInformation} />

                        </Grid>
                      }



                    </Grid>
                  </>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="space-between"
                alignItems="stretch"
                marginTop={5}
              >
                {activeStep < 3 && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#d7dae3",
                      textTransform: "capitalize",
                      color: "#485058",
                      font: "small-caption",
                      height: "50px",
                      fontWeight: "700",
                    }}
                    onClick={handleBack}
                  >
                    {t("companyLogin.backbtn")}
                  </Button>
                )}
                {(activeStep === 0 || activeStep === 1) && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#00abb1",
                      textTransform: "capitalize",
                      font: "small-caption",
                      height: "50px",
                      fontWeight: "700",
                    }}
                    onClick={handleNext}
                  // disabled={activeStep === 0}
                  >
                    {t("companyLogin.nextbtn")}
                  </Button>
                )}

                {activeStep === 2 && (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                      backgroundColor: "#00abb1",
                      textTransform: "capitalize",
                      font: "small-caption",
                      height: "50px",
                      fontWeight: "700",
                    }}
                  // disabled={activeStep === 0}
                  >
                    {t("companyLogin.submitbtn")}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
        {/* </Container> */}
      </Grid>
    </WrapperComponent>
    // </ThemeProvider>
  );
}
