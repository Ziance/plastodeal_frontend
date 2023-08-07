import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React, { Children } from 'react'
import { useParams } from 'react-router-dom';

interface IDIALOG {
    setAnchorEl: React.Dispatch<React.SetStateAction<any>>;
    setOpenModal: React.Dispatch<React.SetStateAction<any>>;
    openModal: any
    heading: any
    children: React.ReactNode;
}
const MyDialog: React.FC<IDIALOG> = ({ openModal, setAnchorEl, setOpenModal, heading, children }): JSX.Element => {
    const params = useParams()
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickOpen = () => {
        setOpenModal(true);
    };

    
    return (
        <Dialog open={openModal} onClose={handleClose} fullWidth>
            <DialogTitle textAlign="center" textTransform="capitalize">
                {heading}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                {/* <Button
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
                    onClick={handleCloseModal}
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
                </Button> */}
            </DialogActions>
        </Dialog>
    )
}

export default MyDialog