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
import { userSelector } from "../../../redux/SuperAdminController/users/usersSlice";
import "./_superAdminMaster.css";
import FileDropzone from "../../../components/filedropzone";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { mastersSelector } from "../../../redux/SuperAdminController/masters/mastersSlice";
import {
  addMasterAction,
  deleteMasterAction,
  editStatusAction,
  getMastersData,
} from "../../../redux/SuperAdminController/masters/middleware";

const MastersDetails = () => {
  const params = useParams();
  const { t } = useTranslation();
  const [activeStatus, setActiveStatus] = useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [page, setPage] = useState(2);
  const [age, setAge] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [combinedFilter, setCombinedFilter] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("");

  // const [open, setOpen] = useState(false)
  const dataId = "nskdfskdjfnskdjf";
  const btnColor = "#00ABB1";
  const fontColor = "#677674";
  const fontsize = "12px";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { masterData } = useSelector(mastersSelector);
  console.log("MASTERDATA", masterData);

  const [filteredData, setFilteredData] = useState<any>(masterData);

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

  const handleAddCountry = (e: any) => {
    e.preventDefault();
    dispatch(addMasterAction({ params, textFieldValue }));
    setOpenModal(false);
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

  const handleActive = (params: any, row: any) => {
    dispatch(editStatusAction({ params, row }));
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
  const onDocumentChange =
    (func: (f: File | null) => void) => (files: File[]) => {
      func(files[0]);
    };
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

  const handleDeleteEntry = (params: any, row: any) => {
    dispatch(deleteMasterAction({ params, row }));
    handleClose()
  };

  const handleEditEntry = () => {
    console.log("handle edit");
    setOpenModal(true);
  };
  useEffect(() => {
    const filtered = masterData.filter(
      (row) =>
        (row?.countryName &&
          row?.countryName
            .toLowerCase()
            .includes(combinedFilter.toLowerCase())) ||
        (row?.stateName &&
          row?.stateName
            .toLowerCase()
            .includes(combinedFilter.toLowerCase())) ||
        (row?.cityName &&
          row?.cityName.toLowerCase().includes(combinedFilter.toLowerCase())) ||
        (row?.question &&
          row?.question.toLowerCase().includes(combinedFilter.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [masterData, combinedFilter]);

  useEffect(() => {
    dispatch(getMastersData(params?.dynamicPath?.replace("-", "-") as any));
  }, [dispatch, params?.dynamicPath]);

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
              {params.dynamicPath?.replace("-", " ").toUpperCase()}
            </Typography>
          </Grid>
          {params.dynamicPath !== "banner" && (
            <Grid item md={6} xs={12} sx={{ marginTop: "2%" }}>
              <TextField
                variant="standard"
                label={t("superadmin.user.filter")}
                value={combinedFilter}
                onChange={(e) => setCombinedFilter(e.target.value)}
              />
            </Grid>
          )}

          <Grid
            item
            md={params.dynamicPath ? 12 : 6}
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
              Add {params.dynamicPath?.replace("-", " ")}
            </Button>
          </Grid>

          {params.dynamicPath === "banner" ? (
            <>
              <Grid
                item
                xs={12}
                marginTop={2}
                display="flex"
                justifyContent="center"
              >
                <Paper
                  sx={{ width: { xs: "100%", md: "500px" }, height: "300px" }}
                  className="fileimage"
                ></Paper>
              </Grid>
            </>
          ) : (
            <>
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
                            <TableCell
                              align="right"
                              sx={{ fontSize: fontsize }}
                            >
                              Country Status
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{ fontSize: fontsize }}
                            >
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
                      {filteredData?.map((row: any) => (
                        <TableRow
                          key={row?._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {params.dynamicPath === "faq" ? (
                            <>
                              <TableCell component="th" scope="row">
                                {row?.question}
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {row?.answer}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginLeft: "87%",
                                    backgroundColor: row.status
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
                                  onClick={() => handleActive(params, row)}
                                >
                                  {row.status ? <DoneIcon /> : <CloseIcon />}
                                  {row.status ? "Active" : "Inactive"}
                                </Button>
                              </TableCell>

                              <TableCell align="right" onClick={handleClick}>
                                <MoreVertIcon />
                              </TableCell>
                            </>
                          ) : params.dynamicPath === "country" ? (
                            <>
                              <TableCell component="th" scope="row">
                                {row?.countryName}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginLeft: "87%",
                                    backgroundColor: row?.status
                                      ? "#21BA45"
                                      : "#FF3434",
                                    display: "flex",
                                    justifyContent: "flex-start",
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
                                </Button>
                              </TableCell>

                              <TableCell align="right" onClick={handleClick}>
                                <MoreVertIcon />
                              </TableCell>
                            </>
                          ) : params.dynamicPath === "state" ? (
                            <>
                              <TableCell component="th" scope="row">
                                {row?.stateName}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginLeft: "87%",
                                    backgroundColor: row?.status
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
                                </Button>
                              </TableCell>

                              <TableCell align="right" onClick={handleClick}>
                                <MoreVertIcon />
                              </TableCell>
                            </>
                          ) : params.dynamicPath === "city" ? (
                            <>
                              <TableCell component="th" scope="row">
                                {row?.cityName}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginLeft: "87%",
                                    backgroundColor: row?.status
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
                                </Button>
                              </TableCell>

                              <TableCell align="right" onClick={handleClick}>
                                <MoreVertIcon />
                              </TableCell>
                            </>
                          ) : params.dynamicPath === "company-type" ? (
                            <>
                              <TableCell component="th" scope="row">
                                {row?.companyType}
                              </TableCell>
                              <TableCell align="right">
                                <Button
                                  variant="contained"
                                  sx={{
                                    marginLeft: "87%",
                                    backgroundColor: row?.status
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
                                </Button>
                              </TableCell>

                              <TableCell align="right" onClick={handleClick}>
                                <MoreVertIcon />
                              </TableCell>
                            </>
                          ) : null}

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
                            <MenuItem onClick={handleEditEntry}>Edit</MenuItem>
                            <MenuItem
                              sx={{ color: "red" }}
                              onClick={() => handleDeleteEntry(params, row)}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </>
          )}

          {params.dynamicPath !== "banner" && (
            <>
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
            </>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={12} spacing={2}>
            <Dialog open={openModal} onClose={handleClose} fullWidth>
              <DialogTitle textAlign="center" textTransform="capitalize">
                {params.dynamicPath?.replace("-", " ")}
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
                  params.dynamicPath?.replace("-", "-") === "company-type") && (
                  <TextField
                    sx={{ marginBottom: 3, textTransform: "capitalize" }}
                    autoFocus
                    margin="dense"
                    label={params.dynamicPath?.replace("-", " ")}
                    placeholder={params.dynamicPath?.replace("-", " ")}
                    value={textFieldValue}
                    onChange={(e) => setTextFieldValue(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                )}

                {params.dynamicPath?.replace("_", " ") === "faq" && (
                  <>
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
                      name="answer"
                      placeholder="Answer"
                      style={{
                        minWidth: "99%",
                        maxWidth: "99%",
                        minHeight: "10vh",
                      }}
                    />
                  </>
                )}
                {params.dynamicPath?.replace("_", " ") === "banner" && (
                  <div style={{ width: "80%", height: "20vh", margin: 50 }}>
                    <FileDropzone
                      setFiles={onDocumentChange(setFile)}
                      accept="image/*,.pdf"
                      files={file ? [file] : []}
                      imagesUrls={[]}
                    />
                  </div>
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
                  onClick={(e) => handleAddCountry(e)}
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
