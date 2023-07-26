import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import WrapperComponent from "../../components/WrapperComponent";
import { useTranslation} from 'react-i18next';




export default function Login() {
  
  const navigate = useNavigate();
  const NavigateOnClickRegistraion = () => {
    navigate("/signUp");
  };
  //   const NavigateOnClick = () => {
  //     navigate("/freelogin");
  //   };
  const {t} = useTranslation()
  return (
    // <ThemeProvider theme={theme}>
    <WrapperComponent isHeader={true}>
      <Grid container   sx={{ display:"flex",justifyContent:"center" }}>
        <Box
          sx={{
            width:"30%",
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // backgroundColor:"red"
          }}
        >
          <CssBaseline />

          <img
            src={"././plastocurrentlogo.png"}
            style={{ height: "auto", width: "56%", marginLeft: "2%" }}
          />
          <Typography>{t('login.heading')}</Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
               
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
              
              </Grid> */}
              <Grid item xs={12}>
                <Typography fontWeight="bolder">{t('login.email')}</Typography>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder={t('login.email')}
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography fontWeight="bolder">{t('login.Password')}</Typography>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder={t('login.Password')}
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12} display="flex" flexDirection="column" alignItems="baseline">
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={t('login.terms')}
                />

                <Button sx={{  color: "#194039" }}>
                {t('login.forgotP')}
                </Button>
              </Grid>
            </Grid>
            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#00abb1",
                height: "56px",
                fontWeight: "700",
              }}
            // onClick={NavigateOnClickRegistraion}
            // onClick={NavigateOnClick}
            >
              {t('login.submitbtn')}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Typography textAlign="left">
                {t('login.noAccount')}{" "}
                  <Button
                    // type="submit"
                    // variant="contained"
                    //  handleClick={NavigateOnClickRegistraion}
                    sx={{ color: " #00abb1" }}
                    onClick={NavigateOnClickRegistraion}
                  >
                    {t('login.singupbtn')}
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </WrapperComponent>
    // </ThemeProvider>
  );
}
