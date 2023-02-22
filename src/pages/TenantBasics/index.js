import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {observer} from "mobx-react";

const steps = [
  "Setup",
  "Media Platform",
  "Marketplace",
  "Authority Services"
];

const TenantBasics = observer(() => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  let page;
  console.log("ActiveSetp ", activeStep);
  if(activeStep == 0) {
    page = <TenantBasicsSetup rootStore={rootStore}/>;
  } else {
    page = <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
      Step {activeStep + 1}
    </Typography>;
  }

  return (
    <Box sx={{ width: "100%"}}>
      <Box sx={{ m: 0, p: 3 }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <Paper elevation={3} >
            <Box sx={{ p: 3, alignContent:"flex-start"}} >
              {page}
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography variant="caption" sx={{ display: "inline-block" }}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </Box>
            </Box>
          </Paper>
        )}
      </div>
    </Box>
  );
});

const GridLabel = ({text}) => {
  return (
    <Grid item xs={4} style={{ minWidth: "200px" }}>
      <Typography variant="subtile1" gutterBottom>
        {text}
      </Typography>
    </Grid>
  );
};

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
        <GridLabel text="Tenant ID" />
        <Grid item xs={8}>
          <Typography>
            {rootStore.tenantInfo.basics.tenantId}
          </Typography>
        </Grid>
        <GridLabel text="Tenant Admins" />
        <Grid item xs={8}>
          <Typography>
            {rootStore.tenantInfo.basics.tenantAdmins.id}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TenantBasics;
