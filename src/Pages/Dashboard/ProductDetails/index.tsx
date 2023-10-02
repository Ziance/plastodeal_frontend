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
import CardActions from '@mui/material/CardActions';
import NewProductDialog from "../NewProductDialog";
import { getAllCatagoriesAction } from "../../../redux/SuperAdminController/catagories/middleware";
import { useSelector } from "react-redux";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { useAppDispatch } from "../../../redux/store";
import { approvalSelector } from "../../../redux/SuperAdminController/approval/approvalSlice";
import { deleteApprovalAction, getApprovalByCategoryIdAction, viewProductByOtpAction, viewProductWhenLoginAction } from "../../../redux/SuperAdminController/approval/middleware";
import { authSelector } from "../../../redux/auth/authSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import OtpVerificationDialog from "../otpVerificationDialog";




const ProductDetails = () => {
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const [currentUserData, setCurrentUserData] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [displayModalOpen, setDisplayModalOpen] = useState(false)
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<any>();
  const [todayDate, setTodayDate] = useState<any>()
  const [userData, setUserData] = useState<any>()
  const [filteredProductData, setFilteredProductData] = useState<any>()
  const [verifyOtpDialogOpen, SetVerifyOtpDialogOpen] = useState(false)
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const { catagoriesDetails } = useSelector(catagorySelector)
  const { approvalData, viewByLoginData } = useSelector(approvalSelector)
  const { currentUser } = useSelector(authSelector)
  const [categoryId, setCategoryId] = useState<any | undefined>()
  const menuOpen = Boolean(anchorEl);
  // let filteredProductData = []


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

  const fetchData = () => {
    const page = 1
    const rowsPerPage = 10
    dispatch(getApprovalByCategoryIdAction({ categoryId, page, rowsPerPage }))
  }

  useEffect(() => {
    console.log("catagory id 1 ", categoryId);
    if (!categoryId) return
    console.log("catagory id 2", categoryId);
    setTodayDate(new Date().toISOString()?.split("T")[0])
    console.log("todays date ", todayDate);

    fetchData()
  }, [categoryId])

  useEffect(() => {
    console.log("approvalData", approvalData);
    setFilteredProductData(approvalData?.filter((item: any) => item?.status === true || item?.userId === currentUserData?._id))
    // filteredProductData = 
    console.log("filter data", filteredProductData);

  }, [approvalData])

  const handleClickOpen = (item: any) => {
    setActiveRow(item)
    setOpen(true);
    console.log("active row", activeRow);

  };
  console.log("viewByLoginData", viewByLoginData);

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
    await dispatch(deleteApprovalAction(row))
    console.log("click delete", row);

    handleMenuClose()
    fetchData()
  };
  const handleEdit = () => {
    setNewProductOpen(true)
    handleMenuClose()
  }
  const Mydata = productDetail.find(
    (item) => item.productName === params?.dynamicPath?.replace("-", " ")
  );
  useEffect(() => {
    if (!displayModalOpen) return
    dispatch(viewProductWhenLoginAction(activeRow?._id))
  }, [displayModalOpen])

  console.log("activeRow", activeRow);
  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    email: yup.string().email().required("Email is required"),
    phone: yup.string().required("Phone Number is Required")
  });
  const formik = useFormik({
    initialValues: {
      name: currentUserData?.firstName || "",
      email: currentUserData?.email || "",
      phone: currentUserData?.phoneNumber || "",
      productId: ""
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // values.file = file
      console.log("values", values);
      if ((values?.name === currentUserData?.firstName) && (values?.email === currentUserData?.email) && (values?.phone === currentUserData.phoneNumber)) {
        handleClose()
        setTimeout(() => {
          setDisplayModalOpen(true)
        }, 500);
      } else {
        values.productId = activeRow._id
        dispatch(viewProductByOtpAction(values)).then((result: any) => {
          const uData = result?.payload?.data || null
          console.log("step 1 uData", uData)
          setUserData(uData)
          setTimeout(() => {
            if (uData) {
              handleClose()
              setTimeout(() => {
                SetVerifyOtpDialogOpen(true)


                toast.success("otp sent to email id")
              }, 200);

            } else {
              toast.error("something went wrong")
            }
          }, 3500);

        })
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
              {currentUserData?.userRole === "Admin" && <Button
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

              {filteredProductData?.length > 0 ? filteredProductData?.map((item: any, index: any) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <Card
                    sx={{
                      borderRadius: "10px",
                      padding: 1,
                      boxShadow: "0 0 13px 0 #523f690d",

                    }}
                  >
                    <CardContent sx={{
                      paddingBottom: "0px !important", minHeight: "25vh",
                      maxHeight: "25vh"
                    }}>
                      {/* {item?.cratedAt?.split("T")[0] === todayDate} */}

                      {/* <Grid item xs={5}>
                            <Typography variant="body1">Super Admin will approve your product , it may take arround 24 hours</Typography>
                          </Grid>
                          :
                          <> */}
                      <Grid container >



                        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center" p={4}
                          sx={{ opacity: (item?.status === false && item.userId === currentUserData?._id) ? .2 : 1 }}>
                          <CardMedia
                            component="img"
                            // image={`data:image/png;base64, ${item?.image}`}
                            image={item?.image}
                            alt="image"
                            sx={{
                              width: "100%",
                              maxHeight: { xs: "10vh", sm: "15vh", md: "18vh" },
                              marginRight: "5px",
                            }}
                          />
                        </Grid>
                        <Grid item xs={5}
                          sx={{ opacity: (item?.status === false && item.userId === currentUserData?._id) ? .2 : 1 }}
                        >
                          <Typography
                            align="left"
                            color="text.primary"
                            gutterBottom
                          >
                            Name:  {item?.name}
                          </Typography>
                          <Typography>
                            <div style={{ width: "30vh", textAlign: "left", alignSelf: "flex-start" }} dangerouslySetInnerHTML={{ __html: item.description }}>

                            </div>
                          </Typography>
                        </Grid>

                        {/* {item.createdAt} */}
                        {/* {JSON.stringify(item?.createdAt?.split("T")[0] === todayDate)} */}
                        {item.userId === currentUserData?._id &&
                          <Grid item xs={1} >
                            <IconButton onClick={(e) => {
                              handleClick(e, item);
                            }}
                              disabled={item?.status === false}>
                              <MoreVertIcon />
                              <Menu
                                key={item._id}
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
                                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                <MenuItem key={item._id} onClick={() => handleDeleteEntry(activeRow._id)}>Delete</MenuItem>
                              </Menu>
                            </IconButton>
                          </Grid>
                        }
                        {item?.status === false && item?.createdAt?.split("T")[0] === todayDate && item.userId === currentUserData?._id ?
                          <>
                            <Grid item xs={12}>
                              <Typography variant="body1" color="red">Super Admin will approve your product, it may take arround 24 hours</Typography>
                            </Grid>
                          </> : <>
                            {item?.status === false && item.userId === currentUserData?._id &&
                              <Grid item xs={12}>
                                <Typography variant="body1" color="red">Your product is blocked ,contact admin</Typography>
                              </Grid>

                            }
                          </>}
                        {item.userId !== currentUserData?._id &&
                          <Grid item xs={12} >
                            <div>

                            </div>
                          </Grid>
                        }
                      </Grid>

                      {/* <Grid container border={1}> */}

                      {/* </Grid> */}
                    </CardContent>
                    <CardActions>
                      <Button
                        fullWidth
                        onClick={() => handleClickOpen(item)}
                        sx={{
                          color: "#485058",
                          fontSize: "16px",
                          backgroundColor: "#d7dae3",
                          borderColor: "#fff",

                          textTransform: "capitalize",
                          transition: "background-color 0.3s",
                          "&:hover": {
                            backgroundColor: "#07453a",
                            cursor: "pointer",
                            color: "#d7dae3",
                          },
                        }}
                      >
                        view
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )) : <>
                <Grid item xs={12} display="flex" justifyContent="center" ><Typography variant="h4">no data</Typography></Grid></>}
              <Dialog open={open} onClose={handleClose}>
                <form onSubmit={formik.handleSubmit}>
                  <DialogContent>
                    <TextField

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
                      helperText={formik?.touched?.name && formik?.errors?.name && "Name is Required"}
                    />
                    <TextField

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
                      helperText={formik.touched.email && formik.errors.email && "Email is Required"}
                    />
                    <TextField

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
                      helperText={formik.touched.phone && formik.errors.phone && "Phone is Required"}
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
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.companyName")} :</span>{viewByLoginData?.name} </Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.email")} :</span> {viewByLoginData?.email}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.number")} :</span> {viewByLoginData?.phoneNumber}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.website")} :</span> {viewByLoginData?.website}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.description")} :</span>  {viewByLoginData?.description}</Typography>
                </DialogContent>
              </Dialog>
              {(verifyOtpDialogOpen && userData) &&
                <OtpVerificationDialog
                  SetVerifyOtpDialogOpen={SetVerifyOtpDialogOpen}
                  verifyOtpDialogOpen={verifyOtpDialogOpen}
                  userData={userData}
                  activeProduct={activeRow}
                />}
              {newProductOpen && <NewProductDialog setNewProductOpen={setNewProductOpen} newProductOpen={newProductOpen} currentRepo={currentRepo} activeProduct={activeRow} />}
            </Grid>
          </Grid>
        </Grid >
      </Grid >
    </WrapperComponent >
  );
};
export default ProductDetails;
