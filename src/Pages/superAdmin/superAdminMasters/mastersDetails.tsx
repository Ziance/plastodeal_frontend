import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  SelectChangeEvent,
  TextareaAutosize,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { userSelector } from "../../../redux/SuperAdminController/users/usersSlice";
import "./_superAdminMaster.css";
import FileDropzone from "../../../components/filedropzone";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { mastersSelector } from "../../../redux/SuperAdminController/masters/mastersSlice";
import {
  addMasterAction,
  deleteMasterAction,
  editMasterAction,
  editStatusAction,
  getMastersData,
} from "../../../redux/SuperAdminController/masters/middleware";
import {
  addCatagoryAction,
  deleteCatagoryAction,
  editCategoryDetailsAction,
  editCategoryStatusAction,
  getAllCatagoriesAction,
} from "../../../redux/SuperAdminController/catagories/middleware";
import { catagorySelector } from "../../../redux/SuperAdminController/catagories/catagoriesSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import TextEditor from "../../../components/textEditror";
import { addStaticPagesAction, getAllStaticPagesAction, updateStaticPagesAction } from "../../../redux/SuperAdminController/staticPages/middleware";
import { staticPagesSelector } from "../../../redux/SuperAdminController/staticPages/staticPagesSlice";
import EditIcon from '@mui/icons-material/Edit';
import { all } from "axios";

const MastersDetails = () => {
  const params = useParams();
  const dynamicPath = params?.dynamicPath || "country";
  const { t } = useTranslation();
  const { masterData, allData } = useSelector(mastersSelector);
  const [activeStatus, setActiveStatus] = useState(allData?.banner && allData?.banner[0]?.image);
  const [file, setFile] = useState<File | any>(null);
  const [page, setPage] = useState(1);
  const [age, setAge] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [combinedFilter, setCombinedFilter] = useState("");
  const [textFieldValue, setTextFieldValue] = useState<any>("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [countryId, setCountryId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [activeRow, setActiveRow] = useState<any>();
  const [stateId, setStateId] = useState("");
  const [saveData, setSaveData] = useState<any>("")
  const [categoryInputs, setCategoryInputs] = useState<any>();
  const [filteredData, setFilteredData] = useState<any>(null);
  const [filteredArray, setFilteredArray] = useState<any>([]);
  // const [open, setOpen] = useState(false)
  const dataId = "nskdfskdjfnskdjf";
  const btnColor = "#00ABB1";
  const fontColor = "#677674";
  const fontsize = "12px";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();



  const { catagoriesDetails } = useSelector(catagorySelector);
  const { staticPagesDetails } = useSelector(staticPagesSelector);

  const isButtonDisabled = textFieldValue.length == 0 && file == null;
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

  useEffect(() => {
    if (dynamicPath === "category") {
      setFilteredArray(catagoriesDetails || []);
    } else if (dynamicPath === "country") {
      setFilteredArray(allData?.country);
    } else if (dynamicPath === "state") {
      setFilteredArray(allData?.state);
    } else if (dynamicPath === "city") {
      setFilteredArray(allData?.city);
    } else if (dynamicPath === "faq") {
      setFilteredArray(allData?.faq);
    } else if (dynamicPath === "company-type") {
      setFilteredArray(allData?.companyType);
    }
  }, [dynamicPath, catagoriesDetails, allData]);
  console.log("all data", allData);

  const handleAddMasterDetail = async (e: any) => {
    e.preventDefault();
    if (isEdit) {
      if (dynamicPath?.replace("-", " ").toLowerCase() === "country") {
        dispatch(
          editMasterAction({
            params,
            postData: { countryName: textFieldValue },
            _id: activeRow?._id,
          })
        );
      }
      if (dynamicPath?.toLowerCase() === "state") {
        dispatch(
          editMasterAction({
            params,
            postData: { countryId: countryId, stateName: textFieldValue },
            _id: activeRow?._id,
          })
        );
      }
      if (dynamicPath?.toLowerCase() === "city") {
        dispatch(
          editMasterAction({
            params,
            postData: {
              countryId: countryId,
              stateId: stateId,
              cityName: textFieldValue,
            },
            _id: activeRow?._id,
          })
        );
      }
      if (dynamicPath?.toLowerCase() === "faq") {
        dispatch(
          editMasterAction({
            params,
            postData: {
              question: question,
              answer: answer,
            },
            _id: activeRow?._id,
          })
        );
      }
      if (dynamicPath?.toLowerCase() === "company-type") {
        dispatch(
          editMasterAction({
            params,
            postData: { companyType: textFieldValue },
            _id: activeRow?._id,
          })
        );
      }

    } else {
      if (dynamicPath?.toLowerCase() === "country") {
        dispatch(
          addMasterAction({ params, postData: { countryName: textFieldValue } })
        ).then((response) => {
          toast.success("Category is Added")
        }).catch((error) => {
          toast.error(error)
        })
      }
      if (dynamicPath?.toLowerCase() === "state") {
        dispatch(
          addMasterAction({
            params,
            postData: { countryId: countryId, stateName: textFieldValue },
          })
        ).then((response) => {
          toast.success("State is Added")
        }).catch((error) => {
          toast.error(error)
        })
      }
      if (dynamicPath?.toLowerCase() === "city") {
        dispatch(
          addMasterAction({
            params,
            postData: {
              countryId: countryId,
              stateId: stateId,
              cityName: textFieldValue,
            },
          })
        ).then((response) => {
          toast.success("City is Added")
        }).catch((error) => {
          toast.error(error)
        })
      }
      if (dynamicPath?.toLowerCase() === "faq") {
        dispatch(
          addMasterAction({
            params,
            postData: { question: question, answer: answer },
          })
        ).then((response) => {
          toast.success("FAQ is Added")
        }).catch((error) => {
          toast.error(error)
        })
      }
      if (dynamicPath?.toLowerCase() === "company-type") {
        dispatch(
          addMasterAction({
            params,
            postData: { companyType: textFieldValue },
          })
        ).then((response) => {
          toast.success("Company type is Added")
        }).catch((error) => {
          toast.error(error)
        })
      }
      if (dynamicPath?.toLowerCase() === "banner") {
        console.log("getting in");

        if (allData?.banner.length>0) {
          console.log("in second if", allData?.banner);

          // await dispatch(editMasterAction({ params, postData: file, _id: allData?.banner && allData?.banner[0]?._id, }))
          //   .then(({ payload }) => {
          //     console
          //   })
          await dispatch(editMasterAction({ params, postData: file, _id: allData?.banner && allData?.banner[0]?._id, }))
            .then((response) => {
              toast.success("Banner is Updated")
            }).catch((error) => {
              toast.error(error)
            })
        } else {
          dispatch(
            addMasterAction({
              params,
              postData: file,
            })
          ).then((response) => {
            toast.success("Banner is Added")
          }).catch((error) => {
            toast.error(error)
          })
        }
      }
    }
    setOpenModal(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleAddClickOpen = () => {
    setOpenModal(true);
    if (activeRow) {
      setIsEdit(true)
    }
    // setIsEdit(false);
    console.log("active roe", activeRow);

  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleActive = (params: any, row: any) => {
    handleClose()
    if (dynamicPath === "category") {
      dispatch(editCategoryStatusAction(row));
    } else {
      dispatch(editStatusAction({ params, row }));
    }
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
  const onDocumentChange =
    (func: (f: File | null) => void) => (files: File[]) => {
      func(files[0]);
      setFile(files[0])
    };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const date = new Date().toDateString();
  const open = Boolean(anchorEl);

  const handleClick = (event: any, row: any) => {
    setAnchorEl(event.currentTarget);
    setActiveRow(row);
  };
  const handleClose = () => {
    setOpenModal(false);
    setAnchorEl(null);
  };

  const handleDeleteEntry = () => {
    if (dynamicPath === "category") {
      dispatch(deleteCatagoryAction(activeRow?._id)).then((response) => {
        toast.success("Category is Deleted")
      }).catch((error) => {
        toast.error(error)
      })
      handleClose();
    } else {
      dispatch(deleteMasterAction({ params, row: activeRow })).then((response) => {
        // eslint-disable-next-line no-useless-concat
        console.log("params and row", params, activeRow);

        toast.success(`${params?.dynamicPath}` + " is deleted")
      }).catch((error) => {
        toast.error(error)
      })
      handleClose();
    }
  };

  const handleEditEntry = (params: any, row: any) => {
    console.log("data===> ", row, params);

    setIsEdit(true);
    setOpenModal(true);
    if (params.dynamicPath === "country") {
      setTextFieldValue(activeRow && activeRow?.countryName);
    }
    if (params.dynamicPath === "state") {
      setCountryId(activeRow && activeRow?.countryId);
      setTextFieldValue(activeRow && activeRow?.stateName);
    }
    if (params.dynamicPath === "city") {
      setCountryId(activeRow && activeRow?.countryId);
      setStateId(activeRow && activeRow?.stateId);
      setTextFieldValue(activeRow && activeRow?.cityName);
    }
    if (params.dynamicPath === "faq") {
      setQuestion(activeRow && activeRow?.question);
      setAnswer(activeRow && activeRow?.answer);
    }
    if (params.dynamicPath === "company-type") {
      setTextFieldValue(activeRow && activeRow?.companyType);
    }
    handleClose();
  };

  useEffect(() => {
    if (
      dynamicPath === "privacy-policy" ||
      dynamicPath === "about-us" ||
      dynamicPath === "refund-policy"
    ) {
      dispatch(getAllStaticPagesAction());
    }
    if (params.dynamicPath === "category") {
      dispatch(getAllCatagoriesAction());
    } else {
      dispatch(getMastersData(dynamicPath?.toLowerCase() as any));
      if (dynamicPath === "state" || params.dynamicPath === "city") {
        dispatch(getMastersData("country"));
      }
      if (dynamicPath === "city") {
        dispatch(getMastersData("state"));
      }
      if (dynamicPath === "banner") {
        dispatch(getMastersData("banner"))
      }
    }
  }, [dispatch, dynamicPath]);

  useEffect(() => {
    console.log("data alll", allData);

    return () => {
      setFilteredData([]);
      console.log("cleaned up");
      console.log("filteredData?.length", filteredData?.length)
    };
  }, []);

  useEffect(() => {
    if (staticPagesDetails.length > 0) {
      console.log("staticPagesDetails====>", staticPagesDetails);
      const data = staticPagesDetails?.filter(
        (row: any) => row?.title.toLowerCase() === dynamicPath.replace("-", "")
      );
      setFilteredData(data);
      console.log("data filtered", data);
    }
  }, [staticPagesDetails, dynamicPath]);
  const onSave = async () => {
    console.log("data saved ", filteredData);
    const request = {
      id: filteredData?.[0]?._id || "",
      title: filteredData?.[0]?.title || (dynamicPath.replace("-", "") === "privacypolicy" ? "PrivacyPolicy" : dynamicPath.replace("-", "") === "refundpolicy" ? "RefundPolicy" : dynamicPath.replace("-", "") === "aboutus" && "AboutUs"),
      description: saveData
    }
    console.log("request", request);

    if (filteredData?.[0]?._id) {
      await dispatch(updateStaticPagesAction(request)).then((response) => {
        toast.success(`${dynamicPath.replace("-", "")}` + " is Updated")
      }).catch((error) => {
        toast.error(`${dynamicPath.replace("-", "")}` + " is not Updated ," + error)
      })
    } else {
      await dispatch(addStaticPagesAction(request)).then((response) => {
        toast.success(`${dynamicPath.replace("-", "")}` + " is added")
      }).catch((error) => {
        toast.error(`${dynamicPath.replace("-", "")}` + " is not added ," + error)
      })
    }
  }
  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    description: yup.string().required("Description is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: activeRow?.name || "",
      description: activeRow?.description || "",
      file: [],
      _id: activeRow?._id || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values?.name)
      formData.append("description", values?.description)
      // formData.append("_id",values?._id)
      formData.append("file", file)

      values.file = file;
      if (isEdit) {
        console.log("edit dispatch", values);
        const requestData = {
          request: formData,
          id: activeRow?._id
        }
        // console.log("reuest data",requestData);

        dispatch(editCategoryDetailsAction(values)).then((response) => {
          toast.success("Catagory is Updated");
        }).catch((error) => {
          toast.error(error);
        })
      } else {

        const res = await dispatch(addCatagoryAction(formData)).then((response) => {
          toast.success("Catagory is Added");
        }).catch((error) => {
          toast.error(error);
        })
        // console.log("geting in else",res);

        // if (res.meta.requestStatus === "fulfilled") {

        // }
        // else
      }
      formik.resetForm();
      setFile("");
      setOpenModal(false);
    },
  });

  // console.log("allData?.banners[1]?.image",allData?.banner[0]?.image);

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
              {dynamicPath?.replace("-", " ").toUpperCase()}
            </Typography>
          </Grid>
          {dynamicPath !== "banner" &&
            dynamicPath !== "privacy-policy" &&
            dynamicPath !== "refund-policy" &&
            dynamicPath !== "about-us" && (
              <Grid item md={6} xs={12} sx={{ marginTop: "2%" }}>
                <TextField
                  variant="standard"
                  label={t("superadmin.user.filter")}
                  value={combinedFilter}
                  onChange={(e) => setCombinedFilter(e.target.value)}
                />
              </Grid>
            )}

          <Grid
            item
            md={dynamicPath ? 12 : 6}
            xs={12}
            sx={{ display: "flex", justifyContent: "end", marginTop: "2%" }}
          >
            <Button
              variant="contained"
              sx={{
                scale: ".85",
                textTransform: "capitalize",
                fontSize: "18px",
                backgroundColor: "#A3A1A2",
                "&:hover": {
                  backgroundColor: "#07453a",
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/superadmin/masters`)}
            >
              Back
            </Button>
            {dynamicPath !== "privacy-policy" &&
              dynamicPath !== "refund-policy" &&
              dynamicPath !== "about-us" ? (
              <Button
                variant="contained"
                onClick={handleAddClickOpen}
                sx={{
                  scale: ".85",
                  textTransform: "capitalize",
                  fontSize: "18px",
                  backgroundColor: btnColor,
                  "&:hover": {
                    backgroundColor: "#07453a",
                    cursor: "pointer",
                  },
                }}
              >
                <AddIcon />
                Add {dynamicPath?.replace("-", " ")}
                {/* {allData?.banners && isEdit ? <EditIcon /> : <AddIcon />}
                {allData?.banners && isEdit ? <> Edit {dynamicPath?.replace("-", " ")} </> : <> Add {dynamicPath?.replace("-", " ")} </>} */}

              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={onSave}
                sx={{
                  scale: ".85",
                  textTransform: "capitalize",
                  fontSize: "18px",
                  backgroundColor: btnColor,
                  "&:hover": {
                    backgroundColor: "#07453a",
                    cursor: "pointer",
                  },
                }}
              >
                Save {dynamicPath?.replace("-", " ")}
              </Button>
            )}
          </Grid>

          {dynamicPath === "banner" ? (
            <>
              <Grid
                item
                xs={12}
                marginTop={2}
                display="flex"
                justifyContent="center"
              >
                <Paper
                  sx={{
                    width: { xs: "100%", md: "500px" }, height: "300px",
                    backgroundImage: allData.banners ? `url(${allData?.banner && allData?.banner[0]?.image})` : `url("../../../assets/images/filedropimage/filedropIcon.jpg")`
                  }}
                  className="fileimage"
                ></Paper>
              </Grid>
            </>
          ) : (
            <>
              {dynamicPath !== "privacy-policy" &&
                dynamicPath !== "refund-policy" &&
                dynamicPath !== "about-us" && (
                  <Grid item xs={12} marginTop={2}>
                    <TableContainer component={Paper} elevation={8}>
                      <Table
                        sx={{ minWidth: 650, fontSize: "10px" }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            {dynamicPath === "faq" ? (
                              <>
                                <TableCell
                                  align="left"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Question
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Answer
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Country Status
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Action
                                </TableCell>
                              </>
                            ) : dynamicPath === "category" ? (
                              <>
                                <TableCell
                                  align="left"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Category Name
                                </TableCell>
                                <TableCell
                                  align="left"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Category Description
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Country Status
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ fontSize: fontsize }}
                                >
                                  Action
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell
                                  align="left"
                                  sx={{
                                    fontSize: fontsize,
                                    textTransform: "capitalize",
                                    fontWeight: "600",
                                    color: fontColor,
                                  }}
                                >
                                  {dynamicPath?.replace("-", " ")} Name
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    fontSize: fontsize,
                                    textTransform: "capitalize",
                                    fontWeight: "600",
                                    color: fontColor,
                                  }}
                                >
                                  {dynamicPath?.replace("-", " ")} Status
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{
                                    fontSize: fontsize,
                                    textTransform: "capitalize",
                                    fontWeight: "600",
                                    color: fontColor,
                                  }}
                                >
                                  Action
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredArray?.map((row: any, index: any) => (
                            <TableRow
                              key={row?._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {dynamicPath === "faq" ? (
                                <>
                                  <TableCell component="th" scope="row">
                                    {row?.question}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {row?.answer}
                                  </TableCell>
                                  <TableCell  >
                                    <Button
                                      variant="contained"
                                      sx={{
                                        // marginLeft: "87%",
                                        backgroundColor: row?.status
                                          ? "#21BA45"
                                          : "#FF3434",
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "20px",
                                        textTransform: "initial",
                                        p: 1,
                                        minWidth: "35%",
                                        maxWidth: "100%",
                                        fontSize: "100%",
                                        "&:hover": {
                                          backgroundColor: activeStatus
                                            ? "#21BA45"
                                            : "#FF3434",
                                          cursor: "pointer",
                                        },
                                      }}
                                      onClick={() => handleActive(params, row)}
                                    >
                                      {row?.status ? (
                                        <DoneIcon />
                                      ) : (
                                        <CloseIcon />
                                      )}
                                      {row?.status ? "Active" : "Inactive"}
                                    </Button>
                                  </TableCell>

                                  <TableCell
                                    align="right"
                                    onClick={(e) => {
                                      handleClick(e, row);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </TableCell>
                                </>
                              ) : dynamicPath === "country" ? (
                                <>
                                  <TableCell component="th" scope="row">
                                    {row?.countryName}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        marginLeft: "87%",
                                        backgroundColor: row?.status
                                          ? "#21BA45"
                                          : "#FF3434",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        height: "20px",
                                        textTransform: "initial",
                                        p: 1,
                                        maxWidth: "30%",
                                        fontSize: "100%",
                                        "&:hover": {
                                          backgroundColor: row?.status
                                            ? "#21BA45"
                                            : "#FF3434",
                                          cursor: "pointer",
                                        },
                                      }}
                                      onClick={() => handleActive(params, row)}
                                    >
                                      {row?.status ? (
                                        <DoneIcon />
                                      ) : (
                                        <CloseIcon />
                                      )}
                                      {row?.status ? "Active" : "Inactive"}
                                    </Button>
                                  </TableCell>

                                  <TableCell
                                    align="right"
                                    onClick={(e) => {
                                      handleClick(e, row);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </TableCell>
                                </>
                              ) : dynamicPath === "state" ? (
                                <>
                                  <TableCell component="th" scope="row">
                                    {row?.stateName}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        marginLeft: "87%",
                                        backgroundColor: row?.status
                                          ? "#21BA45"
                                          : "#FF3434",
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "20px",
                                        textTransform: "initial",
                                        p: 1,
                                        maxWidth: "30%",
                                        fontSize: "100%",
                                        "&:hover": {
                                          backgroundColor: row?.status
                                            ? "#21BA45"
                                            : "#FF3434",
                                          cursor: "pointer",
                                        },
                                      }}
                                      onClick={() => handleActive(params, row)}
                                    >
                                      {row?.status ? (
                                        <DoneIcon />
                                      ) : (
                                        <CloseIcon />
                                      )}
                                      {row?.status ? "Active" : "Inactive"}
                                    </Button>
                                  </TableCell>

                                  <TableCell
                                    align="right"
                                    onClick={(e) => {
                                      handleClick(e, row);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </TableCell>
                                </>
                              ) : dynamicPath === "city" ? (
                                <>
                                  <TableCell component="th" scope="row">
                                    {row?.cityName}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        marginLeft: "87%",
                                        backgroundColor: row?.status
                                          ? "#21BA45"
                                          : "#FF3434",
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "20px",
                                        textTransform: "initial",
                                        p: 1,
                                        maxWidth: "30%",
                                        fontSize: "100%",
                                        "&:hover": {
                                          backgroundColor: row?.status
                                            ? "#21BA45"
                                            : "#FF3434",
                                          cursor: "pointer",
                                        },
                                      }}
                                      onClick={() => handleActive(params, row)}
                                    >
                                      {row?.status ? (
                                        <DoneIcon />
                                      ) : (
                                        <CloseIcon />
                                      )}
                                      {row?.status ? "Active" : "Inactive"}
                                    </Button>
                                  </TableCell>

                                  <TableCell
                                    align="right"
                                    onClick={(e) => {
                                      handleClick(e, row);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </TableCell>
                                </>
                              ) : dynamicPath === "company-type" ? (
                                <>
                                  <TableCell component="th" scope="row">
                                    {row?.companyType}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        marginLeft: "87%",
                                        backgroundColor: row?.status
                                          ? "#21BA45"
                                          : "#FF3434",
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "20px",
                                        textTransform: "initial",
                                        p: 1,
                                        maxWidth: "30%",
                                        fontSize: "100%",
                                        "&:hover": {
                                          backgroundColor: row?.status
                                            ? "#21BA45"
                                            : "#FF3434",
                                          cursor: "pointer",
                                        },
                                      }}
                                      onClick={() => handleActive(params, row)}
                                    >
                                      {row?.status ? (
                                        <DoneIcon />
                                      ) : (
                                        <CloseIcon />
                                      )}
                                      {row?.status ? "Active" : "Inactive"}
                                    </Button>
                                  </TableCell>

                                  <TableCell
                                    align="right"
                                    onClick={(e) => {
                                      handleClick(e, row);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </TableCell>
                                </>
                              ) : dynamicPath === "category" ? (
                                <>
                                  <TableCell component="th" scope="row">
                                    {row?.name}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {row?.description}
                                  </TableCell>
                                  <TableCell align="right">
                                    <Button
                                      variant="contained"
                                      sx={{
                                        marginLeft: "87%",
                                        backgroundColor: row?.status
                                          ? "#21BA45"
                                          : "#FF3434",
                                        display: "flex",
                                        justifyContent: "center",
                                        height: "20px",
                                        textTransform: "initial",
                                        p: 1,
                                        maxWidth: "30%",
                                        fontSize: "100%",
                                        "&:hover": {
                                          backgroundColor: row?.status
                                            ? "#21BA45"
                                            : "#FF3434",
                                          cursor: "pointer",
                                        },
                                      }}
                                      onClick={() => handleActive(params, row)}
                                    >
                                      {row?.status ? (
                                        <DoneIcon />
                                      ) : (
                                        <CloseIcon />
                                      )}
                                      {row?.status ? "Active" : "Inactive"}
                                    </Button>
                                  </TableCell>

                                  <TableCell
                                    align="right"
                                    onClick={(e) => {
                                      handleClick(e, row);
                                    }}
                                  >
                                    <MoreVertIcon />
                                  </TableCell>
                                </>
                              ) : null}

                              <Menu
                                key={row?._id}
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
                                  "aria-labelledby": `basic-button${row?._id}`,
                                }}
                              >
                                <MenuItem
                                  // onClick={() => handleEditEntry(params, row)}
                                  onClick={handleAddClickOpen}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  sx={{ color: "red" }}
                                  onClick={handleDeleteEntry}
                                >
                                  Delete
                                </MenuItem>
                              </Menu>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
            </>
          )}

          {dynamicPath !== "banner" && (
            <>
              {dynamicPath !== "privacy-policy" &&
                dynamicPath !== "refund-policy" &&
                dynamicPath !== "about-us" && (
                  <Grid container>
                    <Grid item md={12} pr={5} justifyContent="flex-end" marginBottom={2}>
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
                      {Math.ceil(allData?.[dynamicPath]?.length / rowsPerPage) > 0 &&
                        <Pagination count={Math.ceil(allData?.[dynamicPath]?.length / rowsPerPage)} page={page} onChange={handleChangePage} />
                      }
                    </Grid>
                  </Grid>
                )}
            </>
          )}
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={12} spacing={2}>
            <Dialog open={openModal} onClose={handleClose} fullWidth>
              <DialogTitle textAlign="center" textTransform="capitalize">
                {dynamicPath?.replace("-", " ")}
              </DialogTitle>
              <DialogContent>
                {(dynamicPath?.replace("_", " ") === "city" ||
                  dynamicPath?.replace("_", " ") === "state") && (
                    <FormControl
                      sx={{ marginBottom: 3, maxHeight: "15vh" }}
                      fullWidth
                    >
                      <InputLabel id="demo-simple-select-helper-label">
                        Country
                      </InputLabel>
                      <Select
                        MenuProps={MenuProps}
                        label="Country"
                        placeholder="Country"
                        fullWidth
                        value={countryId}
                        onChange={(e: any) => {
                          setCountryId(e.target.value);
                        }}
                      >
                        {allData?.["country"]?.map((row: any) => (
                          <MenuItem value={row?._id}>{row?.countryName}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                {dynamicPath?.replace("_", " ") === "city" && (
                  <FormControl
                    sx={{ marginBottom: 3, maxHeight: "15vh" }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      State
                    </InputLabel>
                    <Select
                      MenuProps={MenuProps}
                      label="State"
                      placeholder="State"
                      fullWidth
                      value={stateId}
                      onChange={(e: any) => {
                        setStateId(e.target.value);
                      }}
                    >
                      {allData?.["state"]
                        ?.filter((row: any) => row?.countryId === countryId)
                        .map((row: any) => (
                          <MenuItem value={row?._id}>{row?.stateName}</MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                )}
                {(dynamicPath?.replace("_", " ") === "country" ||
                  dynamicPath?.replace("_", " ") === "state" ||
                  dynamicPath?.replace("_", " ") === "city" ||
                  dynamicPath?.replace("-", "-") === "company-type") && (
                    <TextField
                      sx={{ marginBottom: 3, textTransform: "capitalize" }}
                      autoFocus
                      margin="dense"
                      label={dynamicPath?.replace("-", " ")}
                      placeholder={dynamicPath?.replace("-", " ")}
                      value={textFieldValue}
                      onChange={(e) => setTextFieldValue(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                  )}

                {dynamicPath?.replace("_", " ") === "faq" && (
                  <>
                    <TextField
                      sx={{ marginBottom: 3 }}
                      autoFocus
                      margin="dense"
                      label="Questions"
                      placeholder="Questions"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      fullWidth
                      variant="outlined"
                    />
                    <TextareaAutosize
                      id="address"
                      name="answer"
                      placeholder="Answer"
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      style={{
                        minWidth: "99%",
                        maxWidth: "99%",
                        minHeight: "10vh",
                      }}
                    />
                  </>
                )}
                {dynamicPath?.replace("_", " ") === "banner" && (
                  <div style={{ width: "80%", height: "20vh", margin: 50 }}>
                    <FileDropzone
                      setFiles={onDocumentChange(setFile)}
                      accept="image/*,.pdf"
                      files={file ? [file] : []}
                      imagesUrls={[]}
                      preFile={allData?.banner && allData?.banner[0]?.image}
                    />
                  </div>
                )}
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
                  onClick={(e) => handleAddMasterDetail(e)}
                  disabled={
                    isButtonDisabled ? answer.length === 0 : isButtonDisabled
                  }
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
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openModal && dynamicPath === "category"}
              onClose={handleClose}
              fullWidth
            >
              <DialogTitle textAlign="center" textTransform="capitalize">
                Add Catagory
              </DialogTitle>
              <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                  {/* <Grid container border={1} justifyContent="center" > */}

                  <Grid item xs={12} display="flex" justifyContent="center">
                    <div style={{ width: "60%", height: "20vh", margin: 20 }}>
                      <FileDropzone
                        setFiles={onDocumentChange(setFile)}
                        accept="image/*,.pdf"
                        files={file ? [file] : []}
                        imagesUrls={[]}
                        preFile={activeRow?.image}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ marginBottom: 3 }}
                      margin="dense"
                      name="name"
                      label="Name"
                      fullWidth
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={
                        formik.touched.name &&
                        formik.errors.name &&
                        "name is required"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      id="description"
                      name="description"
                      placeholder="Description"
                      style={{
                        minWidth: "99%",
                        maxWidth: "99%",
                        minHeight: "10vh",
                      }}
                      value={formik?.values?.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched?.description &&
                      Boolean(formik.errors?.description) && (
                        <>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "red",
                              fontSize: "12px",
                              marginLeft: "12px",
                            }}
                          >
                            {formik.errors?.description &&
                              "Description is required"}
                          </Typography>
                        </>
                      )}
                  </Grid>

                  {/* </Grid> */}
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
                    type="submit"
                  // onClick={handleAdd}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
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
              </form>
            </Dialog>
          </Grid>
        </Grid>

        {/* {filteredData && ( */}
        {(dynamicPath?.replace("_", " ") === "privacy-policy" ||
          dynamicPath?.replace("_", " ") === "refund-policy" ||
          dynamicPath?.replace("_", " ") === "about-us") &&
          (<div style={{ marginTop: "20px" }}>
            <TextEditor filteredData={filteredData} setSaveData={setSaveData} />
          </div>)
        }
        {/* )} */}
      </Grid>
    </WrapperComponent>
  );
};

export default MastersDetails;
