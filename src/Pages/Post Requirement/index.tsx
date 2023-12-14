import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useFormik } from 'formik';
import * as yup from 'yup';
// import {addPostRequirementAction} fro
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import WrapperComponent from "../../components/WrapperComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addPostRequirementAction } from "../../redux/dashboard/middleware";
import { useAppDispatch } from "../../redux/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authSelector } from "../../redux/auth/authSlice";
import { useSelector } from "react-redux";
import { AuthState } from "../../redux/auth/types";

export default function PostReqForm() {
  const authState: AuthState = useSelector(authSelector)
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  const fontSize = "12px"
  const validationSchema = yup.object({
    name: yup
      .string()
      .required('name is required'),
    subject: yup
      .string()
      .required('subject is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    message: yup
      .string()
      .required('Message is required'),
    contactNo: yup
      .number()
      // .matches(phoneRegExp, "Not a valid Number")
      .required('contact No is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      contactNo: "",
      email: '',
      subject: '',
      message: "",

    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {

      // console.log("values", values);
      // if (!authState.currentUser) {
      //   toast.error("You have to login / signup first to submit this form")
      // } else {
        const res = await dispatch(addPostRequirementAction(values)).then(({payload})=>{
          // console.log("resposnse",response);
          toast.success("post requirement is Registered")
        }).catch((error)=>{
          toast.error("post requirement is not Registered")
        })
        // console.log("res",res);
        // if (res.meta.requestStatus==="fulfilled") {
         
        // } else {
          
        // }
      
      // }
     
      // navigate("/")

    },
  });
  return (
    <WrapperComponent isHeader={true}>
      {/* <Grid container border={1}  sx={{Width:"200vh", display:"flex",justifyContent:"center" }}> */}
      {/* <Container component="main" maxWidth="sm" sx={{border:1,minWidth:"180vh"}}> */}
      <Box width="100%" display="flex" justifyContent="center">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            // px: 4,
            py: 6,
            marginTop: {
              md: 8,
              sm: 2,
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: {
              md: "60%",
              sm: "20%",
            },
            backgroundColor: "white",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("postReqForm.heading")}
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {/* <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{
                mt: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            > */}
              <Grid container pl={4} pr={4} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label={t("postReqForm.name")}
                  name="name"
                  autoComplete="name"
                  autoFocus
                  inputProps={{ style: { fontSize: fontSize } }}
                  InputLabelProps={{ style: { fontSize: fontSize } }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="contact number"
                  label={t("postReqForm.contactNo")}
                  name="contactNo"
                  autoComplete="contact number"
                  autoFocus
                  inputProps={{ style: { fontSize: fontSize } }}
                  InputLabelProps={{ style: { fontSize: fontSize } }}
                  value={formik.values.contactNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.contactNo && Boolean(formik.errors.contactNo)}
                  helperText={formik.touched.contactNo && formik.errors.contactNo}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={t("postReqForm.email")}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  inputProps={{ style: { fontSize: fontSize } }}
                  InputLabelProps={{ style: { fontSize: fontSize } }}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="subject"
                  label={t("postReqForm.subject")}
                  type="subject"
                  id="subject"
                  autoComplete="subject"
                  inputProps={{ style: { fontSize: fontSize } }}
                  InputLabelProps={{ style: { fontSize: fontSize } }}
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.subject && Boolean(formik.errors.subject)}
                  helperText={formik.touched.subject && formik.errors.subject}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="message"
                  label={t("postReqForm.message")}
                  type="message"
                  id="message"
                  autoComplete="message"
                  inputProps={{ style: { fontSize: fontSize } }}
                  InputLabelProps={{ style: { fontSize: fontSize } }}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.message && Boolean(formik.errors.message)}
                  helperText={formik.touched.message && formik.errors.message}
                />

              </Grid>

              {/* </Grid> */}
              <div style={{ display: "flex",justifyContent:"center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 4,
                    backgroundColor: "#00ABB1 !important",
                    p: 2,
                  }}
                >
                  {t("postReqForm.submitbtn")}
                </Button>
              </div>
            {/* </Box> */}
          </form>

        </Box>

      </Box>
      <ToastContainer/> 
      {/* </Container> */}
      {/* </Grid> */}
    </WrapperComponent>
  );
}
