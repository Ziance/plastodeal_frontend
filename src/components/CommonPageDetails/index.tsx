import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WrapperComponent from "../WrapperComponent";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { getCatagoriesByIdAction } from "../../redux/SuperAdminController/dashboard/middleware";
import { useAppDispatch } from "../../redux/store";
import { getApprovalByCategoryIdAction } from "../../redux/SuperAdminController/approval/middleware";
import { useSelector } from "react-redux";
import { approvalSelector } from "../../redux/SuperAdminController/approval/approvalSlice";
import { advertisementSelector } from "../../redux/SuperAdminController/advertisement/advertisementSlice";
import { fetchGetAdvertisementByCatagoryIdAction } from "../../redux/SuperAdminController/advertisement/middleware";

const CommonPageDetails = () => {
  const params = useParams();
  const location = useLocation()
  //   const =[]
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeStatus, setActiveStatus] = useState(false);

  const { approvalData } = useSelector(approvalSelector)
  const { advertisementData } = useSelector(advertisementSelector)
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [open, setOpen] = useState(false)
  const dataId = "nskdfskdjfnskdjf";
  const btnColor = "#00ABB1";
  const fontColor = "#677674";
  const fontsize = "12px";
  const rows = [
    {
      id: "1",
      accountName: "new company",
      name: "tester",
      organisationName: "google",
      email: "Email",
      phone: "Phone",
      status: "Active",
    },
  ];
  const approvalRow = [
    {
      id: "1",
      Product: "new Product",
      Specification: "tester",
      countryName: "google",
      stateName: "Email",
      cityName: "Phone",
      price: "2354",
      Description: "ne sdgnlw",
      attachment: "sdkskd",
      status: "Active",
      Action: ""
    }
  ]
  const handleActive = (params: any, row: any) => {
    setActiveStatus((prev) => !prev);
    console.log("atice status", activeStatus);

  };

  useEffect(() => {
    (async () => {
      console.log("loaction", location.state?._id);
      const catagoryId = location?.state?._id
      console.log("params", params.midPath);

      if (params?.midPath === "approval") {
        console.log("approval entering");

        const res = await dispatch(getApprovalByCategoryIdAction(catagoryId))
        console.log("res approval", res);
        setTimeout(() => {

          console.log(" aproval selector", approvalData);
        }, 2000);

      } else {
        console.log("advertisement entering");
        const res = await dispatch(fetchGetAdvertisementByCatagoryIdAction(catagoryId))
        console.log("res adv", res);
        setTimeout(() => {

          console.log(" adv selector", advertisementData);
        }, 2000);


      }

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
      console.log("params", params);

    })();
  }, []);
  console.log("approvalData", approvalData);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const date = new Date().toDateString();
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const handleClose = ()=>{
  //   setOpen(false)
  // }
  const handleDeleteEntry = () => {
    console.log("handle delete");
  };
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
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", p: 5 }}
          >
            <Button
              sx={{
                backgroundColor: "#00ABB1",
                color: "#ffffff",
                fontSize: 16,
                p: 1,
                px: 3,
                fontWeight: "600",
                minWidth: "20px",
                textTransform: "capitalize",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/superadmin/advertisement`)}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} pr={5}>
            <TableContainer component={Paper} elevation={5}>
              {params.midPath === "approval" ?
                <>
                  <Table
                    sx={{ minWidth: 650, fontSize: "10px" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Product
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Specification
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Country Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          State Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          City Name
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Price
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Description
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Attachment
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Status
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {approvalRow.map((row) => ( */}
                      {approvalData?.map((row: any) => (
                        <TableRow
                          key={row.id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.Specification}</TableCell>
                          <TableCell align="center">{row.countryName}</TableCell>
                          <TableCell align="center">{row.stateName}</TableCell>
                          <TableCell align="center">{row.cityName}</TableCell>
                          <TableCell align="center">{row.price}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.attachment}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="contained"
                              sx={{
                                marginLeft: "20%",
                                backgroundColor: row.status
                                  ? "#21BA45"
                                  : "#FF3434",
                                display: "flex",
                                justifyContent: "center",
                                height: "20px",
                                textTransform: "initial",
                                p: 1,
                                width: "50%",
                                fontSize: "80%",
                                "&:hover": {
                                  backgroundColor: activeStatus
                                    ? "#21BA45"
                                    : "#FF3434",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={() => handleActive(params, row)}
                            >
                              {row.status ? <DoneIcon /> : <CloseIcon />}
                              {row.status ? "Active" : "Inactive"}
                            </Button>
                          </TableCell>
                          <TableCell align="right" onClick={handleClick}>
                            <MoreVertIcon />
                          </TableCell>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            transformOrigin={{
                              horizontal: "center",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem onClick={handleDeleteEntry}>Delete</MenuItem>
                          </Menu>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </> : <>

                  <Table
                    sx={{ minWidth: 650, fontSize: "10px" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="left"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Title
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Description
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Advertisement Module
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Advertisement Status
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Attachment
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ fontSize: fontsize, color: fontColor }}
                        >
                          Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {rows.map((row) => ( */}
                      {advertisementData?.map((row: any) => (
                        <TableRow
                          key={row.id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.title}
                          </TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="left">
                            <Button
                              variant="contained"
                              sx={{
                                marginLeft: "80%",
                                backgroundColor: activeStatus
                                  ? "#21BA45"
                                  : "#FF3434",
                                display: "flex",
                                justifyContent: "center",
                                height: "20px",
                                textTransform: "initial",
                                p: 1,
                                maxWidth: "30%",
                                fontSize: "100%",
                                "&:hover": {
                                  backgroundColor: row?.status
                                    ? "#21BA45"
                                    : "#FF3434",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={() => handleActive(params, row)}
                            >
                              {row?.status ? <DoneIcon /> : <CloseIcon />}
                              {row?.status ? "Active" : "Inactive"}
                            </Button></TableCell>
                          <TableCell align="center">{date}</TableCell>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            transformOrigin={{
                              horizontal: "center",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem onClick={handleDeleteEntry}>Delete</MenuItem>
                          </Menu>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table></>}

            </TableContainer>
          </Grid>
          <Grid container>
            <Grid item md={12} pr={5} justifyContent="flex-end">
              <TablePagination
                component="div"
                count={5}
                page={page}
                showLastButton
                showFirstButton
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default CommonPageDetails;