import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useFormik } from 'formik';
import * as yup from 'yup';
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import { addPostRequirementAction } from "../../redux/dashboard/middleware";
import { useAppDispatch } from "../../redux/store";
import { toast } from 'react-toastify';

export default function PostReqForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

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
    phoneNumber: yup
      .string()
      .required('contact No is required')
      .matches(phoneRegex, "Not a valid Number")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: '',
      phoneNumber: "",
      subject: '',
      message: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(addPostRequirementAction(values)).then(({ payload }: any) => {
        if (payload.status === 200) {
          return setTimeout(async () => {
            toast.success(payload.data.message)
            resetForm();
          })
        } else {
          return setTimeout(async () => {
            toast.error(payload.data.message)
          })
        }
      })
    },
  });

  return (
    <WrapperComponent isHeader>
      <Box width="100%" display="flex" justifyContent="center">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            // py: 1,
            m: 5,
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
            <Grid container pl={4} pr={4} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={t("postReqForm.name")}
                name="name"
                autoComplete="name"
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
                type="tel"
                id="contact number"
                label={t("postReqForm.contactNo")}
                name="phoneNumber"
                autoComplete="contact number"
                inputProps={{ style: { fontSize: fontSize } }}
                InputLabelProps={{ style: { fontSize: fontSize } }}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
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

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: "#00ABB1 !important"
                }}
              >
                {t("postReqForm.submitbtn")}
              </Button>
            </div>
          </form>
        </Box>
      </Box>
    </WrapperComponent>
  );
}
