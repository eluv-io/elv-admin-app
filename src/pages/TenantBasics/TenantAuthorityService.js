import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GridLabelItem from "../../components/GridLabelItem";

const TenantAuthorityService = ({rootStore}) => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography sx={{ mb: 5 }}>
        This is your current coniguration.
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={1} sx={{ m: 3 }} >
        <GridLabelItem text="Tenant Object" />
        <Grid item xs={8}>
          <Typography>
            Object ID: {rootStore.tenantInfo.basics.authorityServices.tenantObject.objectId}
          </Typography>
          <Typography>
            Latest Version Hash: {rootStore.tenantInfo.basics.authorityServices.tenantObject.latestHash}
          </Typography>
        </Grid>
        <GridLabelItem text="Minter Configuration" />
        <Grid item xs={8}>
          <Typography>
            Minter: {rootStore.tenantInfo.basics.authorityServices.minterConfig.minter}
          </Typography>
          <Typography>
            Minter Helper Contract: {rootStore.tenantInfo.basics.authorityServices.minterConfig.minterHelperContractAddress}
          </Typography>
          <Typography>
            Proxy Owner: {rootStore.tenantInfo.basics.authorityServices.minterConfig.proxyOwner}
          </Typography>
          <Typography>
            Proxy Contract: {rootStore.tenantInfo.basics.authorityServices.minterConfig.proxyContract}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantAuthorityService;
