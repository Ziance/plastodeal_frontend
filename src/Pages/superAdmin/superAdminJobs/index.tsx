import React, { useState ,useEffect} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Input,
  Menu,
  MenuItem,
  TablePagination,
  Pagination,
  Typography,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SimpleSlider from "../../../components/slider";
import img_data from "../../../jsonFiles/imageData.json";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { deleteJobByIdAction, getJobsAction, updateJobStatusByIdAction } from "../../../redux/SuperAdminController/jobs/middleware";
import { useSelector } from "react-redux";
import { jobsSelector } from "../../../redux/SuperAdminController/jobs/jobsSlice";
import { toast } from "react-toastify";

const SuperAdminJobs = () => {
  const { t } = useTranslation();
  const [activeStatus, setActiveStatus] = useState(false);
  const { jobsDetails } = useSelector(jobsSelector)
  const [page, setPage] = useState(1);
  const [filterText, setFilterText] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activeRow, setActiveRow] = useState<any>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const btnColor = "#00ABB1";
  const fontColor = "#677674";
  const fontsize = "12px";
 
  const fetchData = () => {
    dispatch(getJobsAction({page,rowsPerPage,filterText}))
  }
  const handleActive = async(row:any) => {
    setActiveStatus((prev) => !prev)
    console.log("active",activeRow);
    dispatch(updateJobStatusByIdAction(row))
    fetchData()
  }

useEffect(()=>{
  fetchData()
},[dispatch,filterText,page,rowsPerPage])
  const open = Boolean(anchorEl);
  const handleClick = (e: any, row: any) => {
    setAnchorEl(e.currentTarget);
    setActiveRow(row)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  // const handleClose = ()=>{
  //   setOpen(false)
  // }
  const handleDeleteEntry = async(row: any) => {
    const res =await dispatch(deleteJobByIdAction(activeRow?._id))
    console.log("res", res);
    fetchData()
     if (res.payload===true) {
      toast.success("Job is deleted")
    } else {
      toast.error("Job is not deleted")
    }
    handleClose()
  };
  console.log("JOBS DETAIls",jobsDetails);
  
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
              {t("superadmin.jobs.heading")}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "2%" }}>
            <TextField variant="standard" label={t("superadmin.jobs.filter")}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)} />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "end", marginTop: "2%" }}
          >
            <Button
              variant="contained"
              sx={{
                scale: ".85",
                textTransform: "capitalize",
                fontSize: "18px",
                fontWeight: "600",
                backgroundColor: btnColor,
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/superadmin/jobs/addjob")}
            >
              <AddIcon />
              {t("superadmin.jobs.addJobBtn")}
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
                    <TableCell
                      align="left"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Job Type
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Job Category
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Job Title
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Job Location
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Company Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Expiry Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {rows.map((row) => ( */}
                  {jobsDetails?.map((row) => (
                    <TableRow
                      key={row?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.jobType}
                      </TableCell>
                      <TableCell align="center">{row.jobDescription}</TableCell>
                      <TableCell align="center">
                        {row.jobTitle}
                      </TableCell>
                      <TableCell align="center">{row.jobLocation}</TableCell>
                      <TableCell align="center">{row.companyName}</TableCell>
                      <TableCell align="center">{row.expiryDate}</TableCell>
                      <TableCell align="center" >
                      <Button
                                  variant="contained"
                                  sx={{
                                    marginLeft: "37%",
                                    backgroundColor: row?.status
                                      ? "#21BA45"
                                      : "#FF3434",
                                    display: "flex",
                                    justifyContent: "center",
                                    height: "20px",
                                    textTransform: "initial",
                                    p: 1,
                                    maxWidth: "80%",
                                    fontSize: "100%",
                                    "&:hover": {
                                      backgroundColor: row?.status
                                        ? "#21BA45"
                                        : "#FF3434",
                                      cursor: "pointer",
                                    },
                                  }}
                                  onClick={() => handleActive(row)}
                                >
                                  {row?.status ? <DoneIcon /> : <CloseIcon />}
                                  {row?.status ? "Active" : "Inactive"}
                                </Button>
                      </TableCell>
                      <TableCell align="right" onClick={(e) => handleClick(e, row)}>
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
                        <MenuItem onClick={() => handleDeleteEntry((row?._id))}>Delete</MenuItem>
                      </Menu>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid container>
            <Grid item md={12} pr={5} justifyContent="flex-end" marginBottom={2}>
              {/* <TablePagination
                component="div"
                count={5}
                page={page}
                showLastButton
                showFirstButton
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
               <Pagination count={Math.ceil(jobsDetails?.length  / rowsPerPage)} page={page} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default SuperAdminJobs;
