import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
// import React from 'react'

const useStyles=makeStyles({
    mainContainer:{
        backgroundColor:"#888",
        height:"100vw",
    }
})

const EmptyChartPage = () => {
    const classes=useStyles() 
  return (
    <Grid container>
        <Grid item xs={12} className={classes.mainContainer}>

        </Grid>
    </Grid>
  )
}

export default EmptyChartPage