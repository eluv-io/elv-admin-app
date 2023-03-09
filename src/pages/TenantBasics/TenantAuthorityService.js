import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GridLabelItem from "../../components/GridLabelItem";
import Button from "@mui/material/Button";
import {TitleLabel} from "../../components/Labels.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const ChoosePreviousVersion = ({previousVersions, open, handleClose}) => {

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Publish Previous Version</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please choose the version to publish.
        </DialogContentText>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            {previousVersions.map(({hash,version,commitInfo}) => (
              <Box key={hash} >
                <FormControlLabel value={version} control={<Radio />} label={`Version ${version}`} />
                <FormHelperText sx={{pl:3}} >{`Hash ${hash}`}</FormHelperText>
                <FormHelperText sx={{pl:3}} >{`Author ${commitInfo.author}`}</FormHelperText>
                <FormHelperText sx={{pl:3}} >{`Commit Message ${commitInfo.commit_message}`}</FormHelperText>
                <FormHelperText sx={{pl:3}} >{`Commit Date ${commitInfo.commit_date}`}</FormHelperText>
              </Box>
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Publish</Button>
      </DialogActions>
    </Dialog>
  );
};

const TenantAuthorityService = ({rootStore, stepIndex}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpenPreviousVersionDialog = () => {
    setOpen(true);
  };

  const handleClosePreviousVersionDialog = () => {
    setOpen(false);
  };

  if(!rootStore.tenantBasicsSteps[stepIndex]){
    return (
      <Box
        sx={{
          p: 2,
        }}
      >
        <TitleLabel
          message="Manage your minter configuration."
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
            New Minter Configuration
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
        message="This is your current coniguration."
      />
      <Grid container rowSpacing={3} columnSpacing={1} sx={{ m: 3 }} >
        <GridLabelItem text="Tenant Object" />
        <Grid item xs={5}>
          <Typography>
            Object ID: {rootStore.tenantInfo.basics.authorityServices.tenantObject.objectId}
          </Typography>
          <Typography>
            Current Version Hash: {rootStore.tenantInfo.basics.authorityServices.tenantObject.currentHash}
          </Typography>
          <Typography>
            Latest Version Hash: {rootStore.tenantInfo.basics.authorityServices.tenantObject.latestHash}
          </Typography>
          <Button variant="text" sx={{m:0, p:0}}
            onClick={() => {
              handleOpenPreviousVersionDialog();
            }}
          >
          Publish Previous Version
          </Button>

        </Grid>
        <Grid item xs={3}>
          <Button variant="contained"
            onClick={() => {
              rootStore.UpdateTenantLink();
            }}
          >
            Update
          </Button>
        </Grid>
        <GridLabelItem text="Minter Configuration" />
        <Grid item xs={5}>
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
        <Grid item xs={3}>
          <Button variant="contained"
            onClick={() => {
              rootStore.UpdateTenantLink();
            }}
          >
            Regenerate
          </Button>
        </Grid>
      </Grid>
      <ChoosePreviousVersion
        previousVersions={rootStore.tenantInfo.basics.authorityServices.tenantObject.previousVersions}
        open={open}
        handleClose={handleClosePreviousVersionDialog}
      />
    </Box>
  );
};

export default TenantAuthorityService;
