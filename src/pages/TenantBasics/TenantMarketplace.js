import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GridLabelItem from "../../components/GridLabelItem";
import Button from "@mui/material/Button";
import {TitleLabel} from "../../components/Labels.js";

const TenantMarketplace = ({rootStore, stepIndex}) => {
  if(!rootStore.tenantBasicsSteps[stepIndex]){
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <TitleLabel
          message="Create the content types and site objects necessary to sell NFTs."
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
              rootStore.SetupTenantMarketplace();
              rootStore.SetStepComplete({step:stepIndex});
            }}
          >
            Setup Marketplace
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
        You are all setup on Eluvio Live!
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={1} sx={{ m: 3 }} >
        <GridLabelItem text="Objects" />
        <Grid item xs={8}>
          {rootStore.tenantInfo.basics.marketplace.objects.map(({name}) => (
            <Typography>
              {name}
            </Typography>
          ))}
        </Grid>
        <GridLabelItem text="Content Types" />
        <Grid item xs={8}>
          {rootStore.tenantInfo.basics.marketplace.contentTypes.map(({name}) => (
            <Typography>
              {name}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantMarketplace;
