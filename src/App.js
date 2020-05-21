import React from 'react';
import { ContentfulClient, ContentfulProvider, useContentful} from 'react-contentful';
import './App.css';
import apiconfig from './config.js'
import { Card, CardContent, Typography, Avatar, Link, Chip, CardActions} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  media : {
    display: "flex",
    margin: "10px 50px",
  },
  image: {
    height:"300px",
    width: "200px",
    margin: "auto",
  }
}));
 
 const Page = props => {

  const classes = useStyles();

  const { data, error, fetched, loading } = useContentful({
    contentType: 'info',
    query: {
      // 'fields.name': `/${props.match.slug || ''}`,
      select: 'fields'

    }
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
    <div style={{display: "flex", flexDirection:"column", justifyContent: "center"}}>
      <h2 style={{textAlign:"center"}}>Brazilian media repository</h2>
      {data.items.map(item => (
        <Card className={classes.media}>
          <Avatar 
          variant="square"
          alt="Remy Sharp"
          className={classes.image}
          src={item.fields.thumbnail.fields.file.url}
          />
          <CardContent>
            <Typography gutterBottom variant="subtitle1">{item.fields.titleEn}  ({item.fields.year})</Typography>
            <Typography gutterBottom variant="subtitle2" color="textSecondary">{item.fields.titleBr}</Typography>
            {item.fields.tags["tags"].map(tag=>(<Chip label={tag} />))}
            <Typography variant="body2" gutterBottom paragraph>{item.fields.description}</Typography>
            <Typography variant="body2" color="textSecondary">{item.fields.author}</Typography>
            <CardActions>
            <Link href={item.fields.url} variant="body2">Trailer</Link>

            </CardActions>
          </CardContent>
        </Card>
      ))}
      </div>
    )
}

const contentfulClient = new ContentfulClient(apiconfig);


const App = () => (
  <ContentfulProvider client={contentfulClient}>
    <Page/>
  </ContentfulProvider>
)


export default App;
