import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

interface ILanguageDialog{
  setLanguageDialogOpen: React.Dispatch<React.SetStateAction<any>>
  languageDialogOpen:boolean
}
const LanguageDialog: React.FC<ILanguageDialog> = ({languageDialogOpen,  setLanguageDialogOpen}) => {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("")
  const { t } = useTranslation()
  // const [fullWidth, setFullWidth] = React.useState(true);
  // const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  useEffect(() => {
    // setLanguage(i18n.language)
    if (languageDialogOpen === true) {
      setOpen(true)
    } else {
      setOpen(true)
    }

  }, [languageDialogOpen])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleInputChange = (e: any) => {
    let selectedLanguage = e.target.value
    setLanguage(e.target.value)

    if (selectedLanguage === "English") {

      i18n.changeLanguage("en")
      handleClose()
    } else {

      i18n.changeLanguage("hi")
      handleClose()
    }

  }
  return (
    <React.Fragment>
      <Dialog
        open={open === true}
        onClose={handleClose}
      >
        <DialogTitle>{t('language.heading')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('language.note')}
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="lang">{t('language.Languages')}</InputLabel>
              <Select
                renderValue={(value) => value ? value : "none"}
                label="{t('language.Languages')}"
                value={language}
                onChange={e => handleInputChange(e)}
              >
                <MenuItem selected value="English">English</MenuItem>
                <MenuItem value="Hindi">Hindi</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose} variant="contained" sx={{ justifyContent: "center", textAlign: "center", backgroundColor: "#00abb1", borderColor: "#00abb1", padding: ".625rem 1rem", fontSize: ".813rem" }} >{t('language.button')}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default LanguageDialog