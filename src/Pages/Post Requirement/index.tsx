import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import WrapperComponent from "../../components/WrapperComponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PostReqForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container pl={4} pr={4}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label={t("postReqForm.name")}
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contact number"
                label={t("postReqForm.contactNo")}
                name="contact number"
                autoComplete="contact number"
                autoFocus
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
              />
            </Grid>
            <div style={{ display: "flex" }}>
              {/* <Button
            type="button"
            variant="text"
            sx={{ mt: 4, mb: 2 ,ml:2}}
            onClick={()=>navigate("/")}
          >
           <KeyboardBackspaceIcon/> Back To Dashboard
          </Button> */}
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
          </Box>
        </Box>
      </Box>
      {/* </Container> */}
      {/* </Grid> */}
    </WrapperComponent>
  );
}
