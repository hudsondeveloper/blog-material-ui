import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";

import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: "",
    imgPath:
      "https://i.pinimg.com/originals/ba/4d/80/ba4d801db37ad7ba4d455d742d46e680.jpg",
  },
  {
    label: "",
    imgPath:
      "https://www.desktopbackground.org/download/o/2011/04/09/184970_4k-ultra-hd-games-wallpapers-desktop-backgrounds-hd_3840x2160_h.jpg",
  },
  {
    label: "",
    imgPath:
      "https://lh3.googleusercontent.com/proxy/vncrHjMVF_f2uJ52ov8x3c34IdkBnfxf7dYQja5LG7iN1tCZKlWqBK3GF3jnadDYy1G27ZQ1gCOPCs2zRLBwwuAL4FSeHauv7BM9-yDHIlFazEkHpYaEYVykWx3FJ7MH_PG_QIy_s9k9y_hd",
  },
  {
    label: "",
    imgPath:
      "https://gameranx.com/wp-content/uploads/2016/02/Mario-and-Sonic-at-the-Rio-2016-Olymic-Games-4K-Wallpaper.jpg",
  },
  {
    label: "",
    imgPath: "https://wallpaperset.com/w/full/1/c/e/5801.jpg",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    background: "#607D8B",
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
  },
  img: {
    height: 255,
    overflow: "hidden",
    width: "100%",
    height: 500,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
  },
}));

export default (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Próximo
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Voltar
          </Button>
        }
      />
    </div>
  );
};
