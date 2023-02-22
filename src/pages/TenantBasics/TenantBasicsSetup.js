import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GridLabelItem from "../../components/GridLabelItem";
const TenantBasicsSetup = ({rootStore}) => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography sx={{ mb: 5 }}>
        Your base tenant contracts and group have been set up!
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={1} sx={{ m: 3 }} >
        <GridLabelItem text="Tenant ID" />
        <Grid item xs={8}>
          <Typography>
            {rootStore.tenantInfo.basics.tenantId}
          </Typography>
        </Grid>
        <GridLabelItem text="Tenant Admins" />
        <Grid item xs={8}>
          <Typography>
            {rootStore.tenantInfo.basics.tenantAdmins.id}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantBasicsSetup;
