import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import GridLabelItem from "../../components/GridLabelItem";
import {TitleLabel} from "../../components/Labels.js";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const TenantBasicsSetup = ({rootStore, stepIndex}) => {
  const [tenantIdInput, setTenantIdInput] = React.useState("");

  const handleTextInputChange = event => {
    setTenantIdInput(event.target.value);
  };

  if(!rootStore.tenantBasicsSteps[stepIndex]){
    return (
      <Box
        component="form"
        sx={{
          p: 2
        }}
        noValidate
        autoComplete="off"
      >
        <TitleLabel
          message="Enter your Tenant ID below or setup a new tenancy."
        />

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "& .MuiTextField-root": { m: "auto",  width: "100%"},
            gap: 5
          }}
        >
          <Box sx={{ flex: "1 1 auto" }} />
          <Stack direction="row" alignItems="center" spacing={2} sx={{ width:"100%", maxWidth: 600}}>
            <TextField id="tenant-id" label="Enter Tenant ID" size="small" fullWidth
              value={tenantIdInput}
              onChange={handleTextInputChange}
            />
            <Button variant="contained" sx={{ alignSelf:"flex-start"}}
              onClick={async () => {
                console.log("TenantID: ", tenantIdInput);
                try {
                  await rootStore.SetTenantId(tenantIdInput);
                  await rootStore.SetStepComplete({step:stepIndex});
                } catch(e){
                  console.log("Set Tenant Id error: ", e);
                }
              }}
            >
              OK
            </Button>
          </Stack>

          <Button variant="contained"
            onClick={() => {
              rootStore.SetupTenant();
              rootStore.SetStepComplete({step:stepIndex});
            }}
          >
            Setup New Tenancy
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 2
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

      <Stack direction="row" spacing={2} sx={{ m:3, width:"100%", maxWidth: 600}}>
        <Button variant="contained" sx={{ alignSelf:"flex-start"}}
          onClick={async () => {
            console.log("TenantID: ", tenantIdInput);
            try {
              await rootStore.SetStepComplete({step:stepIndex, value:false});
            } catch(e){
              console.log("Set Tenant Id error: ", e);
            }
          }}
        >
              Edit Tenant ID
        </Button>

        <Button variant="contained"
          onClick={() => {
            rootStore.SetupTenant();
            rootStore.SetStepComplete({step:stepIndex});
          }}
        >
            Setup New Tenancy
        </Button>
      </Stack>
    </Box>
  );
};

export default TenantBasicsSetup;
