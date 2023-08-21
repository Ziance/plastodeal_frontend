import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material'
import React from 'react'
interface INewProductDialog {
    setNewProductOpen: React.Dispatch<React.SetStateAction<any>>,
    newProductOpen: any,
    currentRepo: any
}
const NewProductDialog: React.FC<INewProductDialog> = ({ newProductOpen, setNewProductOpen, currentRepo }) => {
    const handleClose = () => {
        setNewProductOpen(false)
    }
    console.log("currentRepo IN DIALOG", currentRepo.text);

    return (
        <Dialog open={newProductOpen} onClose={handleClose}>
            <form>
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