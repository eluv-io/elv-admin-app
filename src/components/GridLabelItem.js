import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const GridLabelItem = ({text}) => {
  return (
    <Grid item xs={4} style={{ minWidth: "200px" }}>
      <Typography variant="subtile1" gutterBottom>
        {text}
      </Typography>
    </Grid>
  );
};

export default GridLabelItem;
