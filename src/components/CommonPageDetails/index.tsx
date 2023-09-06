import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import WrapperComponent from "../WrapperComponent";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
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
  Skeleton,
  Dialog,
  DialogContent,
  CardMedia,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { getCatagoriesByIdAction } from "../../redux/SuperAdminController/dashboard/middleware";
import { useAppDispatch } from "../../redux/store";
import { editApprovalStatusAction, getApprovalByCategoryIdAction } from "../../redux/SuperAdminController/approval/middleware";
import { useSelector } from "react-redux";
import { approvalSelector } from "../../redux/SuperAdminController/approval/approvalSlice";
import { advertisementSelector } from "../../redux/SuperAdminController/advertisement/advertisementSlice";
import { deleteAdvertisementAction, editAdvertisementStatusAction, fetchGetAdvertisementByCatagoryIdAction } from "../../redux/SuperAdminController/advertisement/middleware";
import { setLoading } from "../../redux/SuperAdminController/advertisement/advertisementSlice";
import { LoadingState } from "../../types/AppNav";

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
  const [filteredAdvertiseData,setFilteredAdvertiseData]= useState<any>()
  const [attachment, setAttachment] = useState();
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fontColor = "#677674";
  const fontsize = "12px";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false)
  const date = new Date().toDateString();
  const open = Boolean(anchorEl);

  const handleActive = (params: any, row: any) => {
    // setActiveStatus((prev) => !prev);

    if (params === "approval") {
      dispatch(editApprovalStatusAction({ params, row }));
      fetchData()
    } else {
      dispatch(editAdvertisementStatusAction({ params, row }))
      fetchData()
    }
  };
  const fetchData = async () => {
    const catagoryId = location?.state?._id
//     console.log("params", params);
// console.log("category id",catagoryId);

    if (params?.midPath === "approval") {
      const res = await dispatch(getApprovalByCategoryIdAction(catagoryId))
    } else {
      const res = await dispatch(fetchGetAdvertisementByCatagoryIdAction(catagoryId))
    }
  }



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
  const handleDeleteEntry = async (row: any) => {
    setIsLoading(true)
    await dispatch(deleteAdvertisementAction(row))
    handleClose()
    fetchData()
    setTimeout(() => {
      setIsLoading(false)
    }, 1500);
  };
  const handleDisplayImage = (data: any) => {
    setOpenAttachment((prev) => !prev)
    // if (openAttachment) {
      setAttachment(data)
    // }
  }
  const handleAttachmentClose = () => {
    setOpenAttachment(false)
  }

  useEffect(() => {
    fetchData()
  }, []);
  useEffect(()=>{
    console.log("advertise ment data==>",advertisementData);
    
    const filteredData= advertisementData?.filter((item:any)=>item?.name === params?.dynamicPath)
    // console.log("filtered data",filteredData);
    setFilteredAdvertiseData(filteredData)
  },[])
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

          <Grid item xs={12} pr={5} p={0}>
            <TableContainer component={Paper} elevation={5} >
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
                          <TableCell align="center"><AttachFileIcon />{row.attachment}</TableCell>
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
                                  backgroundColor: row.status ? "#21BA45"
                                    : "#FF3434",
                                  cursor: "pointer",
                                },
                              }}
                              onClick={() => handleActive(params.midPath, row)}
                            >
                              {row.status ? <DoneIcon /> : <CloseIcon />}
                              {row.status ? "Active" : "Inactive"}
                            </Button>
                            {/* <Button
                          variant="contained"
                          sx={{
                            marginLeft: "20%",
                            backgroundColor: row.userStatus
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
                              backgroundColor: row.userStatus ? "#21BA45"
                                : "#FF3434",
                              cursor: "pointer",
                            },
                          }}
                          onClick={() => handleActive(row)}
                        >
                          {row.userStatus ? <DoneIcon /> : <CloseIcon />}
                          {row.userStatus ? "Active" : "Inactive"}
                        </Button> */}
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
                            <MenuItem onClick={() => handleDeleteEntry(row._id)}>Delete</MenuItem>
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
                          align="center"
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
                          <TableCell align="center"><Tooltip title="Open Attachment"><Button onClick={() => handleDisplayImage(row?.image)}><AttachFileIcon /></Button></Tooltip></TableCell>
                          <TableCell sx={{ display: "flex !important", justifyContent: "center !important" }}>
                            <Button
                              variant="contained"
                              sx={{
                                // marginLeft: "80%",
                                backgroundColor: row?.status 
                                  ? "#21BA45"
                                  : "#FF3434",
                                display: "flex",
                                justifyContent: "center",
                                height: "20px",
                                textTransform: "initial",
                                p: 1,
                                maxWidth: { xs: "80%", md: "60%", lg: "50%" },
                                minWidth: { xs: "80%", md: "60%", lg: "50%" },
                                fontSize: "100%",
                                "&:hover": {
                                  backgroundColor: row.status ? "#21BA45"
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
                          <TableCell align="center">{date}</TableCell>
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
                            <MenuItem onClick={() => handleDeleteEntry(row._id)}>Delete</MenuItem>
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
        <Dialog open={openAttachment} onClose={handleAttachmentClose}>
          <DialogContent>
            <CardMedia
              component="img"
              image={`data:image/png;base64, ${attachment}`}
              alt="no image"
              style={{
                width: "auto",
                minHeight: "55vh",
                maxHeight: "55vh",
                margin: "0 auto",
              }}
            />
            {/* <img 
            // src={`data:image/png;base64, ${attachment}}`}
            src={attachment}
              alt="no"
              style={{
                width: "auto",
                minHeight: "6vh",
                maxHeight: "6vh",
                margin: "0 auto",
              }}
            /> */}
          </DialogContent>

        </Dialog>
      </Grid>
    </WrapperComponent>
  );
};

export default CommonPageDetails;
