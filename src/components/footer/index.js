import { Grid, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Grid container  justifyContent="center" alignItems="center" bgcolor="#00abb1" height="40px" position="fixed" bottom={0}>
        <Typography variant='body1' color="#ffff">(©) 2022 Plastodeal All the content of this webpage belongs to us</Typography>
    </Grid>
  )
}

export default Footer