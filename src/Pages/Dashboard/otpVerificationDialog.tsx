import React from 'react'
import OtpInput from '../../components/otpInput';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../redux/store'
import { checkOtpAction } from '../../redux/SuperAdminController/approval/middleware'
import { toast } from 'react-toastify'
import { getUser } from '../../services/token'

interface IOtpVerificationDialog {
    SetVerifyOtpDialogOpen: React.Dispatch<React.SetStateAction<any>>,
    verifyOtpDialogOpen: any
    userData: any
    activeProduct: any
}

const OtpVerificationDialog: React.FC<IOtpVerificationDialog> = ({ userData, verifyOtpDialogOpen, SetVerifyOtpDialogOpen, activeProduct }) => {
    const dispatch = useAppDispatch()

    const [otp, setOtp] = React.useState('')

    const handleClose = () => {
        SetVerifyOtpDialogOpen(false)
    }

    const formik = useFormik({
        initialValues: {
            otp: "",
            productId: activeProduct?._id,
            user: userData
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            values.otp = otp
            values.productId = activeProduct?._id
            values.user = userData
            if (values.user) {
                await dispatch(checkOtpAction(values)).then(({ payload }: any) => {
                    if (payload.status === 200) {
                        return setTimeout(async () => {
                            toast.success(payload.data.message)
                            window.location.reload()
                        })
                    } else {
                        return setTimeout(async () => {
                            toast.error(payload.data.message)
                        })
                    }
                })
            }
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
                            <OtpInput setOtp={setOtp} otp={otp} />
                        </Grid>
                        <Grid item xs={10} mt={2}>
                            <Typography variant='body1' textAlign="center">A message with a verification code has been sent to your email.
                                Enter the code to continue.</Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ padding: 0, justifyContent: "center" }}>
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
                    <Grid container justifyContent="center" alignItems="center">
                        <Typography>Didn't get a verification code?</Typography>
                        <Button variant='text'>Send Again</Button>
                    </Grid>
                </DialogContent>
            </form>

        </Dialog>
    )
}

export default OtpVerificationDialog