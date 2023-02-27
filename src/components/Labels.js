import React from "react";
import Typography from "@mui/material/Typography";

const TitleLabel = ({message})=> {
  return (
    <Typography variant = "h6" sx={{ mb: 5, color: "#404040" }}>
      {message}
    </Typography>
  );
};

export {TitleLabel};
