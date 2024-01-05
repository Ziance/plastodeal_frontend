import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  Pagination
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { getCatagoriesByIdAction } from "../../../redux/SuperAdminController/dashboard/middleware";
import { useAppDispatch } from "../../../redux/store";
import { getAllCatagoriesAction, viewHistoryByCategoryIdAction } from "../../../redux/SuperAdminController/catagories/middleware";
import { useSelector } from "react-redux";
import { approvalSelector } from "../../../redux/SuperAdminController/approval/approvalSlice";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { getApprovalByCategoryIdAction } from "../../../redux/SuperAdminController/approval/middleware";
import { authSelector } from "../../../redux/auth/authSlice";

const ServiceDetails = () => {
  const params = useParams();
  const loctation = useLocation();
  //   const =[]
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const [currentUserData, setCurrentUserData] = useState<any>()
  const [filterText, setFilterText] = useState("");
  const { catagoriesDetails, viewHistory } = useSelector(catagorySelector)
  const { approvalData } = useSelector(approvalSelector)
  const { currentUser } = useSelector(authSelector)
  const [activeStatus, setActiveStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [categoryId, setCategoryId] = useState<any | undefined>()
  // const [open, setOpen] = useState(false)
  const dataId = "nskdfskdjfnskdjf";
  const btnColor = "#00ABB1";
  const fontsize = "15px";
  let filteredProductData = []
 
  const handleActive = () => {
    setActiveStatus((prev) => !prev);
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
  };
  useEffect(() => {
    dispatch(getAllCatagoriesAction())
    setCurrentUserData(currentUser?.user)
  }, [dispatch])

  useEffect(() => {
    const foundCategory = catagoriesDetails?.find((repo) => {
      return repo?.name === params?.dynamicPath;
    });
    setCategoryId(foundCategory?._id)
    setCurrentRepo(foundCategory)
  }, [catagoriesDetails, params])


  useEffect(() => {

    dispatch(getApprovalByCategoryIdAction(categoryId))
  }, [categoryId])

  useEffect(() => {
    filteredProductData = approvalData?.filter((item: any) => item?.status === true)

  }, [approvalData])

  useEffect(() => {
    setTimeout(() => {
      if (categoryId) {
        const res = dispatch(viewHistoryByCategoryIdAction({page,rowsPerPage,filterText,categoryId}))
      }
    }, 500);
  }, [categoryId, catagoriesDetails,dispatch,page, rowsPerPage,filterText]);


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
          <Grid item md={6} xs={12} sx={{ marginTop: "2%" }}>
            <TextField variant="standard" label={t("superadmin.user.filter")} 
              onChange={(e) => setFilterText(e.target.value)}/>
          </Grid>
          
          <Grid item xs={12} marginTop={5}>
            <TableContainer component={Paper} elevation={6}>
              <Table
                sx={{ minWidth: 650, fontSize: "10px" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={{ fontSize: fontsize }}>
                      Name
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>
                      Email
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: fontsize }}>
                      Phone
                    </TableCell>
                    {/* <TableCell align="center" sx={{ fontSize: fontsize }}>
                      {" "}
                      Payment Status
                    </TableCell> */}
                    <TableCell align="center" sx={{ fontSize: fontsize }}>
                      Date-Time
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {viewHistory?.map((row:any) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row?.createdAt}</TableCell>
                      
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
            <Grid item md={12} justifyContent="flex-end" marginBottom={2}>
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
               <Pagination count={Math.ceil(viewHistory?.length/ rowsPerPage)} page={page} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default ServiceDetails;
