import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Grid";

const GridLabelItem = ({text, subText, sx}) => {
  return (
    <Grid item xs={3} style={{ minWidth: "200px" }} >
      <Box sx={sx} >
        <Typography variant="subtile1" gutterBottom>
          {text}
        </Typography>
        <br/>
        <Typography variant="caption" sx={{color:"gray"}} gutterBottom>
          {subText}
        </Typography>
      </Box>
    </Grid>
  );
};

export default GridLabelItem;
