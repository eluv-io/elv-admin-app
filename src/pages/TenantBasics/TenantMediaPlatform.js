import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GridLabelItem from "../../components/GridLabelItem";
import Button from "@mui/material/Button";
import {TitleLabel} from "../../components/Labels.js";

const TenantMediaPlatform = ({rootStore, stepIndex}) => {
  if(!rootStore.tenantBasicsSteps[stepIndex]){
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <TitleLabel
          message="Setup your tenancy to be able to stream videos and live channels."
        />

        <Box
          sx={{
            p: 2,
            m: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 300
          }}
        >
          <Button variant="contained"
            onClick={() => {
              rootStore.SetupTenantMediaplatform();
              rootStore.SetStepComplete({step:stepIndex});
            }}
          >
            Setup Media Platform
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography sx={{ mb: 5 }}>
        You are all setup on the Media Platform!
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={1} sx={{ m: 3 }} >
        <GridLabelItem text="Objects" />
        <Grid item xs={8}>
          {rootStore.tenantInfo.basics.mediaPlatform.objects.map(({name}) => (
            <Typography>
              {name}
            </Typography>
          ))}
        </Grid>
        <GridLabelItem text="Content Types" />
        <Grid item xs={8}>
          {rootStore.tenantInfo.basics.mediaPlatform.contentTypes.map(({name}) => (
            <Typography>
              {name}
            </Typography>
          ))}
        </Grid>
        <GridLabelItem text="Libraries" />
        <Grid item xs={8}>
          {rootStore.tenantInfo.basics.mediaPlatform.libraries.map(({name}) => (
            <Typography>
              {name}
            </Typography>
          ))}
        </Grid>
        <GridLabelItem text="Groups" />
        <Grid item xs={8}>
          {rootStore.tenantInfo.basics.mediaPlatform.groups.map(({name}) => (
            <Typography>
              {name}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantMediaPlatform;
