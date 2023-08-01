import React, { useEffect, useState } from "react";
import servicesLogos from "../../../jsonFiles/servicesData.json";
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

const ProductDetails = () => {
  const [currentRepo, setCurrentRepo] = useState<any>([]);
  const [open, setOpen] = React.useState(false);

  const params = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (params.dynamicPath) {
      const foundProduct = servicesLogos["logos-data"]?.find((repo) => {
        return repo?.text === params?.dynamicPath?.replace("-", " ");
      });
      setCurrentRepo(foundProduct);
    }
  }, []);

  const Mydata = productDetail.find(
    (item) => item.productName === params?.dynamicPath?.replace("-", " ")
  );
  console.log("MYDATA.........", Mydata);

  return (
    <WrapperComponent isHeader>
      <Grid
        item
        md={4}
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
                {currentRepo.text}
              </h2>
            </div>
          )}
        </div>
      </Grid>
      <Grid
        item
        md={8}
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            sx={{
              color: "#485058",
              fontSize: "16px",
              backgroundColor: "#d7dae3",
              borderColor: "#fff",
              paddingX: 2,
              textTransform: "capitalize",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#07453a",
                cursor: "pointer",
                color: "#d7dae3",
              },
            }}
          >
            Back
          </Button>
        </div>
      </Grid>

      <Grid item xs={12} md={12} sx={{ marginBottom: 2 }}>
        <Grid container spacing={3} mt={2}>
          {Mydata?.data.map((item, index) => (
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
                        {item.value1}
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
                        {item.value4}
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
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};
export default ProductDetails;
