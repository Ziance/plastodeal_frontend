import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, Select, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileDropzone from '../../components/filedropzone'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
interface INewProductDialog {
    setNewProductOpen: React.Dispatch<React.SetStateAction<any>>,
    newProductOpen: any,
    currentRepo: any
}
const NewProductDialog: React.FC<INewProductDialog> = ({ newProductOpen, setNewProductOpen, currentRepo }) => {
    const [file, setFile] = useState<File | any>(null);
    const { t } = useTranslation()
    const handleClose = () => {
        setNewProductOpen(false)
    }
    const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
        setFile(files[0])
        func(files[0]);
    };
    console.log("currentRepo IN DIALOG", currentRepo.text);
    const formik = useFormik({
        initialValues: {
            name: "",
            companyProduct: "",
            companyAbout: "",
            gstIn: "",
            PAN: "",
            website: "",
            googlepayNo: "",
            address: "",
            country: "",
            state: "",
            city: "",
            zipCode: "",
            file: []
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.file = file
            console.log("values", values);
        },
    });
    return (
        <Dialog open={newProductOpen} onClose={handleClose}>
            <form>
                <DialogTitle textAlign="center" textTransform="capitalize">
                    {currentRepo?.text}
                </DialogTitle>
                <form onSubmit={formik.handleSubmit}>
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
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel>Company Product</InputLabel>
                                <TextareaAutosize
                                    id="companyProduct"
                                    name="companyProduct"
                                    style={{
                                        minWidth: "99%",
                                        maxWidth: "99%",
                                        minHeight: "10vh",
                                        marginBottom: "2%"
                                    }}

                                    value={formik.values.companyProduct}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.companyProduct && Boolean(formik.errors.companyProduct) && <>
                                    <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{formik.errors.companyProduct}</Typography></>}
                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel>Company About</InputLabel>
                                <TextareaAutosize
                                    id="companyAbout"
                                    name="companyAbout"
                                    style={{
                                        minWidth: "99%",
                                        maxWidth: "99%",
                                        minHeight: "10vh",
                                        marginBottom: "2%"
                                    }}
                                    value={formik.values.companyAbout}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.companyAbout && Boolean(formik.errors.companyAbout) && <>
                                    <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{formik.errors.companyAbout}</Typography></>}
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
                                    value={formik.values.gstIn}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.gstIn && Boolean(formik.errors.gstIn)}
                                    helperText={formik.touched.gstIn && formik.errors.gstIn}
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
                                    value={formik.values.PAN}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.PAN && Boolean(formik.errors.PAN)}
                                    helperText={formik.touched.PAN && formik.errors.PAN}
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
                                    value={formik.values.website}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.website && Boolean(formik.errors.website)}
                                    helperText={formik.touched.website && formik.errors.website}
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
                                    value={formik.values.googlepayNo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.googlepayNo && Boolean(formik.errors.googlepayNo)}
                                // helperText={formik.touched.googlepayNo && formik.errors.googlepayNo}
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
            </form>
        </Dialog>
    )
}

export default NewProductDialog