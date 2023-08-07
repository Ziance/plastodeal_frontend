import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { logosData } from "../../../jsonFiles/servicesData";
import WrapperComponent from "../../../components/WrapperComponent";
import { useTranslation, Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import FileDropzone from "../../../components/filedropzone";
import { SelectChangeEvent } from "@mui/material/Select";

const SuperAdminAdvertisement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = useState<File | any>(null);
  const [age, setAge] = useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const onDocumentChange =
    (func: (f: File | null) => void) => (files: File[]) => {
      func(files[0]);
    };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
              {t("superadmin.advertisement.heading")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end", p: 5 }}
          >
            <Button
              onClick={handleClickOpen}
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
            >
              +Add Advertisement
            </Button>
          </Grid>

          <Grid item xs={12} md={12} sx={{ marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} mt={2}>
              {logosData.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Card
                    sx={{
                      // backgroundColor: {
                      //   xs: "red",
                      //   sm: "green",
                      //   md: "yellow",
                      //   lg: "pink",
                      //   xl: "orange",
                      // },
                      borderRadius: "16px",
                      boxShadow: "0 0 13px 0 #523f690d",
                    }}
                    onClick={() =>
                      navigate(
                        `/superadmin/advertisement/processor-table/${item.text.replace(
                          " ",
                          "-"
                        )}`
                      )
                    }
                  >
                    <CardContent sx={{ paddingBottom: "0px !important" }}>
                      <CardMedia
                        component="img"
                        image={item?.url}
                        alt="image"
                        style={{
                          width: "auto",
                          minHeight: "6vh",
                          maxHeight: "6vh",
                          margin: "0 auto",
                        }}
                      />

                      <Typography
                        mt={2}
                        sx={{
                          fontSize: 14,
                          fontWeight: "800px",
                          color: "black",
                        }}
                        align="center"
                        color="text.secondary"
                        gutterBottom
                      >
                        {item.text.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={12} spacing={2}>
            <Dialog open={open} onClose={handleClose} fullWidth>
              <DialogTitle>Advertisement</DialogTitle>
              <div
                style={{
                  display : "flex",
                  justifyContent: "center"
                }}
              >
                  <FileDropzone
                    setFiles={onDocumentChange(setFile)}
                    accept="image/*,.pdf"
                    files={file ? [file] : []}
                    imagesUrls={[]}
                  />
              </div>
              <DialogContent>
                <TextField
                  sx={{ marginBottom: 3 }}
                  autoFocus
                  margin="dense"
                  id="title"
                  label="Title"
                  placeholder="Title"
                  type="title"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  sx={{ marginBottom: 3 }}
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Description"
                  placeholder="Description"
                  type="description"
                  fullWidth
                  variant="outlined"
                />

                <FormControl
                  sx={{ marginBottom: 3, maxHeight: "15vh" }}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-helper-label">
                    Advertisement Module
                  </InputLabel>
                  <Select
                    MenuProps={MenuProps}
                    label="Advertisement Module"
                    placeholder="Advertisement Module"
                    fullWidth
                    onChange={handleChange}
                  >
                    <MenuItem value="Dashboard">Dashboard</MenuItem>
                    <MenuItem value="Employer">Employer</MenuItem>
                    <MenuItem value="Processor">Processor</MenuItem>
                    <MenuItem value="Plastic Product">Plastic Product</MenuItem>
                    <MenuItem value="Granules Supplier">
                      Granules Supplier
                    </MenuItem>
                    <MenuItem value="Electrical Vendor">
                      Electrical Vendor
                    </MenuItem>
                    <MenuItem value="Hydraulic Equipment">
                      Hydraulic Equipment
                    </MenuItem>
                    <MenuItem value="Refurbisher">Refurbisher</MenuItem>
                    <MenuItem value="Plant Setter">Plant Setter</MenuItem>
                    <MenuItem value="New Machine">New Machine</MenuItem>
                    <MenuItem value="Old Machine">Old Machine</MenuItem>
                    <MenuItem value="Patent Attorney">Patent Attorney</MenuItem>
                    <MenuItem value="Website Developer">
                      Website Developer
                    </MenuItem>
                    <MenuItem value="Transporter">Transporter</MenuItem>
                    <MenuItem value="Insurence Advisor">
                      Insurence Advisor
                    </MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>
              <DialogActions>
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
                  onClick={handleClose}
                >
                  Save
                </Button>
                <Button
                  sx={{
                    backgroundColor: "#00ABB1",
                    color: "#ffffff",
                    fontSize: 16,
                    margin: 2,
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
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </WrapperComponent>
  );
};

export default SuperAdminAdvertisement;
