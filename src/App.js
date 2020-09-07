import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardComponent from "./components/card";
import Cards, { quatroCards, CardsPagination } from "./cards";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import PropTypes from "prop-types";
import CarrosselComponent from "./components/carrossel";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#607D8B",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://wallpapercave.com/wp/wc1765288.jpg')`,
    backgroundSize: "cover",
    height: 600,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
    color: "#fff",
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  subTitle: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    display: "flex",
    fontSize: "2rem",
    color: "#fff",
    margin: "auto",
  },
  pagination: {
    backgroundColor: "#fff",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  console.log(children, window);
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default (props) => {
  const classes = useStyles();
  const [iniPrim, setiniPrim] = useState(0);
  //const [page, setPage] = useState(1);
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState(CardsPagination(4, iniPrim));
  const [cards2, setCards2] = useState(CardsPagination(4, iniPrim));
  const handleChange = (event, value) => {
    setPage(value);
    setCards(CardsPagination(4, Math.floor(Math.random() * 10 + 1)));
    setCards2(
      CardsPagination(
        Math.floor(Math.random() * 6 + 5),
        Math.floor(Math.random() * 10 + 1)
      )
    );
  };
  return (
    <div className="App">
      <HideOnScroll {...props}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              color="primary"
              className={classes.subTitle}
            >
              Blog
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box className={classes.hero}>
        <Box>React Blog</Box>
      </Box>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Pagination
          count={300}
          page={page}
          onChange={handleChange}
          className={classes.pagination}
        />
        <Typography variant="h4" className={classes.blogTitle}>
          Hud <Typography>Page: {page}</Typography>
        </Typography>
        <Grid container spacing={2}>
          {cards.map((item, index) => (
            <CardComponent
              text={item.text}
              image={item.image}
              title={item.title}
            ></CardComponent>
          ))}
          <CarrosselComponent></CarrosselComponent>
          {cards2.map((item, index) => (
            <CardComponent
              text={item.text}
              image={item.image}
              title={item.title}
            ></CardComponent>
          ))}
        </Grid>
        <Pagination
          className={classes.pagination}
          count={300}
          page={page}
          onChange={handleChange}
        />
      </Container>
    </div>
  );
};
