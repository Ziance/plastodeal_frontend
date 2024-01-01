import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as yup from "yup";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import WrapperComponent from "../../../components/WrapperComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../redux/store";
import { toast } from "react-toastify";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { FormLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Country } from "country-state-city";
import { postAddJobsAction } from "../../../redux/SuperAdminController/jobs/middleware";

const AddJobsForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedCountryCode, setSelectedCountryCode] = useState<any>();

  const countries = Country.getAllCountries();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const fontSize = "12px";
  const validationSchema = yup.object({
    jobType: yup.string().trim().required("job Type is required"),
    jobFunctionalArea: yup.string().trim().required("job Functional Area is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    jobTitle: yup.string().trim().required("Job Title is required"),
    contactNo: yup
      .number()
      // .matches(phoneRegExp, "Not a valid Number")
      .required("contact No is required"),
    minimumEducation: yup.string().trim().required("Minimum Education is required"),
    // jobDescription: yup
    //     .string()
    //     .required('Job Description is required'),
    minAge: yup.string().trim().required("Min Age is required"),
    maxAge: yup.string().trim().required("Max Age is required"),
    minYear: yup.string().trim().required("Min Year is required"),
    maxYear: yup.string().trim().required("Max Year is required"),
    minSalary: yup.string().trim().required("Min Salary is required"),
    maxSalary: yup.string().trim().required("Max Salary is required"),
    jobLocation: yup.string().trim().required("Job Loaction is required"),
    jobExpireDate: yup.string().trim().required("Job ExpireDate is required"),
    companyName: yup.string().trim().required("Company Name is required"),
    Name: yup.string().trim().required("Contact Person is required"),
    webSite: yup.string().trim().required("webSite is required"),
  });

  const formik = useFormik({
    initialValues: {
      jobType: "",
      jobFunctionalArea: "",
      jobTitle: "",
      minimumEducation: "",
      jobDescription: "",
      minAge: "",
      maxAge: "",
      minYear: "",
      maxYear: "",
      minSalary: "",
      maxSalary: "",
      jobLocation: "",
      jobExpireDate: "",
      companyName: "",
      Name: "",
      contactNo: "",
      email: "",
      webSite: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // console.log("values", values);
      const res = await dispatch(postAddJobsAction(values))
      console.log("res", res);
      console.log("values", values);
      if (res.meta.requestStatus==="fulfilled") {
        toast.success("job is added");
      } else {
        toast.error("job is not added");
      }
     
      // navigate("/")
    },
  });
  const handleCountry = (e: any) => {
    console.log("country=====>", e.target.value);
    setSelectedCountryCode(e.target.value);
  };
  return (
    <WrapperComponent isHeader>
      <Grid item xs={12} height="100%" marginTop="5%">
        <Grid container justifyContent={"center"} pb={20}>
          <Grid item md={10} xs={12}>
            <Paper sx={{ padding: "20px" }}>
              <Typography component="h1" variant="h5" textAlign="center">
                Add Job
              </Typography>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} pb={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="jobType"
                      label="Job Type"
                      name="jobType"
                      autoComplete="jobType"
                      type="text"
                      autoFocus
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.jobType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.jobType && Boolean(formik.errors.jobType)
                      }
                      helperText={
                        formik.touched.jobType && formik.errors.jobType
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="jobFunctionalArea"
                      label="Job Functional Area"
                      name="jobFunctionalArea"
                      autoComplete="jobFunctionalArea"
                      autoFocus
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.jobFunctionalArea}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.jobFunctionalArea &&
                        Boolean(formik.errors.jobFunctionalArea)
                      }
                      helperText={
                        formik.touched.jobFunctionalArea &&
                        formik.errors.jobFunctionalArea
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="jobTitle"
                      label="Job Title"
                      name="jobTitle"
                      autoComplete="jobTitle"
                      autoFocus
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.jobTitle}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.jobTitle &&
                        Boolean(formik.errors.jobTitle)
                      }
                      helperText={
                        formik.touched.jobTitle && formik.errors.jobTitle
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="minimumEducation"
                      label="Minimum Education"
                      name="minimumEducation"
                      autoComplete="minimumEducation"
                      autoFocus
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.minimumEducation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.minimumEducation &&
                        Boolean(formik.errors.minimumEducation)
                      }
                      helperText={
                        formik.touched.minimumEducation &&
                        formik.errors.minimumEducation
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <label>job Description</label>
                    <TextareaAutosize
                      // fullWidth
                      id="jobDescription"
                      name="jobDescription"
                      placeholder=""
                      style={{
                        border: ".5px solid gray",
                        padding: 10,
                        minWidth: "98%",
                        maxWidth: "98%",
                        minHeight: "10vh",
                      }}
                      // label="Password"
                      // type="address"
                      value={formik?.values?.jobDescription}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    // error={formik.touched.address && Boolean(formik.errors.address)}
                    // helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <label>Age</label>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="minAge"
                          label="min Age"
                          name="minAge"
                          autoComplete="minAge"
                          autoFocus
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{ style: { fontSize: fontSize } }}
                          value={formik.values.minAge}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.minAge &&
                            Boolean(formik.errors.minAge)
                          }
                          helperText={
                            formik.touched.minAge && formik.errors.minAge
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="maxAge"
                          label="maxAge"
                          name="maxAge"
                          autoComplete="maxAge"
                          autoFocus
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{ style: { fontSize: fontSize } }}
                          value={formik.values.maxAge}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.maxAge &&
                            Boolean(formik.errors.maxAge)
                          }
                          helperText={
                            formik.touched.maxAge && formik.errors.maxAge
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <label>Work Experience *</label>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="minYear"
                          label="Min Year"
                          name="minYear"
                          autoComplete="minYear"
                          autoFocus
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{ style: { fontSize: fontSize } }}
                          value={formik.values.minYear}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.minYear &&
                            Boolean(formik.errors.minYear)
                          }
                          helperText={
                            formik.touched.minYear && formik.errors.minYear
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="maxYear"
                          label="Max Year"
                          name="maxYear"
                          autoComplete="maxYear"
                          autoFocus
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{ style: { fontSize: fontSize } }}
                          value={formik.values.maxYear}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.maxYear &&
                            Boolean(formik.errors.maxYear)
                          }
                          helperText={
                            formik.touched.maxYear && formik.errors.maxYear
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <label>Gross Salary*</label>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="minSalary"
                          label="min Salary"
                          name="minSalary"
                          autoComplete="minSalary"
                          autoFocus
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{ style: { fontSize: fontSize } }}
                          value={formik.values.minSalary}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.minSalary &&
                            Boolean(formik.errors.minSalary)
                          }
                          helperText={
                            formik.touched.minSalary && formik.errors.minSalary
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          margin="normal"
                          fullWidth
                          id="maxSalary"
                          label="max Salary"
                          name="maxSalary"
                          autoComplete="maxSalary"
                          autoFocus
                          inputProps={{ style: { fontSize: fontSize } }}
                          InputLabelProps={{ style: { fontSize: fontSize } }}
                          value={formik.values.maxSalary}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.maxSalary &&
                            Boolean(formik.errors.maxSalary)
                          }
                          helperText={
                            formik.touched.maxSalary && formik.errors.maxSalary
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="jobLocation"
                      label="Job Loaction"
                      name="jobLocation"
                      autoComplete="jobLocation"
                      autoFocus
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.jobLocation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.jobLocation &&
                        Boolean(formik.errors.jobLocation)
                      }
                      helperText={
                        formik.touched.jobLocation && formik.errors.jobLocation
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="jobExpireDate"
                      label="Job Expire Date"
                      type="date"
                      id="jobExpireDate"
                      placeholder="Job Expire Date"
                      defaultValue="Job Expire Date"
                      autoComplete="jobExpireDate"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.jobExpireDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.jobExpireDate &&
                        Boolean(formik.errors.jobExpireDate)
                      }
                      helperText={
                        formik.touched.jobExpireDate &&
                        formik.errors.jobExpireDate
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="companyName"
                      label="Company Name"
                      type="text"
                      id="companyName"
                      autoComplete="companyName"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.companyName &&
                        Boolean(formik.errors.companyName)
                      }
                      helperText={
                        formik.touched.companyName && formik.errors.companyName
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Name"
                      label="Contact Person"
                      type="message"
                      id="Name"
                      autoComplete="Name"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.Name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.Name &&
                        Boolean(formik.errors.Name)
                      }
                      helperText={
                        formik.touched.Name &&
                        formik.errors.Name
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6} padding={0}>
                    <Grid
                      container
                      height="90%"
                      alignItems="center"
                      spacing={0}
                    >
                      <Grid
                        item
                        md={1.2}
                        padding={0}
                        width="100%"
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Select
                          sx={{
                            height: "55px",
                            borderRight: "0px",
                            outline: "0",
                          }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={selectedCountryCode}
                          fullWidth
                          // label={t("companyLogin.country")}
                          onChange={handleCountry}
                          // style={{ fontSize: "12px" }}
                          renderValue={() => (
                            <>
                              {selectedCountryCode && (
                                <Typography variant="body2" component="span">
                                  {
                                    countries.find(
                                      (item) =>
                                        item.phonecode === selectedCountryCode
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
                              style={{ fontSize: "12px" }}
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
                      <Grid item md={10.8} padding={0}>
                        <TextField
                          fullWidth
                          id="contactNo"
                          name="contactNo"
                          label={t("companyLogin.phone")}
                          type="tel"
                          size="medium"
                          // inputProps={{ style: { fontSize: fontSize } }}
                          // InputLabelProps={{
                          //     style: { fontSize: "12px" },
                          // }}
                          sx={{ borderLeft: "0" }}
                          value={formik.values.contactNo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.contactNo &&
                            Boolean(formik.errors.contactNo)
                          }
                          helperText={
                            formik.touched.contactNo && formik.errors.contactNo
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      autoFocus
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

                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="webSite"
                      label="Web Site"
                      type="webSite"
                      id="webSite"
                      autoComplete="webSite"
                      inputProps={{ style: { fontSize: fontSize } }}
                      InputLabelProps={{ style: { fontSize: fontSize } }}
                      value={formik.values.webSite}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.webSite && Boolean(formik.errors.webSite)
                      }
                      helperText={
                        formik.touched.webSite && formik.errors.webSite
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container justifyContent="space-between">
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => navigate("/superadmin/jobs")}
                        sx={{
                          scale: ".85",
                          textTransform: "capitalize",
                          fontSize: "18px",
                          px: 4,
                          py: 2,
                          fontWeight: "600",
                          backgroundColor: "#00ABB1",
                          "&:hover": {
                            backgroundColor: "#07453a",
                            cursor: "pointer",
                          },
                        }}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          scale: ".85",
                          textTransform: "capitalize",
                          fontSize: "18px",
                          fontWeight: "600",
                          px: 4,
                          py: 2,
                          backgroundColor: "#00ABB1",
                          "&:hover": {
                            backgroundColor: "#07453a",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {t("postReqForm.submitbtn")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default AddJobsForm;
