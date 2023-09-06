import React, { useState } from 'react'
import WrapperComponent from '../WrapperComponent'
import { Box, Grid, Typography, Button, Paper, Stack, ListItem } from '@mui/material'
import { useTranslation } from 'react-i18next';
import imageBack from "../../assets/images/filedropimage/filedropIcon.jpg"
import { Avatar, Dialog, DialogTitle, FormControl, InputLabel, Select, DialogContent, DialogActions, TextareaAutosize, TextField, Menu, MenuItem } from "@mui/material";
import FileDropzone from "../filedropzone";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/authSlice';
import { useAppDispatch } from '../../redux/store';
import { updateAccountAction } from '../../redux/auth/middleware';
import { toast } from 'react-toastify';


const Profile = () => {
    const { currentUser } = useSelector(authSelector)
    const [file, setFile] = useState<File | any>(null);
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false)
    const { t } = useTranslation();
    const dispatch = useAppDispatch()
    const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
        setFile(files[0])
        func(files[0]);
    };
    // console.log("current user", currentUser);
    const currentUserRole = currentUser?.user?.userRole
    console.log("current role", currentUserRole);

    const currentUserData = currentUser?.user
    const companyValidationSchema = yup.object({
        name: yup
            .string()
            .required('Contact Person Namne  is required'),
        companyProduct: yup
            .string()
            .required('Company Product is required'),
        companyAbout: yup
            .string()
            .required('Company about is required'),
        gstIn: yup
            .string()
            .required('Company about is required'),
        PAN: yup
            .string()
            .required('Company about is required'),
        website: yup
            .string()
            .required('Company about is required'),
        googlepayNo: yup
            .string()
            .required('Company about is required'),
        address: yup
            .string()
            .required('Company about is required'),

        zipCode: yup
            .string()
            .required('Zip Code about is required')
    });
    const userValidationSchema = yup.object({
        firstName: yup
            .string()
            .required('First Namne  is required'),
        lastName: yup
            .string()
            .required('Last Name is required'),
        email: yup
            .string()
            .required('Email  is required'),
        phoneNumber: yup
            .string()
            .required('Phone Number is required'),
        city: yup
            .string()
            .required('City is required'),
        State: yup
            .string()
            .required('State is required'),
        country: yup
            .string()
            .required('Country is required'),
        address: yup
            .string()
            .required('Company about is required'),

        zipCode: yup
            .string()
            .required('Zip Code about is required')
    });
    const CompanyInitialValues = {
        name: currentUserData?.companyName || "",
        companyProduct: currentUserData?.companyName || "",
        companyAbout: "",
        gstIn: "",
        PAN: "",
        website: "",
        googlepayNo: currentUserData?.phoneNumber || "",
        address: currentUserData?.address || "",
        country: currentUserData?.country || "",
        state: currentUserData?.state || "",
        city: currentUserData?.city || "",
        zipCode: currentUserData?.zipCode || "",
        userRole: "Company",
        file: []
    }
    const UserInititalValues = {
        firstName: currentUserData?.firstName || "",
        lastName: currentUserData?.lastName || "",
        address: currentUserData?.address || "",
        country: currentUserData?.country || "",
        state: currentUserData?.state || "",
        city: currentUserData?.city || "",
        zipCode: currentUserData?.zipCode || "",
        email: currentUserData?.email || "",
        phoneNumber: currentUserData?.phoneNumber || "",
        userRole: "User"
    }
    const CompanyFormik = useFormik({
        initialValues: CompanyInitialValues,
        enableReinitialize: true,
        validationSchema: companyValidationSchema,
        onSubmit: async (values) => {
            values.file = file
            console.log("values", values);
            const userId = currentUser?.user?._id
            const request = {
                values: values,
                userId: userId
            }
            const res = await dispatch(updateAccountAction(request))
            if (res.meta.requestStatus === "fulfilled") {
                toast.success("Company Updated Successfully")
            } else {
                toast.error("Company Not Updated")
            }
        },
    });
    const UserFormik = useFormik({
        initialValues: UserInititalValues,
        enableReinitialize: true,
        // validationSchema: userValidationSchema,
        onSubmit: async (values) => {
            console.log("values", values);
            const userId = currentUser?.user?._id
            const request = {
                values: values,
                userId: userId
            }
            const res = await dispatch(updateAccountAction(request))
            if (res.meta.requestStatus === "fulfilled") {
                toast.success("User Updated Successfully")
            } else {
                toast.error("User Not Updated")
            }
        },
    });
    const handleClose = () => {
        setEditDialogOpen(false)
    }
    const handleEditDialog = () => {
        setEditDialogOpen(true)
    }
    // console.log("current user", currentUser?.user);

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
                        xs={12}
                        sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                    >
                        <Button
                            variant='contained'
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
                            }}>
                            {t("profile.backbtn")}
                        </Button>
                        <Button
                            onClick={handleEditDialog}
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
                        >
                            {currentUserRole === "Admin" || "Company" ? t("profile.editCompanyBtn") : t("profile.editUserBtn")}
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="baseline" p={{ xs: 0, md: 2 }}>
                        <Box width="100%" height="75vh">
                            {/* <Paper elevation={0} > */}
                            {currentUserRole === "User" ?
                                <>
                                    <Grid container borderRadius={6} bgcolor="white" justifyContent="center">
                                        <Grid item xs={12} margin={1} marginLeft={4}>
                                            <Typography variant='h5'>Personal Information</Typography>
                                        </Grid>
                                        <Grid item xs={12} p={4} height="42vh">
                                            <Stack spacing={2}>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.firstName")}</Typography> <Typography  >{currentUserData?.firstName}</Typography></ListItem>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.lastName")}</Typography> <Typography  >{currentUserData?.lastName}</Typography></ListItem>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.email")}</Typography> <Typography  >{currentUserData?.email}</Typography></ListItem>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.phone")}</Typography> <Typography  >{currentUserData?.phoneNumber}</Typography></ListItem>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </>

                                : <>
                                    <Grid container borderRadius={6} bgcolor="white" justifyContent="center" height="100%" >
                                        <Grid item xs={12} height="30vh" display="flex" justifyContent="center" alignItems="end">
                                            <Paper sx={{
                                                height: "80%",
                                                width: { xs: "100%", md: "50%" },
                                                backgroundImage: currentUserData?.file ? `data:image/png;base64, $   {currentUserData.file}` : `url(${imageBack})`,
                                                backgroundSize: "cover"
                                            }} elevation={0}></Paper>
                                        </Grid>
                                        <Grid item xs={12} p={4} height="42vh">
                                            <Stack spacing={2}>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.companyName")}</Typography> <Typography  >{currentUserData?.companyName}</Typography></ListItem>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.contactPerson")}</Typography> <Typography  >{currentUserData?.companyPersonName}</Typography></ListItem>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.email")}</Typography> <Typography  >{currentUserData?.email}</Typography></ListItem>
                                                <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.phone")}</Typography> <Typography  >{currentUserData?.companyContactNumber}</Typography></ListItem>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </>}

                            {/* </Paper> */}
                        </Box>
                    </Grid>
                    <Grid item md={6} display="flex" flexDirection="column" justifyContent={currentUserRole === "Admin" || "Company" ? "space-evenly" : "normal"} alignItems="center" pl={{ xs: 0, md: 2 }} pr={{ xs: 0, md: 2 }} pt={4} >
                        {currentUserRole === "Admin" || "Company" &&
                            <Box width="100%" height="100%" >
                                <Grid container borderRadius={6} bgcolor="white" justifyContent="center">
                                    <Grid item xs={12} display="flex" alignItems="center" paddingLeft={4} marginTop={2}>
                                        <Typography variant='h6'> {t("profile.companyInfo")}</Typography>
                                    </Grid>
                                    <Grid item xs={12} p={4} pt={1}>
                                        <Stack spacing={1} >
                                            <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.companyType")}</Typography> <Typography  >{currentUserData?.companyType}</Typography></ListItem>
                                            <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.companyProduct")}</Typography> <Typography  ></Typography></ListItem>
                                            <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.GSTIN")}</Typography> <Typography  ></Typography></ListItem>
                                            <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.PAN")}</Typography> <Typography  ></Typography></ListItem>
                                            <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.website")}</Typography> <Typography  ></Typography></ListItem>
                                            <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.googlePay")}</Typography> <Button variant='text'>{currentUserData?.phoneNumber}</Button></ListItem>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        }
                        <Box width="100%" height="35vh" marginTop={currentUserRole === "Admin" || "Company" ? 4 :"0"}  marginBottom={currentUserRole === "Admin" || "Company" ? 10 :"0"}>
                            <Grid container borderRadius={6} bgcolor="white" justifyContent="center">
                                <Grid item xs={12} display="flex" alignItems="center" paddingLeft={4}>
                                    <Typography variant='h6'> {t("profile.addressInfo")}</Typography>
                                </Grid>
                                <Grid item xs={12} p={4} pt={1}>
                                    <Stack >
                                        <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.address")}</Typography> <Typography  >{currentUserData?.address}</Typography></ListItem>
                                        <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.city")}</Typography> <Typography  >{currentUserData?.city}</Typography></ListItem>
                                        <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.state")}</Typography> <Typography  >{currentUserData?.state}</Typography></ListItem>
                                        <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.country")}</Typography> <Typography  >{currentUserData?.country}</Typography></ListItem>
                                        <ListItem sx={{ borderBottom: ".3px solid lightgrey", p: "1", display: "flex", justifyContent: "space-between" }}> <Typography>{t("profile.zipCode")}</Typography> <Typography  >{currentUserData?.zipCode}</Typography></ListItem>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Dialog open={editDialogOpen} onClose={handleClose} fullWidth sx={{ maxHeight: "80%" }}>
                    {currentUserRole === "Admin" || "Company" ? <>
                        <DialogTitle textAlign="center" textTransform="capitalize">
                            {t("profile.editCompanyBtn")}
                        </DialogTitle>
                        <form onSubmit={CompanyFormik.handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={0}>

                                    <Grid item xs={12} display="flex" justifyContent="center">
                                        <div style={{ width: "60%", height: "20vh", margin: 20 }}>
                                            <FileDropzone
                                                setFiles={onDocumentChange(setFile)}
                                                accept="image/*,.pdf"
                                                files={file ? [file] : []}
                                                imagesUrls={[]}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            // autoFocus
                                            margin="dense"
                                            name="name"
                                            label="Contact Person Name"
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={currentUserData?.companyPersonName}
                                            value={CompanyFormik.values.name}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                            error={CompanyFormik.touched.name && Boolean(CompanyFormik.errors.name)}
                                            helperText={CompanyFormik.touched.name && CompanyFormik.errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <InputLabel>Company Product</InputLabel>
                                        <TextareaAutosize
                                            id="companyProduct"
                                            name="companyProduct"
                                            placeholder={currentUserData?.companyName}
                                            style={{
                                                minWidth: "99%",
                                                maxWidth: "99%",
                                                minHeight: "10vh",
                                                marginBottom: "2%"
                                            }}

                                            value={CompanyFormik.values.companyProduct}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                        />
                                        {CompanyFormik.touched.companyProduct && Boolean(CompanyFormik.errors.companyProduct) && <>
                                            <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{CompanyFormik.errors.companyProduct}</Typography></>}
                                    </Grid>
                                    <Grid item xs={12} >
                                        <InputLabel>Company About</InputLabel>
                                        <TextareaAutosize
                                            id="companyAbout"
                                            name="companyAbout"
                                            placeholder={currentUserData?.companyName}
                                            style={{
                                                minWidth: "99%",
                                                maxWidth: "99%",
                                                minHeight: "10vh",
                                                marginBottom: "2%"
                                            }}
                                            value={CompanyFormik.values.companyAbout}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                        />
                                        {CompanyFormik.touched.companyAbout && Boolean(CompanyFormik.errors.companyAbout) && <>
                                            <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{CompanyFormik.errors.companyAbout}</Typography></>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="gstIn"
                                            label="GSTIN"
                                            fullWidth
                                            variant="outlined"
                                            value={CompanyFormik.values.gstIn}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                            error={CompanyFormik.touched.gstIn && Boolean(CompanyFormik.errors.gstIn)}
                                            helperText={CompanyFormik.touched.gstIn && CompanyFormik.errors.gstIn}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="PAN"
                                            label="PAN"
                                            fullWidth
                                            variant="outlined"
                                            value={CompanyFormik.values.PAN}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                            error={CompanyFormik.touched.PAN && Boolean(CompanyFormik.errors.PAN)}
                                            helperText={CompanyFormik.touched.PAN && CompanyFormik.errors.PAN}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="website"
                                            label="Website"
                                            fullWidth
                                            variant="outlined"
                                            value={CompanyFormik.values.website}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                            error={CompanyFormik.touched.website && Boolean(CompanyFormik.errors.website)}
                                            helperText={CompanyFormik.touched.website && CompanyFormik.errors.website}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="googlepayNo"
                                            label="Google Pay Number"
                                            fullWidth
                                            variant="outlined"
                                            value={CompanyFormik.values.googlepayNo}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                            error={CompanyFormik.touched.googlepayNo && Boolean(CompanyFormik.errors.googlepayNo)}
                                        // helperText={CompanyFormik.touched.googlepayNo && CompanyFormik.errors.googlepayNo}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <InputLabel htmlFor="lang">Address</InputLabel>
                                        <TextareaAutosize
                                            id="address"
                                            name="address"
                                            placeholder="Address"
                                            style={{
                                                minWidth: "99%",
                                                maxWidth: "99%",
                                                minHeight: "10vh",
                                            }}
                                            value={CompanyFormik.values.address}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                        />
                                        {CompanyFormik.touched.address && Boolean(CompanyFormik.errors.address) && <>
                                            <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{CompanyFormik.errors.address}</Typography></>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                                            <InputLabel htmlFor="lang">Country</InputLabel>
                                            <Select
                                                // renderValue={(value) => value ? value : "none"}
                                                label="{t('language.Languages')}"
                                            // value={language}
                                            // onChange={e => handleInputChange(e)}
                                            >
                                                <MenuItem selected value="English">English</MenuItem>
                                                <MenuItem value="Hindi">Hindi</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ mt: 2, minWidth: 120 }} variant='outlined' fullWidth>
                                            <InputLabel htmlFor="lang">State</InputLabel>
                                            <Select
                                                // renderValue={(value) => value ? value : "none"}
                                                label="{t('language.Languages')}"
                                            // value={language}
                                            // onChange={e => handleInputChange(e)}
                                            >
                                                <MenuItem selected value="English">English</MenuItem>
                                                <MenuItem value="Hindi">Hindi</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                                            <InputLabel htmlFor="lang">City</InputLabel>
                                            <Select
                                                // renderValue={(value) => value ? value : "none"}
                                                label="{t('language.Languages')}"
                                            // value={language}
                                            // onChange={e => handleInputChange(e)}
                                            >
                                                <MenuItem selected value="English">English</MenuItem>
                                                <MenuItem value="Hindi">Hindi</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="zipCode"
                                            label="Zip Code"
                                            fullWidth
                                            variant="outlined"
                                            value={CompanyFormik.values.zipCode}
                                            onChange={CompanyFormik.handleChange}
                                            onBlur={CompanyFormik.handleBlur}
                                            error={CompanyFormik.touched.zipCode && Boolean(CompanyFormik.errors.zipCode)}
                                        // helperText={CompanyFormik.touched.zipCode && CompanyFormik.errors.zipCode}
                                        />
                                    </Grid>
                                </Grid>
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
                        </form></> : <>
                        <DialogTitle textAlign="center" textTransform="capitalize">
                            {t("profile.editUserBtn")}
                        </DialogTitle>
                        <form onSubmit={UserFormik.handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={0}>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            // autoFocus
                                            margin="dense"
                                            name="firstName"
                                            label="first Name"
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={currentUserData?.firstName}
                                            value={UserFormik.values.firstName}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.firstName && Boolean(UserFormik.errors.firstName)}
                                            helperText={UserFormik.touched.firstName && UserFormik.errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            // autoFocus
                                            margin="dense"
                                            name="lastName"
                                            label="Last Name"
                                            fullWidth
                                            variant="outlined"
                                            defaultValue={currentUserData?.lastName}
                                            value={UserFormik.values.lastName}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.lastName && Boolean(UserFormik.errors.lastName)}
                                            helperText={UserFormik.touched.lastName && UserFormik.errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} >
                                        <InputLabel>Address</InputLabel>
                                        <TextareaAutosize
                                            id="address"
                                            name="address"
                                            placeholder={currentUserData?.address}
                                            style={{
                                                minWidth: "99%",
                                                maxWidth: "99%",
                                                minHeight: "10vh",
                                                marginBottom: "2%"
                                            }}

                                            value={UserFormik.values.address}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                        />
                                        {UserFormik.touched.address && Boolean(UserFormik.errors.address) && <>
                                            <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{UserFormik.errors.address}</Typography></>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="phoneNumber"
                                            label="Phone Number"
                                            fullWidth
                                            variant="outlined"
                                            value={UserFormik.values.phoneNumber}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.phoneNumber && Boolean(UserFormik.errors.phoneNumber)}
                                        // helperText={UserFormik.touched.phoneNumber && UserFormik.errors.phoneNumber}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="state"
                                            label="state"
                                            fullWidth
                                            variant="outlined"
                                            value={UserFormik.values.state}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.state && Boolean(UserFormik.errors.state)}
                                            helperText={UserFormik.touched.state && UserFormik.errors.state}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            margin="dense"
                                            name="city"
                                            label="city"
                                            fullWidth
                                            variant="outlined"
                                            value={UserFormik.values.city}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.city && Boolean(UserFormik.errors.city)}
                                            helperText={UserFormik.touched.city && UserFormik.errors.city}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="country"
                                            label="Country"
                                            fullWidth
                                            variant="outlined"
                                            value={UserFormik.values.country}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.country && Boolean(UserFormik.errors.country)}
                                        // helperText={UserFormik.touched.googlepayNo && UserFormik.errors.googlepayNo}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                                    <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                                        <InputLabel htmlFor="lang">Country</InputLabel>
                                        <Select
                                            // renderValue={(value) => value ? value : "none"}
                                            label="{t('language.Languages')}"
                                        // value={language}
                                        // onChange={e => handleInputChange(e)}
                                        >
                                            <MenuItem selected value="English">English</MenuItem>
                                            <MenuItem value="Hindi">Hindi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ mt: 2, minWidth: 120 }} variant='outlined' fullWidth>
                                        <InputLabel htmlFor="lang">State</InputLabel>
                                        <Select
                                            // renderValue={(value) => value ? value : "none"}
                                            label="{t('language.Languages')}"
                                        // value={language}
                                        // onChange={e => handleInputChange(e)}
                                        >
                                            <MenuItem selected value="English">English</MenuItem>
                                            <MenuItem value="Hindi">Hindi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl sx={{ mt: 2, minWidth: 120 }} fullWidth>
                                        <InputLabel htmlFor="lang">City</InputLabel>
                                        <Select
                                            // renderValue={(value) => value ? value : "none"}
                                            label="{t('language.Languages')}"
                                        // value={language}
                                        // onChange={e => handleInputChange(e)}
                                        >
                                            <MenuItem selected value="English">English</MenuItem>
                                            <MenuItem value="Hindi">Hindi</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid> */}
                                    <Grid item xs={12}>
                                        <TextField
                                            sx={{ marginBottom: 3 }}
                                            autoFocus
                                            margin="dense"
                                            name="zipCode"
                                            label="Zip Code"
                                            fullWidth
                                            variant="outlined"
                                            value={UserFormik.values.zipCode}
                                            onChange={UserFormik.handleChange}
                                            onBlur={UserFormik.handleBlur}
                                            error={UserFormik.touched.zipCode && Boolean(UserFormik.errors.zipCode)}
                                        // helperText={formik.touched.zipCode && formik.errors.zipCode}
                                        />
                                    </Grid>
                                </Grid>
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
                    </>}

                </Dialog>
            </Grid>
        </WrapperComponent>
    )
}

export default Profile