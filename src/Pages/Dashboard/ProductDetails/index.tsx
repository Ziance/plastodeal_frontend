import React, { useEffect, useState, useTransition } from "react";
import { logosData } from "../../../jsonFiles/servicesData";
import { productDetail } from "../../../jsonFiles/productData";
import { useNavigate, useParams } from "react-router-dom";
import WrapperComponent from "../../../components/WrapperComponent";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import NewProductDialog from "../NewProductDialog";
import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";
import { useSelector } from "react-redux";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { useAppDispatch } from "../../../redux/store";
import { fetchGetApprovalByCatagoryIdAsync } from "../../../redux/SuperAdminController/approval/services";
import { approvalSelector } from "../../../redux/SuperAdminController/approval/approvalSlice";
import { deleteApprovalAction, getApprovalByCategoryIdAction } from "../../../redux/SuperAdminController/approval/middleware";
import { authSelector } from "../../../redux/auth/authSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from "react-i18next";




const ProductDetails = () => {
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const [currentUserData, setCurrentUserData] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [displayModalOpen, setDisplayModalOpen] = useState(false)
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<any>();
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { catagoriesDetails } = useSelector(catagorySelector)
  const { approvalData } = useSelector(approvalSelector)
  const { currentUser } = useSelector(authSelector)
  const [categoryId, setCategoryId] = useState<any | undefined>()
  const menuOpen = Boolean(anchorEl);
  let filteredProductData = []


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
    console.log("catagory id", categoryId);

    dispatch(getApprovalByCategoryIdAction(categoryId))
  }, [categoryId])
  useEffect(() => {
    console.log("approvalData", approvalData);
    filteredProductData = approvalData?.filter((item: any) => item.status === true)
    console.log("filter data", filteredProductData);

  }, [approvalData])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisplayModalOpen(false)
  };

  // useEffect(() => {
  //   if (params.dynamicPath) {
  //     // const foundProduct = logosData?.find((repo) => {
  //     //   return repo?.text === params?.dynamicPath?.replace("-", " ");
  //     const foundProduct = catagoriesDetails?.find((repo) => {
  //       console.log("repo",repo);

  //       return repo?.name === params?.dynamicPath;
  //     });
  //     setCurrentRepo(foundProduct);
  //     console.log("current repo",currentRepo);

  //   }
  // }, []);
  const handleClick = (event: any, item: any) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(item);
  };
  const handleMenuClose = () => {
    console.log("getting in");
    setAnchorEl(null);
  }
  const handleDeleteEntry = async (row: any) => {
    // setIsLoading(true)
    await dispatch(deleteApprovalAction(row?._id))
    console.log("click delete", row);

    handleMenuClose()
    // fetchData()
    setTimeout(() => {
      // setIsLoading(false)
    }, 1500);
  };
  const Mydata = productDetail.find(
    (item) => item.productName === params?.dynamicPath?.replace("-", " ")
  );

  console.log("activeRow", activeRow);

  const formik = useFormik({
    initialValues: {
      name: currentUserData?.firstName || "",
      email: currentUserData?.email || "",
      phone: currentUserData?.phoneNumber || ""
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      // values.file = file
      console.log("values", values);
      if ((values?.name === currentUserData?.firstName) && (values?.email === currentUserData?.email) && (values?.phone === currentUserData.phoneNumber)) {
        handleClose()
        setTimeout(() => {
          setDisplayModalOpen(true)
        }, 500);
      } else {
        alert("false")
      }
    },
  });
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
        <Grid container >
          <Grid
            item
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              {currentRepo && (
                <div>
                  <h2
                    style={{
                      textTransform: "capitalize",
                      font: "400 24px/32px Roboto,Helvetica Neue,sans-serif",
                      margin: "0px 0px 16px",
                      color: "#3d4465",
                    }}
                  >
                    {currentRepo?.name?.replace("_", " ").replace("-", " ")}
                    {/* {currentRepo.text} */}
                  </h2>
                </div>
              )}
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                sx={{
                  backgroundColor: "#9F9F9F",
                  color: "#ffffff",
                  fontSize: { xs: 12, md: 16 },
                  p: 1,
                  px: 3,
                  fontWeight: "600",
                  minWidth: "20px",
                  textTransform: "capitalize",
                  transition: "background-color 0.3s",
                  marginRight: "15px",
                  "&:hover": {
                    backgroundColor: "#07453a",
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate("/")}
              >
                Back
              </Button>
              {currentUser && <Button
                sx={{
                  backgroundColor: "#00ABB1",
                  color: "#ffffff",
                  fontSize: { xs: 12, md: 16 },
                  p: 1,
                  px: { xs: 1, md: 3 },
                  fontWeight: "600",
                  minWidth: "20px",
                  textTransform: "capitalize",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#07453a",
                    cursor: "pointer",
                  },
                }}
                onClick={() => setNewProductOpen(prev => !prev)}
              >
                {/* Add {currentRepo.text} */}
                Add {currentRepo?.name?.replace("_", " ").replace("-", " ")}
              </Button>}

            </div>
          </Grid>

          <Grid item xs={12} md={12} sx={{ marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {/* {Mydata?.data.map((item, index) => ( */}

              {approvalData?.length > 0 ? approvalData?.map((item: any, index: any) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <Card
                    sx={{
                      borderRadius: "10px",
                      padding: 1,
                      boxShadow: "0 0 13px 0 #523f690d",
                    }}
                  >
                    <CardContent sx={{ paddingBottom: "0px !important" }}>
                      <Grid container>
                        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center" p={4}>
                          <CardMedia
                            component="img"
                            // image={`data:image/png;base64, ${item?.image}`}
                            image={item?.image}
                            alt="image"
                            sx={{
                              width: "auto",
                              maxHeight: { xs: "10vh", sm: "15vh", md: "18vh" },
                              marginRight: "5px",
                            }}
                          />
                        </Grid>

                        <Grid item xs={5} >
                          <Typography
                            align="left"
                            color="text.primary"
                            gutterBottom
                          >
                            {item?.name}
                          </Typography>
                          <Typography
                            align="left"
                            color="text.primary"
                            gutterBottom
                          >
                            {item.value2}
                          </Typography>
                          <Typography
                            align="left"
                            color="text.primary"
                            gutterBottom
                          >
                            {item.value3}
                          </Typography>
                          <Typography
                            align="left"
                            color="text.primary"
                            gutterBottom
                          >
                            {item?.value4}
                          </Typography>
                        </Grid>
                        {item.userId === currentUserData?._id &&
                          <Grid item xs={1} >
                            <IconButton onClick={(e) => {
                              handleClick(e, item);
                            }}>
                              <MoreVertIcon />
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
                                open={menuOpen}
                                onClose={handleMenuClose}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                              >
                                <MenuItem onClick={() => setNewProductOpen(true)}>Edit</MenuItem>
                                <MenuItem onClick={() => handleDeleteEntry(item._id)}>Delete</MenuItem>
                              </Menu>
                            </IconButton>
                          </Grid>
                        }
                        {item.userId !== currentUserData?._id &&
                          <Grid item xs={12} >
                            <div>
                              <Button
                                fullWidth
                                onClick={handleClickOpen}
                                sx={{
                                  color: "#485058",
                                  fontSize: "16px",
                                  backgroundColor: "#d7dae3",
                                  borderColor: "#fff",
                                  marginTop: 2,
                                  marginBottom: 2,
                                  textTransform: "capitalize",
                                  transition: "background-color 0.3s",
                                  "&:hover": {
                                    backgroundColor: "#07453a",
                                    cursor: "pointer",
                                    color: "#d7dae3",
                                  },
                                }}
                              >
                                View
                              </Button>
                            </div>
                          </Grid>
                        }
                      </Grid>
                      {/* <Grid container border={1}> */}

                      {/* </Grid> */}
                    </CardContent>
                  </Card>
                </Grid>
              )) : <><Grid item xs={12} display="flex" justifyContent="center" ><Typography variant="h4">no data</Typography></Grid></>}
              <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      // placeholder="Name"
                      type="name"
                      fullWidth
                      variant="outlined"
                      name="name"
                      defaultValue={currentUserData?.firstName}
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik?.touched?.name && formik?.errors?.name && ""}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      name="email"
                      id="email"
                      label="Email"
                      // placeholder="Email"
                      type="email"
                      fullWidth
                      variant="outlined"
                      // defaultValue={currentUserData.email}
                      value={formik.values?.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email && ""}
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      label="Phone"
                      // placeholder="Phone"
                      type="phone"
                      fullWidth
                      variant="outlined"
                      name="phone"
                      defaultValue={currentUserData?.phoneNumber}
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone && ""}
                    />
                  </DialogContent>
                  <DialogActions sx={{ padding: "20px" }}>
                    <Button
                      sx={{
                        backgroundColor: "#00abb1",
                        color: "#ffff",
                        marginBottom: 2,
                        padding: 1,
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#07453a",
                          cursor: "pointer",
                          color: "#d7dae3",
                        },
                      }}
                      // onClick={handleClose}
                      type="submit"
                    >
                      View
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "#00abb1",
                        color: "#ffff",
                        marginBottom: 2,
                        padding: 1,
                        width: "100px",
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "#07453a",
                          cursor: "pointer",
                        },
                      }}
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>

              <Dialog open={displayModalOpen} onClose={handleClose} sx={{
                "& .MuiDialog-paper": {
                  minWidth: 500
                }
              }}>
                <DialogTitle>
                  <Typography variant="h5">{t("detailpage.displayModal.heading")}</Typography>
                </DialogTitle>
                <DialogContent>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.companyName")} :</span>{currentUserData?.companyName} </Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.email")} :</span> {currentUserData?.email}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.number")} :</span> {currentUserData?.phoneNumber}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.website")} :</span> {currentUserData?.website}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.description")} :</span>  {currentUserData?.description}</Typography>
                </DialogContent>
              </Dialog>
              {newProductOpen && <NewProductDialog setNewProductOpen={setNewProductOpen} newProductOpen={newProductOpen} currentRepo={currentRepo} activeProduct={activeRow} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default ProductDetails;
