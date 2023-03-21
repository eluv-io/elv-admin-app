import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TenantBasicsSetup from "./TenantBasicsSetup";
import TenantMediaPlatform from "./TenantMediaPlatform";
import {observer} from "mobx-react";
import TenantMarketplace from "./TenantMarketplace";
import TenantAuthorityService from "./TenantAuthorityService";

const steps = [
  "Setup",
  "Media Platform",
  "Marketplace",
  "Authority Services"
];

const TenantBasics = observer(() => {
  const [activeStep, setActiveStep] = React.useState(0);
  //const [completed, setCompleted] = React.useState({});
  let completed = rootStore.tenantBasicsSteps;
  // eslint-disable-next-line no-unused-vars
  const setCompleted = (newCompleted) => {
    rootStore.tenantBasicsSteps = completed;
    completed = newCompleted;
  };

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

  let page;
  if(activeStep == 0) {
    page = <TenantBasicsSetup rootStore={rootStore} stepIndex={0} />;
  } else if(activeStep == 1) {
    page = <TenantMediaPlatform rootStore={rootStore} stepIndex={1} />;
  } else if(activeStep == 2) {
    page = <TenantMarketplace rootStore={rootStore} stepIndex={2} />;
  } else if(activeStep == 3) {
    page = <TenantAuthorityService rootStore={rootStore} stepIndex={3} />;
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
              { activeStep < steps.length - 1 ?
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                : null
              }
            </Box>
          </Box>
        </Paper>
      </div>
    </Box>
  );
});

export default TenantBasics;
