import React from "react";
import {
  ContentfulClient,
  ContentfulProvider,
  useContentful,
} from "react-contentful";
import "./App.css";
import apiconfig from "./config.js";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Link,
  Chip,
  CardActions,
  Grid,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
  },
  appbar: {
    alignItems: "center",
  },
  gridcontainer: {
    margin: "10px 0",
    maxWidth: "1600px",
  },
  griditem: {
    minWidth: "530px",
  },
  media: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "10px 50px",
  },
  image: {
    height: "300px",
    width: "200px",
  },
  content: {
    flex: 1,
  },
  heart: {
    height: "20px",
    width: "20px",
    color: "#4267B2",
    alignSelf: "center",
  },
  github: {
    height: "20px",
    width: "20px",
    alignSelf: "center",
  },
  githubLink: {
    fontWeight: "bold",
    color: "#111",
  },
  signature: {
    margin: "20px",
  },
}));

const Page = (props) => {
  const classes = useStyles();

  const { data, error, fetched, loading } = useContentful({
    contentType: "info",
    query: {
      // 'fields.name': `/${props.match.slug || ''}`,
      select: "fields",
      order: "-fields.year",
    },
  });

  if (loading || !fetched) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return <p>Page does not exist.</p>;
  }

  // See the Contentful query response
  console.debug(data);

  // Process and pass in the loaded `data` necessary for your page or child components.
  return (
    <>
      <div className={classes.wrapper}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h6">Brazilian media repository</Typography>
          </Toolbar>
        </AppBar>
        <Typography></Typography>
        <Grid
          className={classes.gridcontainer}
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          {data.items.map((item) => (
            <Grid item xs={6} sm={6} md={6} lg={6} className={classes.griditem}>
              <Card className={classes.media}>
                <Avatar
                  variant="square"
                  alt="Movie Avatar"
                  className={classes.image}
                  src={item.fields.thumbnail.fields.file.url}
                />
                <CardContent className={classes.content}>
                  <Typography variant="subtitle1">
                    {item.fields.titleEn} ({item.fields.year})
                    {console.log(typeof item.fields.year)}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    {item.fields.titleBr
                      ? item.fields.titleBr
                      : "There's no translated title"}
                  </Typography>
                  {item.fields.tags["tags"].map((tag) => (
                    <Chip label={tag} />
                  ))}
                  <Typography variant="body2" paragraph>
                    {item.fields.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.fields.author}
                  </Typography>
                  <CardActions>
                    {item.fields.url ? (
                      <Link href={item.fields.url} variant="body2">
                        Full-Movie
                      </Link>
                    ) : (
                      ""
                    )}
                    {item.fields.trailerUrl ? (
                      <Link href={item.fields.trailerUrl} variant="body2">
                        Trailer
                      </Link>
                    ) : (
                      ""
                    )}
                  </CardActions>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Typography className={classes.signature} variant="body2">
          Made with <FavoriteIcon className={classes.heart} /> by
          <Link
            className={classes.githubLink}
            href="https://github.com/rafaelbidese/brazilian-media-repo"
          >
            {" "}
            Rafael Bidese
          </Link>{" "}
          and
          <Link
            className={classes.githubLink}
            href="https://github.com/gabiitokazu"
          >
            {" "}
            Ana Gabriela Itokazu <GitHubIcon className={classes.github} />
          </Link>
        </Typography>
      </div>
    </>
  );
};

const contentfulClient = new ContentfulClient(apiconfig);

const App = () => (
  <ContentfulProvider client={contentfulClient}>
    <Page />
  </ContentfulProvider>
);

export default App;
