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
  useMediaQuery,
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
import { RotatingLines } from "react-loader-spinner";
import { PHONE_REGEX } from "../../../utils/config";




const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const { catagoriesDetails } = useSelector(catagorySelector)
  const { approvalData, viewByLoginData } = useSelector(approvalSelector)
  const { currentUser } = useSelector(authSelector)

  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const [currentUserData, setCurrentUserData] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [displayModalOpen, setDisplayModalOpen] = useState(false)
  const [newProductOpen, setNewProductOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<any>(null);
  const [todayDate, setTodayDate] = useState<any>()
  const [userData, setUserData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProductData, setFilteredProductData] = useState<any>()
  const [verifyOtpDialogOpen, SetVerifyOtpDialogOpen] = useState(false)
  const [categoryId, setCategoryId] = useState<any | undefined>()
  const isTablet = useMediaQuery('(max-width:1000px)');


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
    if (!categoryId) return
    setTodayDate(new Date().toISOString()?.split("T")[0])
    fetchData()
  }, [categoryId])

  useEffect(() => {
    setFilteredProductData(approvalData?.filter((item: any) => item?.status === true || item?.userId === currentUserData?._id))
  }, [approvalData])

  const handleClickOpen = (item: any) => {
    setActiveRow(item)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDisplayModalOpen(false)
  };


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, item: any) => {
    console.log("handleClick item===", item);
    setAnchorEl(event.currentTarget);
    setActiveRow(item);
  };

  const handleMenuClose = () => {
    console.log("handleMenuClose");
    setAnchorEl(null);
  }

  const handleDeleteEntry = async (row: any) => {
    await dispatch(deleteApprovalAction(row))
    await handleMenuClose()
    await fetchData()
  };

  const handleEdit = () => {
    setNewProductOpen(true)
    handleMenuClose()
  }

  useEffect(() => {
    if (!displayModalOpen) return
    dispatch(viewProductWhenLoginAction(activeRow?._id))
  }, [displayModalOpen])

  const validationSchema = yup.object({
    name: yup.string().trim().required("name is required"),
    email: yup.string().trim().email().required("Email is required"),
    phone: yup
      .string()
      .matches(PHONE_REGEX, "phone is not valid")
      .required("Required")
      .min(10, "phone is not valid")
      .max(10, "phone is not valid")
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
      setIsLoading(true)

      if ((values?.name === currentUserData?.firstName) && (values?.email === currentUserData?.email) && (values?.phone === currentUserData.phoneNumber)) {
        handleClose()
        setTimeout(() => {
          setDisplayModalOpen(true)
        }, 500);
        setIsLoading(false)
      } else {
        values.productId = activeRow._id

        await dispatch(viewProductByOtpAction(values)).then(async ({ payload }: any) => {
          if (payload.status === 200) {
            await setUserData({
              user: payload?.data.data?.user,
              accessToken: payload?.data.data?.jwtToken
            })
            return setTimeout(async () => {
              handleClose()
              await setTimeout(() => {
                SetVerifyOtpDialogOpen(true)
                setIsLoading(false)
                toast.success(payload.data.message)
              }, 200);
            })
          } else {
            return setTimeout(async () => {
              setIsLoading(false)
              toast.error(payload.data.message)
            })
          }
        })
      }
    },
  });

  const menuOpen = Boolean(anchorEl);
  return (
    <WrapperComponent isHeader>
      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#FBFBFB",
          width: { md: "141%", sm: "100%", xs: "100%" },
          p: { xs: 2, md: 5 },
          pt: 6,
        }}
      >
        <Grid container >
          <Grid
            item
            xs={12}
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

          <Grid item xs={12}  sx={{ marginBottom: 2 }}>
            <Grid container spacing={3} mt={2} sx={{ justifyContent: { xs: "center", sm: "flex-start" } }} >
              {/* {Mydata?.data.map((item, index) => ( */}

              {filteredProductData?.length > 0 ? filteredProductData?.map((item: any, index: any) => (
                <Grid key={index} item xs={11} sm={6} md={4} lg={4} xl={4}>
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "0 0 13px 0 #523f690d",

                    }}
                  >
                    <CardContent sx={{
                      paddingBottom: "0px !important",
                      minHeight: "30vh",
                      maxHeight: "30vh"
                    }}>
                      {/* {item?.cratedAt?.split("T")[0] === todayDate} */}

                      {/* <Grid item xs={5}>
                            <Typography variant="body1">Super Admin will approve your product , it may take arround 24 hours</Typography>
                          </Grid>
                          :
                          <> */}
                      <Grid container  >


                      
                        <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center" 
                          sx={{ opacity: (item?.status === false && item.userId === currentUserData?._id) ? .2 : 1 }}>
                          <CardMedia
                            component="img"
                            // image={`data:image/png;base64, ${item?.image}`}
                            image={item?.image}
                            alt="image"
                            sx={{
                              width: "100%",
                              minHeight:"20vh",
                              maxHeight: "20vh",
                              objectFit:"contain"
                              // marginRight: "5px",s
                            }}
                          />
                        </Grid>
                        <Grid item xs={11} md={5}
                          sx={{ opacity: (item?.status === false && item.userId === currentUserData?._id) ? .2 : 1 }}
                        >
                          <Typography
                            align="left"
                            color="text.primary"
                            gutterBottom
                          >
                            Name:  {item?.name}
                          </Typography>
                          <Typography >
                            <div style={{ whiteSpace: "nowrap", textAlign: "left", alignSelf: "flex-start" }} dangerouslySetInnerHTML={{ __html: item.description }}>

                            </div>
                          </Typography>
                        </Grid>

                        
                        {item.userId === currentUserData?._id &&
                          <Grid item xs={1}   >
                        
                            <IconButton
                              id={`basic-button-${item._id}`}
                              onClick={(e) => {
                                console.log("test....")
                                handleClick(e, item);
                              }}
                              disabled={item?.status === false}>
                              <MoreVertIcon  />
                              <Menu
                                key={item._id}
                                id={`basic-menu-${item._id}`}
                                aria-controls={menuOpen ? `basic-menu-${item._id}` : undefined}
                                aria-haspopup="true"
                                aria-expanded={menuOpen ? 'true' : undefined}
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
                                  'aria-labelledby': `basic-button-${item._id}`,
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
                            <Grid item xs={12} >
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
                    {item.userId !== currentUserData?._id &&
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
                    }
                  </Card>
                </Grid>
              )) : <>
                <Grid item xs={12} display="flex" justifyContent="center" ><Typography variant="h4">no data</Typography></Grid></>}


              <Dialog open={open} onClose={handleClose} sx={{ minWidth: "20vw", minHeight: "15vh" }}>
                {isLoading ?
                  <DialogContent>
                    <RotatingLines
                      strokeColor="#00ABB1"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="96"
                      visible={true}
                    />
                  </DialogContent> :
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
                }

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
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.companyName")} :</span>{viewByLoginData?.productId?.userId?.firstName}{" "}{viewByLoginData?.productId?.userId?.lastName} </Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.email")} :</span> {viewByLoginData?.productId?.userId?.email}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.number")} :</span> {viewByLoginData?.productId?.userId?.phoneNumber}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.website")} :</span> {viewByLoginData?.website}</Typography>
                  <Typography><span style={{ fontWeight: "bold" }}>{t("detailpage.displayModal.description")} :</span><div dangerouslySetInnerHTML={{ __html: viewByLoginData?.productId?.description }}></div></Typography>
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
