import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Container } from '@material-ui/core';
import Onboarder from '../components/fragments/Onboarder';
import { onboard } from '../store/local/contents';
import colors from '../constants/Colors';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    position: 'fixed',
    bottom: 0,
    flexGrow: 1,
  },
});

export default function OnboarderScreen() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = onboard.length;

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Container
      maxWidth='sm'
      style={{
        paddingTop: 72,
      }}
    >
      {onboard.map(
        item =>
          item.id === activeStep && (
            <Onboarder
              key={`${item.id}`}
              img={item.image}
              title={item.title}
              desc={item.desc}
              final={item.id === onboard.length - 1}
              start={item.id === 0}
            />
          )
      )}

      <MobileStepper
        variant='dots'
        steps={steps}
        // position="fixed"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button
            // size="small"
            onClick={handleNext}
            disabled={activeStep === steps - 1}
            style={{
              color: !(activeStep === steps - 1) && colors.themeS,
            }}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            // size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            style={{
              color: !(activeStep === 0) && colors.themeS,
            }}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Container>
  );
}
