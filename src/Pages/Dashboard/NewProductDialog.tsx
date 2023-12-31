import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileDropzone from '../../components/filedropzone'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../redux/store'
import { addProductAction, editProductAction } from '../../redux/SuperAdminController/approval/middleware'
import { useSelector } from 'react-redux'
import { approvalSelector } from '../../redux/SuperAdminController/approval/approvalSlice'
import { toast } from 'react-toastify'
import TextEditor from '../../components/textEditror/index'
interface INewProductDialog {
    setNewProductOpen: React.Dispatch<React.SetStateAction<any>>,
    newProductOpen: any,
    currentRepo: any
    activeProduct: any
}
const NewProductDialog: React.FC<INewProductDialog> = ({ activeProduct, newProductOpen, setNewProductOpen, currentRepo }) => {
    const [file, setFile] = useState<File | any>(null);
    const [saveData, setSaveData] = useState<any>("")
    const { t } = useTranslation()
    const { message } = useSelector(approvalSelector)
    const dispatch = useAppDispatch()
    // const placeholder = ""
    const handleClose = () => {
        setNewProductOpen(false)
    }
    const onDocumentChange = (func: (f: File | null) => void) => (files: File[]) => {
        setFile(files[0])
        func(files[0]);
    };

    const formik = useFormik({
        initialValues: {
            name: activeProduct?.name || "",
            // specification: activeProduct?.specification || "",
            // price: "",
            description: activeProduct?.description || "",
            // country: "",
            // state: "",
            // city: "",
            file: [],
            categoryId: currentRepo?._id,
            productId: activeProduct?._id 
        },
        enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {

            values.file = file
            values.description = saveData
            
            if (activeProduct) {
                 dispatch(editProductAction(values)).then(({payload}:any)=>{
                   if (payload?.status===200) {
                    handleClose()
                    toast.success("product edited successfully")
                   }else{
                    toast.error("product not edited")
                   }
                   
                }).catch((error)=>{
                    toast.error("product not edited")
                })
              
               
            } else {
               
                const res = dispatch(addProductAction(values)).then((response)=>{
                    toast.success("product added successfully")
                }).catch((error)=>{
                    toast.error("product not added")
                })
            }
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
                                    preFile={activeProduct?.image}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ marginBottom: 3 }}
                                // autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik?.touched?.name && Boolean(formik?.errors?.name)}
                            // helperText={formik?.errors?.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h6'>Description</Typography>
                            <TextEditor setSaveData={setSaveData} activeDescription={activeProduct?.description} />
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