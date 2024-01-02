import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Pagination,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Input,
  Typography,
  Skeleton
} from "@mui/material";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { logosData } from "../../../jsonFiles/servicesData";
import { postRequirementSelector } from "../../../redux/SuperAdminController/post-requirements/postRequirementsSlice";
import { deletePostAction, getAllPostRequirementsAction } from "../../../redux/SuperAdminController/post-requirements/middleware";
import { useAppDispatch } from "../../../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SuperAdminPostReq = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const [activeStatus, setActiveStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [filterText, setFilterText] = useState<any>("");
  const [activeReq,setActiveReq]= useState(null)
  const [rowsPerPage] = useState(10);
  const { getPostReq } = useSelector(postRequirementSelector)
  const fontsize = "12px";
  const fontColor = "#677674";


  const fetchAllPostReq =async ()=>{
    await dispatch(getAllPostRequirementsAction({ page, rowsPerPage,filterText }))
  }
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleActive = () => {
    setActiveStatus((prev) => !prev);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any, activeId: any) => {
    setAnchorEl(event.currentTarget)
    setActiveReq(activeId)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleClose = ()=>{
  //   setOpen(false)
  // }
  const handleDeleteEntry = () => {
    dispatch(deletePostAction(activeReq)).then(({payload}:any)=>{
      console.log("payload---",payload);
      
      if (payload.status===200) {
        toast.success("Post Requirement Deleted")
        fetchAllPostReq()
      }else{
        toast.error("Post Requirement Not Deleted")
      }
    }).catch((error)=>{
      toast.error(error)
    })
   
   
  };

  useEffect(() => {
   fetchAllPostReq()
  },[dispatch,page, rowsPerPage,filterText])
  
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
            <Typography
              fontSize="18px"
              fontStyle={"initial"}
              fontFamily="sans-serif"
            >
              {/* {t("superadmin.jobs.heading")} */}
              Post Requirement
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "2%" }}>
            <TextField variant="standard" label={t("superadmin.user.filter")}
             onChange={(e) => setFilterText(e.target.value)} />
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
                      Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      {" "}
                      Email
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      {" "}
                      Subject
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      {" "}
                      Contact Number
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
                      Message{" "}
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
                {isLoading ? <>
                  <Skeleton variant="rectangular" width={210} height={118} /></> :
                  <TableBody>
                    {getPostReq?.data?.post?.map((row: any, index: any) => (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        {/* <TableCell component="th" scope="row">
                          {row._id}
                        </TableCell> */}
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">
                          {row.subject}
                        </TableCell>
                        <TableCell align="center">{row.phoneNumber}</TableCell>
                        <TableCell align="center">{row.message}</TableCell>
                       
                        <TableCell align="right">
                          <MoreVertIcon onClick={(e) => handleClick(e, row?._id)} />
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
                          key={row._id}
                        >
                          <MenuItem onClick={handleDeleteEntry}>Delete</MenuItem>
                        </Menu>
                      </TableRow>
                    ))}
                  </TableBody>
                }
              </Table>
            </TableContainer>
          </Grid>
          <Grid container>
            <Grid item md={12} justifyContent="flex-end" marginBottom={2}>
              <Pagination count={Math.ceil(getPostReq?.data?.post?.length / rowsPerPage)} page={page} onChange={handleChangePage}  />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default SuperAdminPostReq;
