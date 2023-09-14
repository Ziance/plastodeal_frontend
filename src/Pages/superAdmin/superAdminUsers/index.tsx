import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation } from "react-i18next";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  Pagination,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { deleteUsersAction, editUsersStatusAction, getUsersAction } from "../../../redux/SuperAdminController/users/middleware";
import { UserInfo } from "../../../redux/auth/types";
import { userSelector } from "../../../redux/SuperAdminController/users/usersSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

const SuperAdminUsers = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState<any>("");
  const [filteredUsers, setFilteredUsers] = useState<UserInfo | any>([]);

  const btnColor = "#00ABB1";
  const fontColor = "#677674";
  const fontsize = "12px";
  const { userDetails } = useSelector(userSelector)

  const handleActive = (row: any) => {
    dispatch(editUsersStatusAction(row))
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleChangePage = (
  //   // event: React.MouseEvent<HTMLButtonElement> | null,
  //   // newPage: number
  // ) => {
  //   // console.log("new page ==>", newPage);

  //   // setPage(newPage);
  // };
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteEntry = (id: any) => {
    dispatch(deleteUsersAction(id))
    handleClose()
    toast.success("User Deleted")
  };

  // useEffect(() => {
  //   dispatch(getUsersAction({page,rowsPerPage}))
  // }, [dispatch]);

  useEffect(() => {
    console.log("getting in");
    
    dispatch(getUsersAction({ page, rowsPerPage ,filterText}))
    if (userDetails?.length > 0) {
      console.log("usewr details", userDetails);

      const filteredUser = userDetails?.filter((item) =>
        ['User', 'Admin', 'Company'].includes(item?.userRole) 
        
      );
      setFilteredUsers(filteredUser);
    }
  }, [page, rowsPerPage,filterText]);

  useEffect(() => {
   
  }, [userDetails, filterText]);

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
          <Grid item md={6} xs={12} sx={{ marginTop: "2%" }}>
            <TextField
              variant="standard"
              defaultValue={null}
              label={t("superadmin.user.filter")}
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {/* <TextField variant="standard" label={t("superadmin.user.filter")} /> */}
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
                backgroundColor: btnColor,
                textTransform: "capitalize",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/superadmin/individualregister")}
            >
              <AddIcon />
              {t("superadmin.user.addUserBtn")}
            </Button>
            <Button
              variant="contained"
              sx={{
                scale: ".85",
                textTransform: "capitalize",
                backgroundColor: btnColor,
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate("/superadmin/companyRegistration")}
            >
              <AddIcon />
              {t("superadmin.user.addOrgBtn")}
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
                      Account Name
                    </TableCell>
                    <TableCell
                      align="center"
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
                      Organization Name
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "600",
                        fontSize: fontsize,
                        color: fontColor,
                      }}
                    >
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
                      Phone
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
                  {filteredUsers?.map((row: any, index: any) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.userRole}
                      </TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">
                        {row.companyName}
                      </TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="right">
                        <Button
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
                        </Button>
                      </TableCell>
                      <TableCell align="right" >
                        <MoreVertIcon onClick={handleClick} />
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
                        key={row.id}
                      >
                        <MenuItem onClick={() => handleDeleteEntry(row?._id)} sx={{ borderRadius: "20px", backgroundColor: "whitesmoke" }}>Delete</MenuItem>
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
                count={Math.ceil(25 / rowsPerPage)}
                page={page}
                // showLastButton
                // showFirstButton
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
              <Pagination count={Math.ceil(25 / rowsPerPage)} page={page} onChange={handleChangePage} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default SuperAdminUsers;
