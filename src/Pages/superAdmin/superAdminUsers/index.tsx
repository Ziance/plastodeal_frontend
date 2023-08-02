import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation } from 'react-i18next';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const SuperAdminUsers = () => {
  const { t } = useTranslation()
  const [activeStatus, setActiveStatus] = useState(false)
  const btnColor = "#00ABB1"
  const fontsize = "15px"
  const rows = [
    {
      id: "1",
      accountName: "new company",
      name: "tester",
      organisationName: "google",
      email: "Email",
      phone: "Phone",
      status: "Active"
    }
  ]
  const handleActive = () => {
    setActiveStatus((prev) => !prev)
  }
  return (
    <WrapperComponent isHeader>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#FBFBFB",
          width: { md: "141%", sm: "100%", xs: "30vh" },
          p: 3,
        }}
      >
        <Grid container>
          <Grid item xs={12} display="flex">
            <Typography fontSize="24px" fontStyle={"initial"}>
              {t("superadmin.user.heading")}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "2%" }} >
            <TextField variant="standard" label={t("superadmin.user.filter")} />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "end", marginTop: "2%" }}>
            <Button variant="contained" sx={{
              scale: ".85", backgroundColor: btnColor, "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
              },
            }}><AddIcon />{t('superadmin.user.addUserBtn')}</Button>
            <Button variant="contained" sx={{
              scale: ".85", backgroundColor: btnColor, "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
              },
            }} ><AddIcon />{t('superadmin.user.addOrgBtn')}</Button>
          </Grid>
          <Grid item xs={12} border={1} marginTop={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, fontSize: "10px" }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontSize: fontsize }}>Account Name</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Name</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Organization Name</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Email</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Phone</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Status</TableCell>
                    <TableCell align="right" sx={{ fontSize: fontsize }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.accountName}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.organisationName}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="right"><Button variant="contained" sx={{
                        marginLeft:"20%",
                        backgroundColor: activeStatus ? "#21BA45" : "#FF3434", display: "flex", justifyContent: "center", height: "20px", textTransform: "initial", p: 1, width: "50%", fontSize: "80%", "&:hover": {
                          backgroundColor:activeStatus ? "#21BA45" : "#FF3434",
                          cursor: "pointer",
                        }
                      }} onClick={handleActive}>{
                          activeStatus ? <DoneIcon  /> : <CloseIcon  />}{activeStatus ? "Active" : "Inactive"}</Button></TableCell>
                      <TableCell align="right"><MoreVertIcon /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent >

  );
}
export default SuperAdminUsers