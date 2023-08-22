import React, { useEffect, useState } from "react";
import { logosData } from "../../../jsonFiles/servicesData";
import { productDetail } from "../../../jsonFiles/productData";
import { useParams } from "react-router-dom";
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
import { getApprovalByCategoryIdAction } from "../../../redux/SuperAdminController/approval/middleware";

const ProductDetails = () => {
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [newProductOpen, setNewProductOpen] = useState(false);
  const params = useParams();
  const dispatch = useAppDispatch()
  const { catagoriesDetails } = useSelector(catagorySelector)
  const { approvalData } = useSelector(approvalSelector)
  const [categoryId, setCategoryId] = useState<any | undefined>()



  useEffect(() => {
    dispatch(getAllCatagoriesAction())
  }, [dispatch])
  useEffect(() => {
    const foundCategory = catagoriesDetails?.find((repo) => {
              return repo?.name === params?.dynamicPath;
            });
            setCategoryId(foundCategory?._id)
            setCurrentRepo(foundCategory)
    }, [catagoriesDetails,params])
    useEffect(()=>{

      dispatch(getApprovalByCategoryIdAction(categoryId))
    },[categoryId])
    useEffect(()=>{
      console.log("approvalData",approvalData);
      
    },[approvalData])

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
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

    const Mydata = productDetail.find(
      (item) => item.productName === params?.dynamicPath?.replace("-", " ")
    );
    console.log("MYDATA.........", Mydata);

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
                      {currentRepo?.name?.replace("_"," ").replace("-"," ")}
                      {/* {currentRepo.text} */}
                    </h2>
                  </div>
                )}
              </div>
            </Grid>
            <Grid
              item
              md={12}
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
                >
                  Back
                </Button>
                <Button
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
                  Add {currentRepo?.name?.replace("_"," ").replace("-"," ")}
                </Button>
              </div>
            </Grid>

            <Grid item xs={12} md={12} sx={{ marginBottom: 2 }}>
              <Grid container spacing={3} mt={2}>
                {/* {Mydata?.data.map((item, index) => ( */}
                {approvalData?.map((item:any, index:any) => (
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
                          <Grid item xs={6}>
                            <CardMedia
                              component="img"
                              image={item?.url}
                              alt="image"
                              sx={{
                                width: "auto",
                                maxHeight: "15vh",
                                marginRight: "5px",
                              }}
                            />
                          </Grid>
                          <Grid item xs={6}>
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
                        </Grid>
                        <Grid container>
                          <Grid item xl={12}>
                            <div>
                              <Button
                                fullWidth
                                onClick={handleClickOpen}
                                sx={{
                                  color: "#485058",
                                  fontSize: "16px",
                                  backgroundColor: "#d7dae3",
                                  borderColor: "#fff",
                                  marginTop: 10,
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
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Dialog open={open} onClose={handleClose}>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Name"
                      placeholder="Name"
                      type="name"
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="Email"
                      label="Email"
                      placeholder="Email"
                      type="email"
                      fullWidth
                      variant="outlined"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="phone"
                      label="Phone"
                      placeholder="Phone"
                      type="phone"
                      fullWidth
                      variant="outlined"
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
                      onClick={handleClose}
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
                </Dialog>
                {newProductOpen && <NewProductDialog setNewProductOpen={setNewProductOpen} newProductOpen={newProductOpen} currentRepo={currentRepo} />}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </WrapperComponent>
    );
  };
  export default ProductDetails;
