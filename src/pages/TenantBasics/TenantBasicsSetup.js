import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GridLabelItem from "../../components/GridLabelItem";
import {TitleLabel} from "../../components/Labels.js";

const TenantBasicsSetup = ({rootStore, stepIndex}) => {

  if(!rootStore.tenantBasicsSteps[stepIndex]){
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <TitleLabel
          message="This account is not an Eluvio Tenant. Click the button below to setup your tenancy."
        />

        <Box
          sx={{
            p: 2,
            m: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: 300
          }}
        >

          <Button variant="contained" size="large"
            onClick={() => {
              rootStore.SetupTenant();
              rootStore.SetStepComplete({step:stepIndex});
            }}
          >
            Setup Tenancy
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
        height: 300
      }}
    >
      <TitleLabel
        message="Your base tenant contracts and group have been set up!"
      />

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
