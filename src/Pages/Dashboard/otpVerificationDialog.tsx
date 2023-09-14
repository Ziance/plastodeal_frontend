import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileDropzone from '../../components/filedropzone'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useAppDispatch } from '../../redux/store'
import { addProductAction, checkOtpAction, editProductAction } from '../../redux/SuperAdminController/approval/middleware'
import { useSelector } from 'react-redux'
import { approvalSelector } from '../../redux/SuperAdminController/approval/approvalSlice'
import { toast } from 'react-toastify'
import OtpInput from '../../components/otpInput'
import { authSelector } from '../../redux/auth/authSlice'
import { getUser } from '../../services/token'
interface IOtpVerificationDialog {
    SetVerifyOtpDialogOpen: React.Dispatch<React.SetStateAction<any>>,
    verifyOtpDialogOpen: any
    userData:any
    activeProduct:any
    // newProductOpen: any,
    // currentRepo: any
    // activeProduct: any
}
const OtpVerificationDialog: React.FC<IOtpVerificationDialog> = ({ userData,verifyOtpDialogOpen, SetVerifyOtpDialogOpen,activeProduct }) => {
    const [otp, setOtp] = React.useState('')
    const {currentUser } = useSelector(authSelector)
    const dispatch = useAppDispatch()
    const handleClose = () => {
        SetVerifyOtpDialogOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            otp: "",
            productId: activeProduct?._id,
            user: userData?.user

        },
        enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            values.otp = otp
            values.productId = activeProduct?._id
            values.user = userData
            console.log("values=====verify>", values);
            // alert(values.otp)

            const res = dispatch(checkOtpAction(values))
            console.log("res check", res);
            setTimeout(() => {
                console.log("current user",getUser()?.user);
            
                if (getUser()?.user) {
                    window.location.reload()
                    setTimeout(() => {
                        toast.success("user Login successfully")
                    }, 1500);
                    
                } else {
                    toast.error("something went wrong")
                }
            }, 100);
           
            // if (message==="fullfilled") {
            //     handleClose()
            //     toast.success("product edited successfully")
            // } else {
            //     toast.error("product not edited")
            // }

            // } else {

            //     const res = dispatch(addProductAction(values))
            //     console.log("res add", res);
            //     if (message==="fullfilled") {
            //         handleClose()
            //         toast.success("product added successfully")
            //     } else {
            //         toast.error("product not added")
            //     }
            // }



        },
    });
    return (
        <Dialog open={verifyOtpDialogOpen} onClose={handleClose}>

            <DialogTitle textAlign="center" textTransform="capitalize">
                Verify Otp
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <Grid container spacing={0} justifyContent="center">

                        <Grid item xs={8} display="flex" justifyContent="center">
                            <OtpInput setOtp={setOtp} otp={otp}/>
                        </Grid>
                        <Grid item xs={10} mt={2}>
                            <Typography variant='body1' textAlign="center">A message with a verification code has been sent to your email.
                                Enter the code to continue.</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ padding:0 , justifyContent:"center"}}>
                    <Button
                        sx={{
                            backgroundColor: "green",
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
                            // margin: 2,
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
                <DialogContent>
                    <Grid container  justifyContent="center" alignItems="center">
                        <Typography>Didn't get a verification code?</Typography>
                        <Button variant='text'>Send Again</Button>
                    </Grid>
                </DialogContent>
            </form>

        </Dialog>
    )
}

export default OtpVerificationDialog