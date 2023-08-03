import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WrapperComponent from "../../../components/WrapperComponent";
import { Button, Grid, Menu, MenuItem, Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { getCatagoriesByIdAction } from "../../../redux/SuperAdminController/dashboard/middleware";
import { useAppDispatch } from "../../../redux/store";


const ServiceDetails = () => {
  const params = useParams();
  //   const =[]
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [activeStatus, setActiveStatus] = useState(false)
  // const [open, setOpen] = useState(false)
  const dataId= "nskdfskdjfnskdjf"
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

  useEffect(() => {
    (async () => {
      // const res = await dispatch(getCatagoriesByIdAction(dataId))
      // console.log("res",res);
      
      // switch (params.dynamicPath) {
      //   case "new-machines":
      //     return console.log("new");
      //   case "old-machines":
      //     return console.log("old");
      //   case "mould-makers":
      //     return console.log("mould");
      //   case "old-moulds":
      //     return console.log("old-mould");
      //   case "granules-supplier":
      //     return console.log("granules");
      //   case "machine-job%20work":
      //     return console.log("machine job");
      //   case "plastic-products":
      //     return console.log("plastic product");
      //   case "electrical-equipment":
      //     return console.log("elec equip");
      //   case "mechanical-equipments":
      //     return console.log("mech equip");
      //   case "hydraulic-equipment":
      //     return console.log("hydraulic eqip");
      //   case "refurbisher":
      //     return console.log("referbish");
      //   case "freelancers":
      //     return console.log("freelance");
      //   case "patent-attorney":
      //     return console.log("patent att");
      //   case "website-developer":
      //     return console.log("website-developer");
      //   case "transpoter":
      //     return console.log("transpoter");
      //   case "insurance-advisor":
      //     return console.log("insurance-advisor");
      //   case "dashboard":
      //     return console.log("dashboard");
      //   default:
      //     break;
      // }
    })();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const date = new Date().toDateString()
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleClose = ()=>{
  //   setOpen(false)
  // }
  const handleDeleteEntry = () => {
    console.log("handle delete");

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
              {params.dynamicPath?.replace("-", " ")}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} sx={{ marginTop: "2%" }} >
            <TextField variant="standard" label={t("superadmin.user.filter")} />
          </Grid>
          {/* <Grid item md={6} xs={12} sx={{ display: "flex", justifyContent: "end", marginTop: "2%" }}>
            <Button variant="contained" sx={{
              scale: ".85", backgroundColor: btnColor, "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
              },
            }}><AddIcon />{t('superadmin.user.addUserBtn')}</Button>
            <Button variant="contained" sx={{
              scale: ".85", backgroundColor: btnColor, fontSize: "12px", "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
              },
            }} ><AddIcon />{t('superadmin.user.addOrgBtn')}</Button>
          </Grid> */}
          <Grid item xs={12} marginTop={2}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, fontSize: "10px" }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontSize: fontsize }}>Name</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Email</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Phone</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}> Payment Status</TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>Date-Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.accountName}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phone}</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center" >{date}</TableCell>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={handleDeleteEntry}>Delete</MenuItem>
                      </Menu>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default ServiceDetails;
