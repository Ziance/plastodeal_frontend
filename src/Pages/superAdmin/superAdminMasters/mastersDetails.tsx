import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WrapperComponent from "../../../components/WrapperComponent";
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
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  SelectChangeEvent,
  TextareaAutosize,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { getCatagoriesByIdAction } from "../../../redux/SuperAdminController/dashboard/middleware";
import { useAppDispatch } from "../../../redux/store";

const MastersDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [activeStatus, setActiveStatus] = useState(false);
  const [page, setPage] = useState(2);
  const [age, setAge] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [open, setOpen] = useState(false)
  const dataId = "nskdfskdjfnskdjf";
  const btnColor = "#00ABB1";
  const fontColor = "#677674";
  const fontsize = "12px";
  const navigate = useNavigate();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
  const handleActive = () => {
    setActiveStatus((prev) => !prev);
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
  const date = new Date().toDateString();
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
          <Grid item xs={12} display="flex">
            <Typography fontSize="24px" fontStyle={"initial"}>
              {params.dynamicPath?.replace("_", " ").toUpperCase()}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} sx={{ marginTop: "2%" }}>
            <TextField variant="standard" label={t("superadmin.user.filter")} />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            sx={{ display: "flex", justifyContent: "end", marginTop: "2%" }}
          >
            <Button
              variant="contained"
              sx={{
                scale: ".85",
                textTransform: "capitalize",
                fontSize: "18px",
                backgroundColor: "#A3A1A2",
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/superadmin/masters`)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleClickOpen}
              sx={{
                scale: ".85",
                textTransform: "capitalize",
                fontSize: "18px",
                backgroundColor: btnColor,
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
            >
              <AddIcon />
              Add {params.dynamicPath?.replace("_", " ")}
            </Button>
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <TableContainer component={Paper} elevation={8}>
              <Table
                sx={{ minWidth: 650, fontSize: "10px" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {params.dynamicPath === "faq" ? (
                      <>
                        <TableCell align="left" sx={{ fontSize: fontsize }}>
                          Question
                        </TableCell>
                        <TableCell align="left" sx={{ fontSize: fontsize }}>
                          Answer
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: fontsize }}>
                          Country Status
                        </TableCell>
                        <TableCell align="right" sx={{ fontSize: fontsize }}>
                          Action
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell
                          align="left"
                          sx={{
                            fontSize: fontsize,
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: fontColor,
                          }}
                        >
                          {params.dynamicPath?.replace("-", " ")} Name
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontSize: fontsize,
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: fontColor,
                          }}
                        >
                          {params.dynamicPath?.replace("-", " ")} Status
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontSize: fontsize,
                            textTransform: "capitalize",
                            fontWeight: "600",
                            color: fontColor,
                          }}
                        >
                          Action
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {params.dynamicPath === "faq" ? (
                        <>
                          <TableCell component="th" scope="row">
                            {row.accountName}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.email}
                          </TableCell>
                          <TableCell align="right">
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
                                  backgroundColor: activeStatus
                                    ? "#21BA45"
                                    : "#FF3434",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={handleActive}
                            >
                              {activeStatus ? <DoneIcon /> : <CloseIcon />}
                              {activeStatus ? "Active" : "Inactive"}
                            </Button>
                          </TableCell>

                          <TableCell align="right" onClick={handleClick}>
                            <MoreVertIcon />
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell component="th" scope="row">
                            {row.accountName}
                          </TableCell>
                          <TableCell align="right">
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
                                  backgroundColor: activeStatus
                                    ? "#21BA45"
                                    : "#FF3434",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={handleActive}
                            >
                              {activeStatus ? <DoneIcon /> : <CloseIcon />}
                              {activeStatus ? "Active" : "Inactive"}
                            </Button>
                          </TableCell>

                          <TableCell align="right" onClick={handleClick}>
                            <MoreVertIcon />
                          </TableCell>
                        </>
                      )}

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
        <Grid container spacing={2}>
          <Grid item md={12} spacing={2}>
            <Dialog open={openModal} onClose={handleClose} fullWidth>
              <DialogTitle textAlign="center" textTransform="capitalize">
                {params.dynamicPath?.replace("_", " ")}
              </DialogTitle>
              <DialogContent>
                {(params.dynamicPath?.replace("_", " ") === "city" ||
                  params.dynamicPath?.replace("_", " ") === "state") && (
                  <FormControl
                    sx={{ marginBottom: 3, maxHeight: "15vh" }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      Country
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      label="Country"
                      placeholder="Country"
                      fullWidth
                      onChange={handleChange}
                    >
                      <MenuItem value="Africa">Africa</MenuItem>
                      <MenuItem value="America">America</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="NEPAL">NEPAL</MenuItem>
                      <MenuItem value="UAE">UAE</MenuItem>
                    </Select>
                  </FormControl>
                )}
                {params.dynamicPath?.replace("_", " ") === "city" && (
                  <FormControl
                    sx={{ marginBottom: 3, maxHeight: "15vh" }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      State
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      label="State"
                      placeholder="State"
                      fullWidth
                      onChange={handleChange}
                    ></Select>
                  </FormControl>
                )}
                {(params.dynamicPath?.replace("_", " ") === "country" ||
                  params.dynamicPath?.replace("_", " ") === "state" ||
                  params.dynamicPath?.replace("_", " ") === "city" || 
                  params.dynamicPath?.replace("_", " ") === "company type") && (
                  <TextField
                    sx={{ marginBottom: 3, textTransform: "capitalize" }}
                    autoFocus
                    margin="dense"
                    label={params.dynamicPath?.replace("_", " ")}
                    placeholder={params.dynamicPath?.replace("_", " ")}
                    fullWidth
                    variant="outlined"
                  />
                )}

                {params.dynamicPath?.replace("_", " ") === "faq" && (
                  <>
                    {" "}
                    <TextField
                      sx={{ marginBottom: 3 }}
                      autoFocus
                      margin="dense"
                      label="Questions"
                      placeholder="Questions"
                      fullWidth
                      variant="outlined"
                    />
                    <TextareaAutosize
                      id="address"
                      name="address"
                      placeholder={t("freeLogin.address")}
                      style={{
                        minWidth: "99%",
                        maxWidth: "99%",
                        minHeight: "10vh",
                      }}
                    />
                  </>
                )}
              </DialogContent>
              <DialogActions>
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
                  onClick={handleCloseModal}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#00ABB1",
                    color: "#ffffff",
                    fontSize: 16,
                    margin: 2,
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
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default MastersDetails;
