import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography } from '@mui/material'
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
            machineType: "",
            specification: "",
            price: "",
            description: "",
            country: "",
            state: "",
            city: "",
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
                                    name="machineType"
                                    label="Machine type"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.machineType}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.machineType && Boolean(formik.errors.machineType)}
                                    helperText={formik.touched.machineType && formik.errors.machineType}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={{ marginBottom: 3 }}
                                    // autoFocus
                                    margin="dense"
                                    name="specification"
                                    label="Specification"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.specification}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.specification && Boolean(formik.errors.specification)}
                                    helperText={formik.touched.specification && formik.errors.specification}
                                />
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
                                <FormControl sx={{ mt: 2, mb: 2, minWidth: 120 }} fullWidth>
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
                                    name="price"
                                    label="Price"
                                    fullWidth
                                    variant="outlined"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                />
                            </Grid>
                            <Grid item xs={12} >
                                <InputLabel htmlFor="lang">Description</InputLabel>
                                <TextareaAutosize
                                    id="description"
                                    name="description"
                                    placeholder="description"
                                    style={{
                                        minWidth: "99%",
                                        maxWidth: "99%",
                                        minHeight: "10vh",
                                    }}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.description && Boolean(formik.errors.description) && <>
                                    <Typography variant="body2" sx={{ color: "red", fontSize: "12px", marginLeft: "12px" }}>{formik.errors.description}</Typography></>}
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

        </Dialog>
    )
}

export default NewProductDialog